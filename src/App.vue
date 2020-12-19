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
    <notifications width="100%">
      <template slot="body" slot-scope="props">
        <div
          @click="props.close"
          :class="['notification-container', `${props.item.type}`]"
        >
          <div class="notification-prefix"></div>
          <div style="padding: 8px 10px;">
            <div style="width: 100%;font-size: 20px">
              {{ props.item.title }}
            </div>
            <div style="width: 100%;text-overflow: ellipsis">
              {{ props.item.text }}
            </div>
          </div>
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
<style scoped lang="scss">
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

$success: #3f8c42;
$success-lighten: #78bd7a;
$info: #2491ea;
$info-lighten: #5dacee;
$warning: #f18809;
$warning-lighten: #f3a554;
$error: #f65152;
$error-lighten: #f67b7c;

.error {
  background-color: $error;

  .notification-prefix {
    background-color: $error-lighten;
  }
}

.warning {
  background-color: $warning;

  .notification-prefix {
    background-color: $warning-lighten;
  }
}

.info {
  background-color: $info;

  .notification-prefix {
    background-color: $info-lighten;
  }
}

.success {
  background-color: $success;

  .notification-prefix {
    background-color: $success-lighten;
  }
}

.notification-container {
  color: white;
  border-radius: 10px;
  margin: 4px 6px;
  clip: auto;
  display: flex;
  flex-direction: row;

  .notification-prefix {
    width: 10px;
    border-radius: 10px 0 0 10px;
  }
}
</style>
