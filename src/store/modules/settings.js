import { MAX_COLUMNS_COUNT, MIN_COLUMNS_COUNT, INITIAL_TIME } from '@/constants.js';
import { getTimes, getTasks } from '@/utils.js';

const times = getTimes(INITIAL_TIME);

const tasks = getTasks(times.length);

console.log(tasks);

const state = {
  columns: 5,
  timeStart: '01.01.0000 05:00',
  times,
  tasks,
  sidebar: window.innerWidth > 1200
};

const mutations = {
  updateColumns (state, val) {
    if (val <= MIN_COLUMNS_COUNT || val > MAX_COLUMNS_COUNT) {
      return false;
    }
    state.columns = val;
  },
  toggleSidebar (state) {
    state.sidebar = !state.sidebar;
  }
};

export default {
  namespaced: true,
  state,
  mutations
}
