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
import { mapMutations } from "vuex";

export default {
  name: "Home",
  methods: {
    ...mapMutations({
      START_LOADING,
      STOP_LOADING
    }),
    async requestMock() {
      this.START_LOADING();
      await this.$delay(2000);
      this.STOP_LOADING();
    },
    notificationMock() {
      this.$notify({
        text: "text From Vue",
        title: "title From Vue",
        type: "warning",
        duration: 6222222
      });
    }
  }
};
</script>
