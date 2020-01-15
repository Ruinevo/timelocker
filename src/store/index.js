'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import focuses from './modules/focuses';
import settings from './modules/settings';
import tasks from './modules/tasks';
import { getTimes } from '@/utils.js';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    focuses,
    settings,
    tasks
  },
  strict: debug
});

store.watch((state) => state.settings.startOfWork, (val) => {
  const { intervalValue } = store.state.settings;
  const newTimes = getTimes(val, intervalValue);
  store.commit('tasks/updateTimes', newTimes);
  store.commit('tasks/clearTasks', newTimes.length);
});

store.watch((state) => state.settings.intervalValue, (val) => {
  const { startOfWork } = store.state.settings;
  const newTimes = getTimes(startOfWork, val);
  store.commit('tasks/updateTimes', newTimes);
  store.commit('tasks/clearTasks', newTimes.length);
});

export default store;
