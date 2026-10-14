import { SimulationItem } from '../types';

/**
 * Generates the safe standalone URL to open a simulation in a dedicated tab.
 * Uses query parameter `/?sim={indexNumber}` on the root domain to prevent
 * Vercel and static hosting "404 NOT_FOUND: This page doesn't exist" errors.
 */
export function getSimulationStandaloneUrl(sim: SimulationItem): string {
  const origin = window.location.origin;
  return `${origin}/?sim=${encodeURIComponent(sim.indexNumber)}`;
}

/**
 * Safely launches a simulation in a new browser tab/window (target="_blank").
 * The main portal tab remains completely intact and active in the background.
 */
export function openSimulationInNewTab(sim: SimulationItem): Window | null {
  const url = getSimulationStandaloneUrl(sim);
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    try {
      newWindow.focus();
    } catch {
      // Focus may fail depending on browser security policies
    }
  }
  return newWindow;
}
