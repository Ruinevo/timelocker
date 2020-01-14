import { MAX_COLUMNS_COUNT, MIN_COLUMNS_COUNT } from '@/constants.js';

const state = {
  columns: 5,
  timeStart: '01.01.0000 05:00',
  sidebar: window.innerWidth > 1200,
  showModal: false,
  start: null,
  stop: null
};

const getters = {
  actualTasks: state => state.tasks.filter(item => item.show)
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
  },
  showModal (state, { start, stop }) {
    state.start = start;
    state.stop = stop;
    state.showModal = true;
  },
  closeModal (state) {
    state.showModal = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
