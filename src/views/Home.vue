<template>
  <div>
    <section class="home">Hello World</section>
    <section>
      <button @click="requestMock()">测试请求</button>
      <button @click="notificationMock()">测试通知</button>
    </section>
  </div>
</template>

<script>
import { START_LOADING, STOP_LOADING } from "@/store/mutationTypes";

export default {
  name: "Home",
  methods: {
    async requestMock() {
      this.$store.commit(START_LOADING);
      await this.$delay(2000);
      this.$store.commit(STOP_LOADING);
    },
    notificationMock() {
      this.$notify({
        text: "text From Vue",
        title: "title From Vue",
        type: "error",
        duration: 20000
      });
    }
  }
};
</script>
