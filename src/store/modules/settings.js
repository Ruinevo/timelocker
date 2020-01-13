import { MAX_COLUMNS_COUNT, MIN_COLUMNS_COUNT } from '@/constants.js';

const state = {
  columns: 5
};

const mutations = {
  updateColumns (state, val) {
    if (val <= MIN_COLUMNS_COUNT || val > MAX_COLUMNS_COUNT) {
      return false;
    }
    state.columns = val;
  }
};

export default {
  namespaced: true,
  state,
  mutations
}
