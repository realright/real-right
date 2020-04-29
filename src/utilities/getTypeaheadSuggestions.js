import countyData from '@/assets/counties.json';

export function getTypeaheadSuggestions() {
  const suggestions = {
    zipCode: new Set([]),
    county: new Set([]),
    state: new Set([]),
  };
  countyData.forEach(county => {
    const countyState = `${county.county} County, ${county.state}`;
    suggestions.zipCode.add(`${county.fips} (${countyState})`);
    suggestions.county.add(countyState);
    suggestions.state.add(county.state);
  });
  return Object.keys(suggestions)
    .map(type => Array.from(suggestions[type]).map(s => ({ type, text: s })))
    .flat();
}
