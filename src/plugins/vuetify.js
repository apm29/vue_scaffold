import Vue from "vue";
import Vuetify from "vuetify/lib";
import zhHans from "vuetify/es5/locale/zh-Hans";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#009688",
        secondary: "#ff9800",
        accent: "#cddc39",
        error: "#f44336",
        warning: "#ff5722",
        info: "#2196f3",
        success: "#4caf50"
      }
    }
  },
  lang: {
    locales: { zhHans },
    current: "zh-Hans"
  }
});
