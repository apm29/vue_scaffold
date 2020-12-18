import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
import { router } from "./index";

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  console.log(from);
  document.title = to.name || store.state.app.name;
  next();
});
router.afterEach(() => {
  NProgress.done();
});
