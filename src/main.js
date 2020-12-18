import App from "@/App.vue";
import router from "@/router";
import Vue from "vue";
import remote from "@/utils/remote";
import Notifications from "vue-notification";
import messenger from "@/utils/messenger/messenger";
import store from "@/store";
import config from "@/utils/config";
Vue.use(Notifications);
Vue.config.productionTip = false;
Vue.prototype.$remote = remote;
Vue.prototype.$messenger = messenger;
Vue.prototype.$fileBasePath = config.fileBaseUrl;
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
