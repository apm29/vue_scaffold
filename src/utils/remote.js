import axios from "axios";
import qs from "qs";
import store from "@/store";
import config from "@/utils/config";
import { START_LOADING, STOP_LOADING } from "@/store/mutationTypes";

axios.defaults.withCredentials = true; // 是否允许跨域
axios.defaults.timeout = 10000;
axios.defaults.baseURL = config.baseUrl;
axios.defaults.validateStatus = () => true;
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

export default {
  //post请求,resumeOnError为false时,失败将会抛出异常
  post: async option => {
    const postOptions = {
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    option = Object.assign({}, DEFAULT_OPTION, postOptions, option);
    return await this.request(option);
  },

  upload: async options => {
    const uploadOptions = {
      method: "POST",
      handleApp: false,
      transformRequest: [],
      header: {
        "Content-Type": "multipart/form-data"
      }
    };
    options = Object.assign({}, DEFAULT_OPTION, uploadOptions, options);
    return await this.request(options);
  },

  get: async option => {
    const getOptions = {
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    option = Object.assign({}, DEFAULT_OPTION, getOptions, option);
    return await this.request(option);
  },

  request: async option => {
    const axiosInstance = axios.create();
    this.interceptors(axiosInstance, option);
    try {
      if (!option.silent) {
        store.commit(START_LOADING);
      }
      const res = await axiosInstance.request({
        url: option.url,
        data: option.data,
        method: option.method,
        transformRequest: option.transformRequest,
        responseType: option.responseType,
        headers: option.header
      });
      return res;
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
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      async axiosResponse => {
        return new Promise(resolve => {
          //在此处进行响应拦截
          resolve(axiosResponse);
        });
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
};
