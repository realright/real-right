<template>
  <div class="map-container">
    <CountyMap @ready="applyClassesToCountyMap" />

    <div
      id="info-box"
      class="fixed"
      :style="{ top, left }"
      v-show="state.selected"
    >
      <h1>{{ state.selected.county }}</h1>
      <div>Cases: {{ state.selected.cases }}</div>
      <div>Deaths: {{ state.selected.deaths }}</div>
      <div>Mortality: {{ mortality }}%</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from '@vue/composition-api';
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

type State = {
  selected?: CountyData;
  x: number;
  y: number;
  boxEl?: Element;
};

const SvgCountyChart = defineComponent({
  components: {
    CountyMap,
  },
  setup() {
    const state = reactive({
      selected: {} as CountyData,
      x: 0,
      y: 0,
      boxEl: undefined,
      leftPosition: computed(() => `0px`),
    } as State);

    const top = computed(() => {
      const val = state.y - (state.boxEl?.clientHeight || 0) - 20;
      return `${val}px`;
    });

    const left = computed(() => {
      const val = state.x - (state.boxEl?.clientWidth || 0) / 2;
      return `${val}px`;
    });

    const mortality = computed(() => {
      if (state.selected) {
        const decimal = state.selected.deaths / state.selected.cases;
        return Math.round(decimal * 10000) / 100;
      }
    });

    const data = countyData as CountyData[];
    const groupedData: CountyGroup = groupBy(
      data,
      (d: CountyData) => `${d.county}, ${getStateAbbreviation(d.state)}`
    );

    const mostRecentData = Object.keys(groupedData).reduce((counties, key) => {
      counties[key] = groupedData[key].reduce(
        (acc, val) => {
          return {
            ...val,
            deaths: acc.deaths + val.deaths,
            fips: acc.fips + val.fips,
          };
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
      state.boxEl = document.querySelector('#info-box') || undefined;

      Object.entries(mostRecentData).forEach(([key, value]) => {
        if (value) {
          const el = document.querySelector(`[data-name="${key}"]`);

          if (el) {
            el.onmousemove = (e: MouseEvent) => {
              state.selected = value;
              state.x = e.clientX;
              state.y = e.clientY;
            };

            el.classList.add(`fill-red-${Math.ceil(value.deaths / 100) * 100}`);
          }
        }
      });
    }

    return {
      applyClassesToCountyMap,
      state,
      top,
      left,
      mortality,
    };
  },
});

export default SvgCountyChart;
</script>

<style>
#info-box {
  @apply bg-gray-900 border rounded border-gray-300 shadow-lg px-2 py-3;
}

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
