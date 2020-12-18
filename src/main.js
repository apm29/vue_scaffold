import App from "@/App.vue";
import router from "@/router";
import "@/router/router.guard";
import Vue from "vue";
import Notifications from "vue-notification";
import store from "@/store";
Vue.use(Notifications);
Vue.config.productionTip = false;
//公共延迟方法
Vue.prototype.$delay = function(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
