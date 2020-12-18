<template>
  <div>
    <router-view></router-view>
    <div
      v-if="loading"
      class="loading-container"
      @click="onLoadingContentClick()"
    >
      <loading></loading>
    </div>
    <notifications>
      <template slot="body" slot-scope="props">
        <div style="width: 100%">
          {{ props.item.title }}
        </div>
      </template>
    </notifications>
  </div>
</template>
<script>
import Loading from "@/components/loading/Loading";
import StateMixin from "@/mixins/StateMixin.vue";
export default {
  name: "App",
  components: { Loading },
  mixins: [StateMixin],
  methods: {
    onLoadingContentClick() {}
  }
};
</script>
<style scoped>
.loading-container {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
