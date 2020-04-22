import stateAbbreviations from '@/assets/state-abbreviations.json';

type StateName = keyof stateAbbreviations;

export const getStateAbbreviation = (code: string) => stateAbbreviations[code];
