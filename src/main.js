import Vue from 'vue';
import App from './App.vue';
import store from './store';

import moment from 'moment';
import VueMoment from 'vue-moment';

Vue.config.productionTip = false;

moment.locale('ru');
moment.suppressDeprecationWarnings = true;

Vue.use(VueMoment, {
  moment
});

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
