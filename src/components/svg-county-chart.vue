<template>
  <div class="map-container">
    <CountyMap />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import CountyMap from '@/components/counties';

const SvgCountyChart = defineComponent({
  components: {
    CountyMap,
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
  @apply: shadow;
}

path.no-hover:hover {
  fill: none;
}
</style>
