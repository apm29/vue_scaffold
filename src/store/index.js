import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    app: {
      loading: 0,
      name: "e-road"
    }
  },
  getters: {},
  mutations: {
    loading: function(state, payload) {
      state.app.loading += payload;
    }
  },
  actions: {},
  modules: {}
});
