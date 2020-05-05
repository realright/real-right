<template>
  <div
    class="app-container h-screen w-screen flex pt-5 items-center bg-gray-800 text-gray-300 flex-col p-4"
  >
    <h1 class="heading text-5xl">Welcome to Because It's Real, Right</h1>
    <label>Enter Your State, County, or Zip Code</label>
    <typeahead
      class="flex-col w-full self-center max-w-md"
      v-model="state.typeaheadInput"
      :data="suggestions"
      @input="onTypeaheadSubmit"
      placeholder="Dallas County, Texas"
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
      typeaheadInput: '',
    });

    const texas = computed(() => 'Texas');

    async function onTypeaheadSubmit(str: string) {
      setTimeout(
        () => window.alert('Go get data for ' + state.typeaheadInput),
        100
      );
    }

    onMounted(async () => {
      console.log('mounted');
    });

    return {
      state,
      texas,
      onTypeaheadSubmit,
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
