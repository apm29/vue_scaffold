export default {
  baseUrl:
    process.env.NODE_ENV === "development" ? "http://eapp2.ciih.net/" : "/",
  uploadBaseUrl: process.env.NODE_ENV === "development" ? "/" : "/",
  tokenKey: "token",
  tokenHeader: "Token",
  fileBaseUrl: "/",
  loginPath: "/login"
};
