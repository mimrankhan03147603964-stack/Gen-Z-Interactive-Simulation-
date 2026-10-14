import { SimulationItem } from '../types';

/**
 * Generates the clean independent URL to open a simulation in a dedicated tab.
 * Uses dedicated independent route `/simulation/{indexNumber}`.
 */
export function getSimulationStandaloneUrl(sim: SimulationItem): string {
  return `${window.location.origin}/simulation/${encodeURIComponent(sim.indexNumber)}`;
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
