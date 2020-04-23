import stateAbbreviations from '@/assets/state-abbreviations.json';

export type StateName = keyof typeof stateAbbreviations;

export const getStateAbbreviation = (code: StateName) =>
  stateAbbreviations[code];
