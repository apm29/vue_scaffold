import axios from "axios";
import qs from "qs";
import config from "@/utils/config";
import router from "@/router";
import store from "@/store";
import { getToken, setToken } from "@/utils/tokenUtils";
import messenger from "@/utils/messenger/messenger";

axios.defaults.withCredentials = true; // 是否允许跨域
axios.defaults.timeout = 10000;
axios.defaults.baseURL = config.baseUrl;
axios.defaults.validateStatus = () => true;
//默认options
const DEFAULT_OPTION = {
  responseType: "json", //类型
  url: "/", //url
  data: {}, //请求参数再此
  method: "POST",
  msgKey: "text",
  codeKey: "status",
  tokenKey: "token",
  dataKey: "data",
  successCode: "1",
  notLoginCode: "401",
  showSuccessMessage: false, //成功/失败提示
  showErrorMessage: false, //成功/失败提示
  silent: false, //不显示loading
  resumeOnError: false //false时失败直接抛出异常
};
const BASE_URL = config.baseUrl;
export default {
  //api列表
  api: BASE_URL + "/application/post/",

  //post请求,resumeOnError为false时,失败将会抛出异常,request的异常信息,或者data.Msg
  post: async function(option) {
    const defaultOption = {
      method: "POST"
    };
    option = Object.assign({}, defaultOption, option);
    return await this.request(option);
  },

  upload: async function(options) {
    let formData = new FormData();
    const defaultOptions = {
      formData: formData
    };
    options = Object.assign({}, defaultOptions, options);
    //TODO upload
    console.log(options);
  },

  get: async function(option) {
    const defaultOption = {
      method: "GET"
    };
    option = Object.assign({}, defaultOption, option);
    return await this.request(option);
  },

  request: async function(option) {
    const defaultOption = DEFAULT_OPTION;
    defaultOption.token = getToken() || undefined;
    option = Object.assign({}, defaultOption, option);
    const axiosInstance = axios.create();
    this.interceptors(axiosInstance, option);
    try {
      if (!option.silent) {
        store.commit("loading", 1);
      }
      let header = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      header[config.tokenHeader] = option.token;
      const res = await axiosInstance.request({
        url: option.url,
        data: option.data,
        method: option.method,
        transformRequest: [
          function(data) {
            return qs.stringify(data, { arrayFormat: "brackets" });
          }
        ],
        responseType: option.responseType,
        header: header
      });
      if (option.showSuccessMessage) {
        await messenger.toast({
          msg: res.data[option.msgKey] || "操作成功"
        });
      }
      if (res.data[option.tokenKey]) {
        setToken(res.data[option.tokenKey]);
      }
      return res.data[option.dataKey];
    } catch (err) {
      if (!option.resumeOnError) {
        throw err;
      }
    } finally {
      if (!option.silent) {
        store.commit("loading", -1);
      }
    }
  },

  interceptors(instance, option) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      async axiosResponse => {
        const { data, status } = axiosResponse;
        //请求范围服务器失败代码
        if (data[option.codeKey]?.toString() !== option.successCode) {
          //未登录/授权
          let error = data[option.msgKey] || "未知错误";
          if (data[option.codeKey]?.toString() === option.notLoginCode) {
            let confirm = await messenger.confirm({
              title: "需要登录",
              okBtnText: "前往授权",
              cancelBtnText: "再看看"
            });
            if (confirm) {
              await router.push({
                path: config.loginPath
              });
            }
          } else if (option.showErrorMessage) {
            await messenger.alert({
              title: "操作失败",
              msg: error
            });
          }
          throw error;
        } else {
          return { data, status };
        }
      },
      error => {
        if (option.showErrorMessage) {
          messenger.alert({ msg: "服务器连接失败，请联系管理员" });
        }
        return Promise.reject(error);
      }
    );
  }
};
