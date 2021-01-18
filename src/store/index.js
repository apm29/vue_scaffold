import Vuex from "vuex";
import Vue from "vue";
import { START_LOADING, STOP_LOADING } from "./mutationTypes";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    app: {
      loading: 0,
      name: "Vue-Scaffold"
    }
  },
  getters: {},
  mutations: {
    /**
     * 确保START_LOADING和STOP_LOADING成对使用
     * @param {*} state 状态
     */
    [START_LOADING](state) {
      state.app.loading += 1;
    },
    /**
     * 确保START_LOADING和STOP_LOADING成对使用
     * @param {*} state 状态
     */
    [STOP_LOADING](state) {
      state.app.loading -= 1;
    }
  },
  actions: {},
  modules: {}
});
