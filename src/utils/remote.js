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
      return await axiosInstance.request({
        url: option.url,
        data: option.data,
        method: option.method,
        transformRequest: option.transformRequest,
        responseType: option.responseType,
        headers: option.header
      });
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

  interceptors(instance) {
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
            resolve(axiosResponse);
          } else {
            notifyUserWithAlert(
              `ERROR:${axiosResponse.status} ${JSON.stringify(
                axiosResponse.statusText
              )}`
            );
            reject(axiosResponse.statusText);
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
  }
};
