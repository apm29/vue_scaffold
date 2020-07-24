import config from "@/utils/config";
export const TOKEN_KEY = config.tokenKey;

export const setToken = token => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  const token = sessionStorage.getItem(TOKEN_KEY);
  if (token) {
    return token;
  } else {
    return undefined;
  }
};
