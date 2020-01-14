import { MAX_COLUMNS_COUNT, MIN_COLUMNS_COUNT } from '@/constants.js';

const state = {
  columns: 5,
  timeStart: '01.01.0000 05:00',
  sidebar: window.innerWidth > 1200
};

const getters = {
  actualTasks: state => state.tasks.filter(item => item.show)
};

const mutations = {
  updateColumns(state, val) {
    if (val <= MIN_COLUMNS_COUNT || val > MAX_COLUMNS_COUNT) {
      return false;
    }
    state.columns = val;
  },
  toggleSidebar(state) {
    state.sidebar = !state.sidebar;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
