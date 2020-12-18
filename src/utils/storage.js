import config from "@/utils/activity/config";
export const TOKEN_KEY = config.tokenKey;
export const USER_INFO_KEY = config.userInfoKey;

function set(key, token) {
  if (token) {
    localStorage.setItem(key, token);
  } else {
    localStorage.removeItem(key);
  }
}
function get(key) {
  const token = localStorage.getItem(key);
  if (token && token !== "null" && token !== "undefined") {
    return token;
  } else {
    return undefined;
  }
}

export const setToken = token => {
  set(TOKEN_KEY, token);
};

export const getToken = () => {
  return get(TOKEN_KEY);
};

export const setUserInfo = user => {
  set(USER_INFO_KEY, JSON.stringify(user));
};

export const getUserInfo = () => {
  const userString = get(USER_INFO_KEY);
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
