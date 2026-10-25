import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeStemBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 38);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Dynamic Lighting for 3D Depth & Metallic Specular Highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x0284c7, 1.8);
    dirLight1.position.set(15, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x9333ea, 1.5);
    dirLight2.position.set(-15, -10, 10);
    scene.add(dirLight2);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 2.5, 50);
    pointLightCyan.position.set(-14, 8, 5);
    scene.add(pointLightCyan);

    const pointLightPurple = new THREE.PointLight(0xa855f7, 2.0, 50);
    pointLightPurple.position.set(13, 10, 5);
    scene.add(pointLightPurple);

    // Root Master Group for Mouse Inertia
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // -------------------------------------------------------------------------
    // 3A. Atom Model with Nucleus and Orbiting Electron Rings
    // -------------------------------------------------------------------------
    const atomGroup = new THREE.Group();
    atomGroup.position.set(-18, 11, -12);
    atomGroup.scale.set(0.75, 0.75, 0.75);
    masterGroup.add(atomGroup);

    // Nucleus (cluster of vibrant proton/neutron spheres)
    const nucleusGroup = new THREE.Group();
    const nucleusColors = [0x2563eb, 0x0ea5e9, 0x7c3aed, 0x06b6d4, 0x1d4ed8];
    const nucleusSphereGeo = new THREE.SphereGeometry(0.58, 20, 20);

    for (let i = 0; i < 11; i++) {
      const color = nucleusColors[i % nucleusColors.length];
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.15,
        metalness: 0.4,
        transparent: true,
        opacity: 0.95
      });
      const sphere = new THREE.Mesh(nucleusSphereGeo, mat);
      const theta = (i / 11) * Math.PI * 2;
      const phi = (i % 3) * 0.8 - 0.8;
      sphere.position.set(
        Math.cos(theta) * 0.75,
        Math.sin(theta) * 0.75,
        Math.sin(phi) * 0.75
      );
      nucleusGroup.add(sphere);
    }
    atomGroup.add(nucleusGroup);

    // 3 Orbiting Electron Rings with increased thickness & metallic glow
    interface OrbitData {
      ring: THREE.Mesh;
      electron: THREE.Mesh;
      speed: number;
      radius: number;
    }
    const orbits: OrbitData[] = [];
    const ringRadii = [3.6, 4.1, 4.6];
    const ringAngles = [
      new THREE.Euler(Math.PI / 4, 0, Math.PI / 6),
      new THREE.Euler(-Math.PI / 4, Math.PI / 3, 0),
      new THREE.Euler(Math.PI / 2.3, -Math.PI / 4, Math.PI / 3)
    ];

    const electronGeo = new THREE.SphereGeometry(0.35, 18, 18);
    const electronMat = new THREE.MeshStandardMaterial({
      color: 0x00f5ff,
      emissive: 0x0284c7,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.6
    });

    ringRadii.forEach((radius, idx) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.08, 16, 80);
      const ringMat = new THREE.MeshStandardMaterial({
        color: idx === 0 ? 0x0284c7 : idx === 1 ? 0x7c3aed : 0x06b6d4,
        metalness: 0.7,
        roughness: 0.2,
        transparent: true,
        opacity: 0.75
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.copy(ringAngles[idx]);
      atomGroup.add(ring);

      const electron = new THREE.Mesh(electronGeo, electronMat.clone());
      atomGroup.add(electron);

      orbits.push({
        ring,
        electron,
        speed: 1.3 + idx * 0.45,
        radius
      });
    });

    // -------------------------------------------------------------------------
    // 3B. DNA Double Helix (Vibrant Cyan & Royal Blue Strands)
    // -------------------------------------------------------------------------
    const dnaGroup = new THREE.Group();
    dnaGroup.position.set(20, -10, -14);
    dnaGroup.scale.set(0.75, 0.75, 0.75);
    dnaGroup.rotation.z = Math.PI / 7;
    masterGroup.add(dnaGroup);

    const helixNodeGeo = new THREE.SphereGeometry(0.36, 16, 16);
    const strand1Mat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.5,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9
    });
    const strand2Mat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      metalness: 0.5,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9
    });
    const rungMat1 = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.4,
      roughness: 0.3,
      transparent: true,
      opacity: 0.8
    });
    const rungMat2 = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.4,
      roughness: 0.3,
      transparent: true,
      opacity: 0.8
    });

    const dnaSteps = 26;
    const dnaRadius = 2.2;
    const dnaHeight = 15;

    for (let i = 0; i < dnaSteps; i++) {
      const t = i / dnaSteps;
      const angle = t * Math.PI * 4;
      const y = (t - 0.5) * dnaHeight;

      const x1 = Math.cos(angle) * dnaRadius;
      const z1 = Math.sin(angle) * dnaRadius;

      const x2 = Math.cos(angle + Math.PI) * dnaRadius;
      const z2 = Math.sin(angle + Math.PI) * dnaRadius;

      // Node 1
      const node1 = new THREE.Mesh(helixNodeGeo, strand1Mat);
      node1.position.set(x1, y, z1);
      dnaGroup.add(node1);

      // Node 2
      const node2 = new THREE.Mesh(helixNodeGeo, strand2Mat);
      node2.position.set(x2, y, z2);
      dnaGroup.add(node2);

      // Connecting Rung
      if (i % 2 === 0) {
        const rungDistance = dnaRadius * 2;
        const rungGeo = new THREE.CylinderGeometry(0.07, 0.07, rungDistance, 8);
        const rung = new THREE.Mesh(rungGeo, i % 4 === 0 ? rungMat1 : rungMat2);
        rung.position.set(0, y, 0);
        rung.rotation.z = Math.PI / 2;
        rung.rotation.y = -angle;
        dnaGroup.add(rung);
      }
    }

    // -------------------------------------------------------------------------
    // 3C. Molecular Crystal Cluster (Benzene / Octahedral Crystal)
    // -------------------------------------------------------------------------
    const moleculeGroup = new THREE.Group();
    moleculeGroup.position.set(18, 14, -14);
    moleculeGroup.scale.set(0.75, 0.75, 0.75);
    masterGroup.add(moleculeGroup);

    const molAtomGeo = new THREE.SphereGeometry(0.5, 18, 18);
    const molMatCarbon = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      metalness: 0.4,
      roughness: 0.2,
      transparent: true,
      opacity: 0.88
    });
    const molMatOxygen = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.4,
      roughness: 0.2,
      transparent: true,
      opacity: 0.88
    });
    const molMatNitrogen = new THREE.MeshStandardMaterial({
      color: 0x9333ea,
      metalness: 0.4,
      roughness: 0.2,
      transparent: true,
      opacity: 0.88
    });

    const molNodes = [
      new THREE.Vector3(0, 2.6, 0),
      new THREE.Vector3(2.3, 1.3, 0.6),
      new THREE.Vector3(2.3, -1.3, -0.6),
      new THREE.Vector3(0, -2.6, 0),
      new THREE.Vector3(-2.3, -1.3, 0.6),
      new THREE.Vector3(-2.3, 1.3, -0.6),
      new THREE.Vector3(0, 0, 1.9),
      new THREE.Vector3(0, 0, -1.9)
    ];

    molNodes.forEach((pos, idx) => {
      const atom = new THREE.Mesh(
        molAtomGeo,
        idx % 3 === 0 ? molMatCarbon : idx % 3 === 1 ? molMatOxygen : molMatNitrogen
      );
      atom.position.copy(pos);
      moleculeGroup.add(atom);
    });

    // Connecting Bonds with metallic finish
    const bondMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.5,
      roughness: 0.25,
      transparent: true,
      opacity: 0.65
    });

    const connectBonds = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      [0, 6], [2, 6], [4, 6],
      [1, 7], [3, 7], [5, 7]
    ];

    connectBonds.forEach(([a, b]) => {
      const pA = molNodes[a];
      const pB = molNodes[b];
      const dist = pA.distanceTo(pB);
      const bondGeo = new THREE.CylinderGeometry(0.09, 0.09, dist, 8);
      const bond = new THREE.Mesh(bondGeo, bondMat);
      bond.position.copy(pA).add(pB).multiplyScalar(0.5);
      bond.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        pB.clone().sub(pA).normalize()
      );
      moleculeGroup.add(bond);
    });

    // -------------------------------------------------------------------------
    // 3D. Golden Wireframe Icosahedron (Geometric Math Prism)
    // -------------------------------------------------------------------------
    const polyGeo = new THREE.IcosahedronGeometry(2.5, 1);
    const polyMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      wireframe: true,
      metalness: 0.85,
      roughness: 0.15,
      transparent: true,
      opacity: 0.55
    });
    const polyMesh = new THREE.Mesh(polyGeo, polyMat);
    polyMesh.position.set(-16, -12, -14);
    polyMesh.scale.set(0.75, 0.75, 0.75);
    masterGroup.add(polyMesh);

    // -------------------------------------------------------------------------
    // 3E. Celestial Ringed Planet (Saturn Style Astronomy Model)
    // -------------------------------------------------------------------------
    const saturnGroup = new THREE.Group();
    saturnGroup.position.set(22, 12, -16);
    saturnGroup.scale.set(0.65, 0.65, 0.65);
    saturnGroup.rotation.z = Math.PI / 6.5;
    saturnGroup.rotation.x = Math.PI / 8;
    masterGroup.add(saturnGroup);

    // Planet Body Sphere
    const saturnBodyGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const saturnBodyMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      roughness: 0.35,
      metalness: 0.25,
      transparent: true,
      opacity: 0.92
    });
    const saturnBody = new THREE.Mesh(saturnBodyGeo, saturnBodyMat);
    saturnGroup.add(saturnBody);

    // Planet Concentric Rings
    const saturnRingGeo = new THREE.RingGeometry(2.8, 4.6, 64);
    const saturnRingMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
      roughness: 0.2,
      metalness: 0.5
    });
    const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
    saturnRing.rotation.x = Math.PI / 2;
    saturnGroup.add(saturnRing);

    // Outer subtle faint dust ring
    const outerRingGeo = new THREE.RingGeometry(4.8, 5.4, 64);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI / 2;
    saturnGroup.add(outerRing);

    // -------------------------------------------------------------------------
    // 3F. Glowing Logic Chip Prism (Computer Science Hardware Element)
    // -------------------------------------------------------------------------
    const chipGroup = new THREE.Group();
    chipGroup.position.set(-16, -2, -4);
    masterGroup.add(chipGroup);

    const chipGeo = new THREE.BoxGeometry(2.6, 2.6, 0.45);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.7,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85
    });
    const chipMesh = new THREE.Mesh(chipGeo, chipMat);
    chipGroup.add(chipMesh);

    // Glowing Logic Core
    const chipCoreGeo = new THREE.BoxGeometry(1.2, 1.2, 0.55);
    const chipCoreMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0284c7,
      emissiveIntensity: 0.9,
      roughness: 0.1
    });
    const chipCore = new THREE.Mesh(chipCoreGeo, chipCoreMat);
    chipGroup.add(chipCore);

    // -------------------------------------------------------------------------
    // 3E. Ambient Floating Scientific Particles with Vibrant Multi-Colors
    // -------------------------------------------------------------------------
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const vibrantThreeColors = [
      new THREE.Color(0x00f5ff), // Electric Cyan
      new THREE.Color(0x3b82f6), // Royal Blue
      new THREE.Color(0x10b981), // Emerald Green
      new THREE.Color(0xa855f7), // Vivid Purple
      new THREE.Color(0xf59e0b), // Amber Gold
      new THREE.Color(0xf43f5e), // Bright Rose
      new THREE.Color(0x06b6d4), // Turquoise
    ];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 75;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 55;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;

      const c = vibrantThreeColors[i % vibrantThreeColors.length];
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.65,
      vertexColors: true,
      transparent: true,
      opacity: 0.95
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particleSystem);

    // -------------------------------------------------------------------------
    // 4. Mouse Interactive Inertia & Smooth 3D Parallax Tilt
    // -------------------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates (-1 to 1) with responsive sensitivity
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = mouseX * 0.38;
      targetY = mouseY * 0.38;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------------------
    // 5. Animation Loop
    // -------------------------------------------------------------------------
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax reaction
      masterGroup.rotation.y += (targetX - masterGroup.rotation.y) * 0.08;
      masterGroup.rotation.x += (-targetY - masterGroup.rotation.x) * 0.08;

      // Atom Rotation & Electron Orbit Motion
      atomGroup.rotation.y += 0.007;
      nucleusGroup.rotation.x += 0.012;
      nucleusGroup.rotation.z += 0.009;

      orbits.forEach((orb) => {
        const angle = elapsedTime * orb.speed;
        const localPos = new THREE.Vector3(
          Math.cos(angle) * orb.radius,
          0,
          Math.sin(angle) * orb.radius
        );
        localPos.applyEuler(orb.ring.rotation);
        orb.electron.position.copy(localPos);
      });

      // DNA Helix continuous rotation & vertical floating
      dnaGroup.rotation.y += 0.009;
      dnaGroup.position.y = -6 + Math.sin(elapsedTime * 0.8) * 0.6;

      // Molecule continuous tumbling
      moleculeGroup.rotation.x += 0.007;
      moleculeGroup.rotation.y += 0.011;
      moleculeGroup.position.y = 11 + Math.cos(elapsedTime * 0.7) * 0.5;

      // Polyhedron slow geometrical tumble
      polyMesh.rotation.x += 0.005;
      polyMesh.rotation.y += 0.008;

      // Celestial Ringed Planet gentle axial rotation
      saturnGroup.rotation.y += 0.006;
      saturnGroup.position.y = 7 + Math.sin(elapsedTime * 0.6) * 0.4;

      // Logic Chip Prism slow hover and rotation
      chipGroup.rotation.x += 0.008;
      chipGroup.rotation.y += 0.01;
      chipGroup.position.y = -2 + Math.cos(elapsedTime * 0.9) * 0.35;

      // Subtle particle drift
      particleSystem.rotation.y = elapsedTime * 0.018;

      renderer.render(scene, camera);
    };

    animate();

    // -------------------------------------------------------------------------
    // 6. Cleanup
    // -------------------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.5,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    />
  );
};
