<template>
  <div class="map-container">
    <CountyMap @ready="applyClassesToCountyMap" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { groupBy } from 'lodash-es';

import { getStateAbbreviation } from '@/utilities/getStateAbbreviation';

import CountyMap from '@/components/counties';
import countyData from '@/assets/counties.json';

type CountyData = {
  date: string;
  county: string;
  state: string;
  fips: number;
  cases: number;
  deaths: number;
};

type CountyMap = { [key: string]: CountyData };
type CountyGroup = { [key: string]: CountyData[] };

const SvgCountyChart = defineComponent({
  components: {
    CountyMap,
  },
  setup() {
    const data = countyData as CountyData[];
    const groupedData: CountyGroup = groupBy(
      data,
      (d: CountyData) => `${d.county}, ${getStateAbbreviation(d.state)}`
    );

    const mostRecentData = Object.keys(groupedData).reduce((counties, key) => {
      counties[key] = groupedData[key].reduce(
        (acc, val) => {
          acc.deaths += val.deaths;
          acc.fips += val.fips;
          acc.cases += val.cases;
          return acc;
        },
        {
          deaths: 0,
          cases: 0,
          fips: 0,
        } as CountyData
      );
      return counties;
    }, {} as CountyMap);

    // Normalize the data so we can apply classes
    // https://stackoverflow.com/questions/13368046/how-to-normalize-a-list-of-positive-numbers-in-javascript
    const deaths = Object.values(mostRecentData).map(d => d.deaths);
    // eslint-disable-next-line prefer-spread
    const ratio = Math.max.apply(Math, deaths) / 6000;

    Object.entries(mostRecentData).map(([key, val]) => {
      mostRecentData[key].deaths = Math.round(val.deaths / ratio);
    });

    function applyClassesToCountyMap() {
      Object.entries(mostRecentData).forEach(([key, value]) => {
        if (value) {
          console.log();
          const el = document.querySelector(`[data-name="${key}"]`);

          el?.classList.add(`fill-red-${Math.ceil(value.deaths / 100) * 100}`);
        }
      });
    }

    return {
      applyClassesToCountyMap,
    };
  },
});

export default SvgCountyChart;
</script>

<style>
.map-container {
  @apply border border-gray-300 rounded bg-gray-700 p-2 shadow-md;
}

path:hover,
path:active {
  fill: red;
}

path.no-hover:hover {
  fill: none;
}
</style>
