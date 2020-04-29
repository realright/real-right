<template>
  <div
    class="app-container h-screen w-screen flex pt-5 items-center bg-gray-800 text-gray-300 flex-col p-4"
  >
    <h1 class="heading text-5xl">Welcome to Because It's Real, Right</h1>
    <label>Enter Your Zip Code</label>
    <typeahead
      v-model="typeaheadInput"
      :data="suggestions"
      placeholder="78745"
    />

    <svg-county-chart class="mt-5" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
} from '@vue/composition-api';
import Typeahead from '@/components/typeahead.vue';
import SvgCountyChart from '@/components/svg-county-chart.vue';
import { getTypeaheadSuggestions } from '@/utilities/getTypeaheadSuggestions';

type StateType = {
  typeaheadInput?: string;
};

const IndexComponent = defineComponent({
  name: 'App',
  components: {
    Typeahead,
    SvgCountyChart,
  },
  setup() {
    const state: StateType = reactive({
      typeaheadInput: 0,
      // double: computed(() => state.count * 2)
    });

    const texas = computed(() => 'Texas');

    async function go() {
      console.log(
        "Ok, tell all the charts to rerender with the new input, if it's a valid zip code..."
      );
    }

    onMounted(async () => {
      go();
    });

    return {
      state,
      texas,
      go,
      suggestions: getTypeaheadSuggestions(),
    };
  },
});

export default IndexComponent;
</script>

<style scoped>
* {
  @apply box-border;
}

label {
  @apply pb-1;
}
</style>
