import config from "@/config/storage.config";
let TOKEN_KEY = config.tokenKey;
let USER_INFO_KEY = config.userInfoKey;

/**
 * 私有方法,设置localStorage数据
 * @param key
 * @param token
 */
function setLocalStorage(key, token) {
  if (token) {
    localStorage.setItem(key, token);
  } else {
    localStorage.removeItem(key);
  }
}

/**
 * 私有方法,获取localStorage数据
 * @param key
 */
function getLocalStorage(key) {
  const token = localStorage.getItem(key);
  if (token && token !== "null" && token !== "undefined") {
    return token;
  } else {
    return undefined;
  }
}

/*
 * 暴露的公共方法,作为设置到浏览器本地的数据公共入口,方便统一修改
 */

export const setToken = token => {
  setLocalStorage(TOKEN_KEY, token);
};

export const getToken = () => {
  return getLocalStorage(TOKEN_KEY);
};

export const setUserInfo = user => {
  setLocalStorage(USER_INFO_KEY, JSON.stringify(user));
};

export const getUserInfo = () => {
  const userString = getLocalStorage(USER_INFO_KEY);
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch (e) {
      console.log(e);
      return undefined;
    }
  } else {
    return undefined;
  }
};
