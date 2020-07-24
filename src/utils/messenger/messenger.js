import ConfirmDialog from "./ConfirmDialog.vue";
import AlertDialog from "./AlertDialog.vue";
import Toast from "./Toast.vue";
import Vue from "vue";
import vuetify from "@/plugins/vuetify";

let confirmConstructor = Vue.extend(Object.assign(ConfirmDialog, { vuetify }));
let alertConstructor = Vue.extend(Object.assign(AlertDialog, { vuetify }));
let toastConstructor = Vue.extend(Object.assign(Toast, { vuetify }));

/**
 * 暴露方法
 * 具体使用时，在main.js中引入
 * import Messager from "./components/messenger/messenger.js"
 * 再挂载
 * Vue.prototype.$messenger = Messager
 * 需要时使用
 * this.$messenger.xxxx({
 *     title: "...",
 *     msg: "..."
 * })
 */
export default {
  // 提示对话框
  alert: function(options) {
    // 整理options
    if (typeof options != "object") options = {};
    options = Object.assign(
      {
        title: "警告",
        okBtnText: "确定"
      },
      options
    );
    // promise封装，ok执行resolve
    return new Promise((resolve, reject) => {
      try {
        let container = document.getElementById("app-alert");
        if (!container) {
          let div = document.createElement("div");
          div.id = "app-alert";
          (document.getElementById("app") || document.body).appendChild(div);
          container = div;
        }

        let dialog = new alertConstructor({
          data() {
            return {
              options: options
            };
          },
          destroyed() {
            for (let child of container.children) {
              container.removeChild(child);
            }
            resolve(dialog.value);
          }
        });
        dialog.$mount(container);
      } catch (e) {
        reject(e);
      }
    });
  },
  // 确认对话框
  confirm: function(options) {
    // 整理options
    if (typeof options != "object") options = {};
    options = Object.assign(
      {
        title: "确认",
        okBtnText: "确定",
        cancelBtnText: "取消"
      },
      options
    );
    // promise封装，ok执行resolve，cancel执行reject
    return new Promise((resolve, reject) => {
      try {
        let container = document.getElementById("app-confirm");
        if (!container) {
          let div = document.createElement("div");
          div.id = "app-confirm";
          (document.getElementById("app") || document.body).appendChild(div);
          container = div;
        }

        let dialog = new confirmConstructor({
          data() {
            return {
              options: options
            };
          },
          destroyed() {
            for (let child of container.children) {
              container.removeChild(child);
            }
            resolve(dialog.value);
          }
        });
        dialog.$mount(container);
      } catch (e) {
        reject(e);
      }
    });
  },
  // 消息提示
  toast: function(options) {
    // 整理options
    if (typeof options != "object") options = {};
    options = Object.assign(
      {
        msg: "消息",
        absolute: false,
        top: true,
        right: false,
        bottom: false,
        left: false,
        timeout: 3000,
        vertical: false,
        color: "info",
        multi_line: false,
        close_text: "mdi-close",
        show_close: true,
        close_text_color: "white--text"
      },
      options
    );
    // promise封装，ok执行resolve，cancel执行reject
    return new Promise(resolve => {
      try {
        let container = document.getElementById("app-toast");
        if (!container) {
          let div = document.createElement("div");
          div.id = "app-toast";
          (document.getElementById("app") || document.body).appendChild(div);
          container = div;
        }
        let dialog = new toastConstructor({
          data() {
            return {
              show: true,
              options: options
            };
          },
          destroyed() {
            for (let child of container.children) {
              container.removeChild(child);
            }
          }
        });
        dialog.$mount(container);
      } catch (e) {
        console.log(e);
      } finally {
        resolve();
      }
    });
  }
};
