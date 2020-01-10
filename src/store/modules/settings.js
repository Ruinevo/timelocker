import { MAX_COLUMNS_COUNT, MIN_COLUMNS_COUNT, INITIAL_TIME } from '@/constants.js';
import { getTimes } from '@/utils.js';

const times = getTimes(INITIAL_TIME);

const state = {
  columns: 5,
  timeStart: '05:00',
  times
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
