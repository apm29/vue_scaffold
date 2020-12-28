<template>
  <div v-if="loading" class="loading-container" @click="onLoadingContentClick">
    <loading></loading>
  </div>
</template>
<script>
import Loading from "@/components/loading/Loading";
import StateMixin from "@/mixins/StateMixin";

export default {
  name: "FullScreenLoadingWidget",
  components: { Loading },
  mixins: [StateMixin],
  methods: {
    onLoadingContentClick() {}
  }
};
</script>
<style>
.loading-container {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 999999;
}
</style>
