import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import postcss from 'postcss';
import { transform as lightningTransform } from 'lightningcss';

/**
 * Downlevels Tailwind CSS v4 output so it renders identically on older browsers
 * such as Chrome 80–109 on Windows 7 / Windows 8.1 laptops as well as modern browsers:
 * - Unwraps @layer blocks (unsupported in Chrome < 99) while preserving exact cascade order
 * - Converts oklch()/oklab() and modern CSS syntax to standard sRGB hex/rgba via LightningCSS
 * - Initializes --tw-* custom properties without relying solely on @property
 * - Provides @supports-guarded transform fallbacks for Chrome < 104 without double-transforming modern browsers
 */
function downlevelCssForLegacyBrowsers(css: string, filename: string, minify: boolean): string {
  const root = postcss.parse(css);

  // 1. Unwrap all @layer blocks in exact source order (properties -> theme -> base -> components -> utilities)
  root.walkAtRules('layer', (rule) => {
    if (rule.nodes && rule.nodes.length > 0) {
      rule.replaceWith(rule.nodes);
    } else {
      rule.remove();
    }
  });

  // 2. Unwrap Tailwind v4's @supports fallback wrapper around *, :before, :after --tw-* defaults
  // so older Chrome versions without @property still receive default CSS variable values
  root.walkAtRules('supports', (rule) => {
    if (
      rule.params.includes('-webkit-hyphens') &&
      rule.params.includes('margin-trim') &&
      rule.nodes &&
      rule.nodes.length > 0
    ) {
      rule.replaceWith(rule.nodes);
    }
  });

  // 3. Add @supports not (translate: 0) transform fallbacks for Chrome < 104 (zero effect on modern Chrome 104+)
  const legacyTransformFallbackRules: postcss.Rule[] = [];
  root.walkRules((rule) => {
    // Only process top-level utility rules (skip rules inside @keyframes)
    if (rule.parent?.type === 'atrule' && (rule.parent as postcss.AtRule).name === 'keyframes') {
      return;
    }
    let hasTransform = false;
    let standaloneTranslate: string | null = null;
    let standaloneScale: string | null = null;
    let standaloneRotate: string | null = null;

    rule.walkDecls((decl) => {
      if (decl.prop === 'transform') hasTransform = true;
      else if (decl.prop === 'translate') standaloneTranslate = decl.value;
      else if (decl.prop === 'scale') standaloneScale = decl.value;
      else if (decl.prop === 'rotate') standaloneRotate = decl.value;
    });

    if (!hasTransform && (standaloneTranslate || standaloneScale || standaloneRotate)) {
      const parts: string[] = [];
      if (standaloneTranslate) {
        const vals = (standaloneTranslate as string).trim().split(/\s+/);
        parts.push(vals.length === 1 ? `translate(${vals[0]})` : `translate(${vals[0]}, ${vals[1]})`);
      }
      if (standaloneRotate) {
        parts.push(`rotate(${standaloneRotate})`);
      }
      if (standaloneScale) {
        const vals = (standaloneScale as string).trim().split(/\s+/);
        parts.push(vals.length === 1 ? `scale(${vals[0]})` : `scale(${vals[0]}, ${vals[1]})`);
      }
      if (parts.length > 0) {
        const cloned = postcss.rule({ selector: rule.selector });
        cloned.append({ prop: 'transform', value: parts.join(' ') });
        // Preserve parent @media wrapper if present
        if (rule.parent?.type === 'atrule' && (rule.parent as postcss.AtRule).name === 'media') {
          const mediaAtRule = postcss.atRule({
            name: 'media',
            params: (rule.parent as postcss.AtRule).params,
          });
          mediaAtRule.append(cloned);
          legacyTransformFallbackRules.push(mediaAtRule as unknown as postcss.Rule);
        } else {
          legacyTransformFallbackRules.push(cloned);
        }
      }
    }
  });

  if (legacyTransformFallbackRules.length > 0) {
    const supportsFallback = postcss.atRule({
      name: 'supports',
      params: 'not (translate: 0)',
    });
    legacyTransformFallbackRules.forEach((r) => supportsFallback.append(r));
    root.append(supportsFallback);
  }

  const unwrapped = root.toString();

  // 4. Run LightningCSS targeting Chrome 80 / Edge 80 / Firefox 78 / Safari 13
  // Converts oklch/oklab colors to standard hex/rgb fallbacks and lowers modern syntax
  const result = lightningTransform({
    filename,
    code: Buffer.from(unwrapped, 'utf8'),
    minify,
    targets: {
      chrome: 80 << 16,
      edge: 80 << 16,
      firefox: 78 << 16,
      safari: 13 << 16,
    },
  });

  return result.code.toString('utf8');
}

function legacyBrowserCssCompatPlugin(): Plugin {
  return {
    name: 'legacy-browser-css-compat',
    enforce: 'post',
    transform(code, id) {
      if (id.split('?')[0].endsWith('.css') && code.includes('@layer')) {
        return {
          code: downlevelCssForLegacyBrowsers(code, id, false),
          map: null,
        };
      }
    },
    generateBundle(_options, bundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'asset' && fileName.endsWith('.css') && typeof chunk.source === 'string') {
          chunk.source = downlevelCssForLegacyBrowsers(chunk.source, fileName, true);
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), legacyBrowserCssCompatPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      target: 'chrome80',
      cssTarget: 'chrome80',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-icons';
            }
          },
        },
      },
    },
  };
});
