<template>
  <div>
    <router-view></router-view>
    <!--公共加载中组件-->
    <FullScreenLoadingWidget />
    <!--公共通知组件-->
    <AppNotification
      position="top right"
      group="top"
      width="100%"
      orientation-vertical="up"
    />
    <!--公共通知组件-->
    <AppNotification
      position="bottom right"
      group="bottom"
      width="100%"
      orientation-vertical="down"
    />
  </div>
</template>
<script>
import AppNotification from "@/components/AppNotification";
import FullScreenLoadingWidget from "@/components/FullScreenLoadingWidget";

export default {
  name: "App",
  components: { FullScreenLoadingWidget, AppNotification }
};
</script>
