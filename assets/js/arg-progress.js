(() => {
  'use strict';
  const keys = { phase: 'shiraminePhase', foundPhase1: 'shiramineFoundPhase1', life: 'shiramineLifeRecordOpened', others: 'shiramineOtherSubjectsViewed', residents: 'shiramineAllResidentsViewed', oldest: 'shiramineOldestRecordViewed', archive: 'shiramineArchiveRevealed', topTruth: 'shiramineTopMapTruthOpened', ending: 'shiramineEnding' };
  const phases = new Set(['phase0', 'phase1', 'phase2', 'phase3', 'truth', 'ending']);
  const get = (key) => { try { return localStorage.getItem(key); } catch { return null; } };
  const set = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  const has = (key) => get(keys[key]) === 'true';
  const mark = (key) => set(keys[key], 'true');
  const phase = () => { const value = get(keys.phase); return phases.has(value) ? value : 'phase0'; };
  const setPhase = (value) => { if (phases.has(value)) set(keys.phase, value); };
  window.ShiramineProgress = { has, mark, phase, setPhase, keys };
})();
