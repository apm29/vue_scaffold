<template>
  <div>
    <router-view></router-view>
    <!--公共加载中组件-->
    <div
      v-if="loading"
      class="loading-container"
      @click="onLoadingContentClick()"
    >
      <loading></loading>
    </div>
    <!--公共通知组件-->
    <notifications
      width="100%"
      animation-type="velocity"
      :animation="animation"
      position="top right"
      group="top"
    >
      <template slot="body" slot-scope="props">
        <slide-widget @end="props.close()">
          <div
            @click="props.close"
            :class="['notification-container', `${props.item.type}`]"
          >
            <div class="notification-prefix"></div>
            <div style="padding: 8px 10px;">
              <div class="notification-title">
                {{ props.item.title }}
              </div>
              <div class="notification-text">
                {{ props.item.text }}{{ props.item.group }}
              </div>
            </div>
          </div>
        </slide-widget>
      </template>
    </notifications>
    <!--公共通知组件-->
    <notifications
      width="100%"
      animation-type="velocity"
      :animation="animation"
      position="bottom right"
      group="bottom"
    >
      <template slot="body" slot-scope="props">
        <slide-widget orientation="down" @end="props.close()">
          <div
            @click="props.close"
            :class="['notification-container', `${props.item.type}`]"
          >
            <div class="notification-prefix"></div>
            <div style="padding: 8px 10px;">
              <div class="notification-title">
                {{ props.item.title }}
              </div>
              <div class="notification-text">
                {{ props.item.text }}{{ props.item.group }}
              </div>
            </div>
          </div>
        </slide-widget>
      </template>
    </notifications>
  </div>
</template>
<script>
import Loading from "@/components/loading/Loading";
import StateMixin from "@/mixins/StateMixin.vue";
import SlideWidget from "@/components/gesture/SlideWidget";

export default {
  name: "App",
  components: { SlideWidget, Loading },
  mixins: [StateMixin],
  data() {
    return {
      animation: {
        enter(element) {
          let height = element.clientHeight;
          return {
            marginTop: [0, -height]
          };
        },
        leave: {
          height: 0,
          opacity: 0
        }
      }
    };
  },
  methods: {
    onLoadingContentClick() {}
  }
};
</script>
<style scoped lang="scss">
@import "./style/common.scss";
@import "./style/mixin.scss";

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
  border-radius: 8px;
  margin: 8px 8px;
  clip: auto;
  display: flex;
  flex-direction: row;
  box-shadow: #555555 2px 2px 8px;

  .notification-prefix {
    width: 10px;
    border-radius: 10px 0 0 10px;
  }

  .notification-title {
    color: white;
    width: 100%;
    font-size: 20px;
  }

  .notification-text {
    color: white;
    width: 100%;
    word-break: break-all;
  }
}
</style>
