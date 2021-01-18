import App from "@/App.vue";
import router from "@/router";
import "@/router/router.guard";
import Vue from "vue";
import Notifications from "vue-notification";
import velocity from "velocity-animate";
import store from "@/store";
import remote from "@/utils/remote";
import _ from "lodash";
if (process.env.NODE_ENV === "development") {
  import("@/mock");
}
Vue.use(Notifications, { velocity });
Vue.config.productionTip = false;
//公共延迟方法
Vue.prototype.$delay = timeInMilliSeconds =>
  new Promise(resolve => setTimeout(resolve, timeInMilliSeconds));
Vue.prototype.$notification = config => {
  if (config instanceof Object) {
    let newConfig = Object.assign(
      {
        group: "top",
        type: "info"
      },
      config
    );
    Vue.prototype.$notify(newConfig);
  } else {
    let newConfig = {
      group: "top",
      type: "info",
      title: "通知",
      text: config
    };
    Vue.prototype.$notify(newConfig);
  }
};
Vue.prototype.$remote = remote;
Vue.prototype.$debounce = _.debounce;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
