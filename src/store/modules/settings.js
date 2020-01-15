import { MAX_COLUMNS_COUNT, MIN_COLUMNS_COUNT, START_OF_WORK_TIME, INITIAL_INTERVAL } from '@/constants.js';

const state = {
  columns: 5,
  sidebar: window.innerWidth > 1200,
  showModal: false,
  start: null,
  stop: null,
  startOfWork: START_OF_WORK_TIME,
  intervalValue: INITIAL_INTERVAL,
  showInitialTime: true
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
  },
  setStartOfWorkTime (state, value) {
    state.startOfWork = value;
  },
  setIntervalValue (state, value) {
    state.intervalValue = value;
  },
  toggleShowInitialTime (state, value) {
    state.showInitialTime = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
