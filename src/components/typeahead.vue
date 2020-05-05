<template>
  <div>
    <input
      type="text"
      :placeholder="placeholder"
      class="focus:outline-none focus:shadow-outline"
      v-model="state.inputText"
    />
    <div
      v-if="state.showSuggestions && state.suggestions.length > 0"
      class="typeahead-suggestions shadow-lg"
    >
      <div v-if="state.stateSuggestions.length > 0" class="typeahead-header">
        State
      </div>

      <div
        v-for="stateSuggestion in state.stateSuggestions"
        :key="stateSuggestion.text"
        class="typeahead-suggestion"
        @click="selectTypeahead(stateSuggestion.text)"
      >
        <div>{{ stateSuggestion.text }}</div>
      </div>

      <div
        v-if="state.countySuggestions.length > 0"
        class="typeahead-header mt-2"
      >
        County
      </div>
      <div
        v-for="countySuggestion in state.countySuggestions"
        :key="countySuggestion.text"
        class="typeahead-suggestion"
        @click="selectTypeahead(countySuggestion.text)"
      >
        <div>{{ countySuggestion.text }}</div>
      </div>

      <div
        v-if="state.zipCodeSuggestions.length > 0"
        class="typeahead-header mt-2"
      >
        Zip Code
      </div>
      <div
        v-for="zipCodeSuggestion in state.zipCodeSuggestions"
        :key="zipCodeSuggestion.text"
        class="typeahead-suggestion"
        @click="selectTypeahead(zipCodeSuggestion.text)"
      >
        <div>{{ zipCodeSuggestion.text }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  watchEffect,
} from '@vue/composition-api';

type StateType = {
  inputText: string;
  showSuggestions: boolean;
  suggestions: Array<Record<string, string>>;
  zipCodeSuggestions: Array<Record<string, string>>;
  countySuggestions: Array<Record<string, string>>;
  stateSuggestions: Array<Record<string, string>>;
};

const MAX_SUGGESTIONS = 5;

const TypeaheadComponent = defineComponent({
  name: 'Typeahead',
  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Type something...',
    },
    value: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const state: StateType = reactive({
      inputText: props.value,
      showSuggestions: computed(() => {
        return props.value !== state.inputText;
      }),
      suggestions: computed(() => {
        return state.inputText.length > 1
          ? props.data.filter(suggestion => {
              return (
                suggestion.text
                  .toLowerCase()
                  .indexOf(state.inputText.toLowerCase()) !== -1
              );
            })
          : [];
      }),
      zipCodeSuggestions: computed(() =>
        state.suggestions
          .filter(s => s.type === 'zipCode')
          .slice(0, MAX_SUGGESTIONS)
      ),
      countySuggestions: computed(() =>
        state.suggestions
          .filter(s => s.type === 'county')
          .slice(0, MAX_SUGGESTIONS)
      ),
      stateSuggestions: computed(() =>
        state.suggestions
          .filter(s => s.type === 'state')
          .slice(0, MAX_SUGGESTIONS)
      ),
    });

    function selectTypeahead(str: string) {
      state.inputText = str;
      emit('input', str);
    }

    return {
      state,
      selectTypeahead,
    };
  },
});

export default TypeaheadComponent;
</script>

<style scoped>
input {
  @apply rounded bg-gray-300 text-black border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal;
}

.typeahead-suggestions {
  @apply absolute py-1 rounded bg-gray-300 text-black;
}

.typeahead-header {
  @apply text-gray-500 text-xs px-3;
}

.typeahead-suggestion:hover {
  background-color: purple;
}
.typeahead-suggestion > div {
  @apply px-3;
}
</style>
