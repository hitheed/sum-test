import Vue from 'vue';
import Vuex from 'vuex';
import sum from './sum';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    'sum': sum,
  },
});
