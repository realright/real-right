<template>
  <div
    class="app-container h-screen w-screen flex pt-5 items-center bg-gray-800 text-gray-300 flex-col p-4"
  >
    <h1 class="heading text-5xl">Welcome to Because It's Real, Right</h1>
    <label>Enter Your Zip Code</label>
    <input
      type="number"
      placeholder="78745"
      v-model.number="state.zipCode"
      @blur="go()"
      @keyup.enter="go()"
      class="text-black focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
    />

    <!-- <state-county-chart class="mt-5" /> -->
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
import StateCountyChart from '@/components/state-county-chart.vue';
import SvgCountyChart from '@/components/svg-county-chart.vue';

type StateType = {
  zipCode?: number;
};

const IndexComponent = defineComponent({
  name: 'App',
  components: {
    'state-county-chart': StateCountyChart,
    SvgCountyChart,
  },
  setup() {
    const state: StateType = reactive({
      zipCode: 0,
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
    };
  },
});

export default IndexComponent;
</script>

<style scoped>
* {
  @apply box-border;
}
</style>
