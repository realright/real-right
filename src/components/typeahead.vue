<template>
  <div>
    <input
      type="text"
      :placeholder="placeholder"
      class="text-black focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
      v-model="state.inputText"
    />
    <div v-if="state.suggestions.length > 0">
      <div v-if="state.zipCodeSuggestions.length > 0">
        Zip Code
      </div>
      <div
        v-for="zipCodeSuggestion in state.zipCodeSuggestions"
        :key="zipCodeSuggestion.text"
        @click="$emit('input', zipCodeSuggestion.text)"
      >
        {{ zipCodeSuggestion.text }}
      </div>

      <div v-if="state.countySuggestions.length > 0">
        County
      </div>
      <div
        v-for="countySuggestion in state.countySuggestions"
        :key="countySuggestion.text"
        @click="$emit('input', countySuggestion.text)"
      >
        {{ countySuggestion.text }}
      </div>

      <div v-if="state.stateSuggestions.length > 0">
        State
      </div>

      <div
        v-for="stateSuggestion in state.stateSuggestions"
        :key="stateSuggestion.text"
        @click="$emit('input', stateSuggestion.text)"
      >
        {{ stateSuggestion.text }}
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
} from '@vue/composition-api';

type StateType = {
  inputText: string;
  suggestions: Array<Record<string, string>>;
  zipCodeSuggestions: Array<Record<string, string>>;
  countySuggestions: Array<Record<string, string>>;
  stateSuggestions: Array<Record<string, string>>;
};

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
  setup(props) {
    const state: StateType = reactive({
      inputText: '',
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
        state.suggestions.filter(s => s.type === 'zipCode')
      ),
      countySuggestions: computed(() =>
        state.suggestions.filter(s => s.type === 'county')
      ),
      stateSuggestions: computed(() =>
        state.suggestions.filter(s => s.type === 'state')
      ),
    });

    onMounted(() => {
      console.log(props.data);
    });

    return {
      state,
    };
  },
});

export default TypeaheadComponent;
</script>

<style scoped>
input {
  @apply max-w-xs rounded bg-gray-300;
}
</style>
