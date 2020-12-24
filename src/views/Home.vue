<template>
  <div>
    <section class="home">Hello World</section>
    <section>
      <button @click="requestMock">测试请求</button>
      <button @click="requestMockDebounce">测试debounce请求</button>
      <button @click="notificationMockTop()">测试顶部通知</button>
      <button @click="notificationMockBottom()">测试底部通知</button>
    </section>
  </div>
</template>

<script>
import { START_LOADING, STOP_LOADING } from "@/store/mutationTypes";
import { mapMutations } from "vuex";
import { debounce } from "lodash";

export default {
  name: "Home",
  methods: {
    ...mapMutations({
      START_LOADING,
      STOP_LOADING
    }),
    requestMockDebounce: debounce(
      async function() {
        let res = await this.$remote.post({
          url: "/test/network",
          silent: true
        });
        this.$notification(JSON.stringify(res));
      },
      500,
      {
        leading: true,
        trailing: false
      }
    ),
    async requestMock() {
      let res = await this.$remote.post({
        url: "/test/network"
      });
      this.$notification(JSON.stringify(res));
    },
    notificationMockTop() {
      this.$notification(`{
        text: "text From Vue",
        title: "title From Vue",
        type: "warning",
        group: "top",
        duration: 6222222
      }`);
    },
    notificationMockBottom() {
      this.$notification({
        text: "text From Vue",
        title: "title From Vue",
        type: "warning",
        group: "bottom",
        duration: 6222
      });
    }
  }
};
</script>
