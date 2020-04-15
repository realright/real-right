<template>
  <div class="app-container">
    <h1 class="heading">{{ message }}</h1>
    <p>
      Welcome to because it's real right. Where you can get the facts, because
      it's real, right?
    </p>
    <div class="heading">COVID-19 TEXAS</div>
    <p v-if="texas">
      # Positive Cases: {{ texas.positive }}, # Hospitalized:
      {{ texas.hospitalized }}, # Recovered: {{ texas.recovered }}, # Dead:
      {{ texas.death }}
    </p>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  onMounted,
} from "@vue/composition-api";
import axios from "axios";

type StateInfo = {
  death: number;
  hospitalized: number;
  positive: number;
  recovered: number;
  state: string;
};

type State = {
  stateInfos: StateInfo[];
};

const IndexComponent = defineComponent({
  setup() {
    console.log("state infos");
    const stateInfos = ref([] as StateInfo[]);
    console.log(stateInfos.value);

    console.log("before server prefretch");
    onMounted(async () => {
      console.log("making data call");
      const { data } = await axios.get("https://covidtracking.com/api/states");
      stateInfos.value = data;
    });

    const texas = computed(() =>
      stateInfos.value.find((s: StateInfo) => s.state == "TX")
    );

    return {
      stateInfos,
      message: "Hello There",
      texas,
    };
  },
});

export default IndexComponent;
</script>

<style scoped>
* {
  @apply box-border;
}

.app-container {
  @apply h-screen w-screen flex justify-center items-center bg-gray-800 text-gray-300 flex-col p-4;
}

.heading {
  @apply text-5xl;
}

div {
  @apply text-3xl;
}

p {
  @apply text-2xl text-pink-300 text-center;
}
</style>
