import App from "@/App.vue";
import router from "@/router";
import "@/router/router.guard";
import Vue from "vue";
import Notifications from "vue-notification";
import velocity from "velocity-animate";
import store from "@/store";

Vue.use(Notifications, { velocity });
Vue.config.productionTip = false;
//公共延迟方法
Vue.prototype.$delay = timeInMilliSeconds =>
  new Promise(resolve => setTimeout(resolve, timeInMilliSeconds));
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
