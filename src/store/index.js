'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import focuses from './modules/focuses';
import settings from './modules/settings';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    focuses,
    settings
  },
  strict: debug
});

store.watch((state) => state.settings.columns, (newVal, oldVal) => {
  store.commit('focuses/updateColumns', { newVal, oldVal });
});

export default store;
