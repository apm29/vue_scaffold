import Vue from "vue";
import VueRouter from "vue-router";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  console.log(from);
  document.title = to.name || store.state.app.name;
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
