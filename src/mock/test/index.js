import Mock from "mockjs";
import config from "@/config/network.config";

let domain = config.baseUrl;
Mock.mock(domain + "/test/network", "post", () => {
  console.warn("mock: /test/network");
  return {
    status: "1",
    data: {
      districtName: "景城嘉苑",
      districtInfo: "景城嘉苑",
      districtAddr: "浙江省诸暨市陶朱街道詹家山北路8号"
    },
    text: "测试TEXT"
  };
});
