import { SimulationItem } from '../types';

/**
 * Generates the URL to open a simulation in a clean dedicated standalone tab.
 * Uses query parameter `?lab={indexNumber}` or `?lab={slug}`.
 */
export function getSimulationStandaloneUrl(sim: SimulationItem): string {
  // Uses clean URL parameter ?lab={indexNumber} preserving current origin and pathname
  const base = window.location.origin + window.location.pathname;
  return `${base}?lab=${encodeURIComponent(sim.indexNumber)}`;
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
