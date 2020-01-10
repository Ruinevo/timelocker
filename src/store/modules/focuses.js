import Vue from 'vue';

import { applyDrag, generateFocuses } from '@/utils.js';
import { INITIAL_COLUMNS_COUNT } from '@/constants.js';

let focuses = generateFocuses(INITIAL_COLUMNS_COUNT);

const state = {
  focuses
};

const mutations = {
  setFocus (state, { id, value }) {
    Vue.set(state.focuses[id], 'data', value);
  },
  dragFocus (state, payload) {
    state.focuses = applyDrag(state.focuses, payload);
  },
  updateColumns (state, { newVal, oldVal }) {
    const diff = Math.abs(newVal - oldVal);
    if (oldVal < newVal) {
      state.focuses = [...state.focuses, ...generateFocuses(diff)]
    } else {
      state.focuses.splice(-diff);
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
