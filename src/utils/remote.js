import axios from "axios";
import qs from "qs";
import store from "@/store";
import config from "@/config/network.config";
import { START_LOADING, STOP_LOADING } from "@/store/mutationTypes";
import Vue from "vue";

let vm = new Vue();
axios.defaults.withCredentials = true; // 是否允许跨域
axios.defaults.timeout = 10000;
axios.defaults.baseURL = config.baseUrl;
// axios.defaults.validateStatus = () => true;
//默认options
const DEFAULT_OPTION = {
  responseType: "json", //类型
  url: "/", //url
  data: {}, //请求参数在此
  method: "POST",
  header: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  silent: false, //不显示loading
  resumeOnError: false, //false时失败直接抛出异常
  returnInvalidResponse: false, //是否返回拦截的请求结果
  transformRequest: [
    data => {
      return qs.stringify(data);
    }
  ]
};

function notifyUserWithAlert(message, title = "网络请求失败") {
  if (vm.$notification) {
    vm.$notification({
      title: title,
      text: message,
      type: "error"
    });
  } else {
    window.alert(message);
  }
}

/**
 * 请求工具类,post/get/upload
 * resumeOnError为false时,失败将会抛出异常
 * silent: false时会向store提交loading,App.vue会显示Loading界面
 */
export default {
  post: async function(option) {
    const postOptions = {
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    option = Object.assign({}, DEFAULT_OPTION, postOptions, option);
    return await this.request(option);
  },

  upload: async function(option) {
    const uploadOptions = {
      method: "POST",
      handleApp: false,
      transformRequest: [],
      header: {
        "Content-Type": "multipart/form-data"
      }
    };
    option = Object.assign({}, DEFAULT_OPTION, uploadOptions, option);
    return await this.request(option);
  },

  get: async function(option) {
    const getOptions = {
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    option = Object.assign({}, DEFAULT_OPTION, getOptions, option);
    return await this.request(option);
  },

  request: async function(option) {
    const axiosInstance = axios.create();
    this.interceptors(axiosInstance, option);
    try {
      if (!option.silent) {
        store.commit(START_LOADING);
      }
      let axiosResponse = await axiosInstance.request({
        url: option.url,
        data: option.data,
        method: option.method,
        transformRequest: option.transformRequest,
        responseType: option.responseType,
        headers: option.header
      });
      return axiosResponse.data;
    } catch (err) {
      if (!option.resumeOnError) {
        throw err;
      }
    } finally {
      if (!option.silent) {
        store.commit(STOP_LOADING);
      }
    }
  },

  interceptors(instance, option) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        //在此处为请求添加公共参数
        return config;
      },
      error => {
        console.log(error);
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      async axiosResponse => {
        return new Promise((resolve, reject) => {
          if (axiosResponse.status === 200) {
            //在此处进行响应拦截
            if (this.axiosResponseProcessor(axiosResponse)) {
              resolve(axiosResponse);
            } else {
              notifyUserWithAlert(
                this.axiosResponseErrorMessageCreator(axiosResponse)
              );
              if (option.returnInvalidResponse) {
                resolve(axiosResponse);
              } else {
                reject(axiosResponse);
              }
            }
          } else {
            notifyUserWithAlert(
              `ERROR:${axiosResponse.status} ${JSON.stringify(
                axiosResponse.statusText
              )}`
            );
            reject(axiosResponse);
          }
        });
      },
      error => {
        notifyUserWithAlert(
          `REJECT: ${error.message || JSON.stringify(error)}`
        );
        return Promise.reject(error);
      }
    );
  },

  /**
   * 决定axiosResponse是否是有效的返回值
   * @param axiosResponse
   * @returns {boolean}
   */
  axiosResponseProcessor: function(axiosResponse) {
    return axiosResponse.data.status.toString() === "1";
  },

  /**
   * 当axiosResponse判定为无效时,创建errorMessage
   * @param axiosResponse
   * @returns {string}
   */
  axiosResponseErrorMessageCreator: function(axiosResponse) {
    return axiosResponse.data.text || "无效的返回值";
  }
};
