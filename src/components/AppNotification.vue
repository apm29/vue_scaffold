<template>
  <notifications
    animation-type="velocity"
    :animation="animation"
    v-bind="$attrs"
  >
    <template slot="body" slot-scope="props">
      <slide-widget :orientation="orientationHorizontal" @end="props.close()">
        <slide-widget :orientation="orientationVertical" @end="props.close()">
          <div
            @click="props.close"
            :class="['notification-container', `${props.item.type}`]"
          >
            <div class="notification-prefix"></div>
            <div class="notification-content">
              <div class="notification-title">
                {{ props.item.title }}
              </div>
              <div class="notification-text">
                {{ props.item.text }}{{ props.item.group }}
              </div>
            </div>
          </div>
        </slide-widget>
      </slide-widget>
    </template>
  </notifications>
</template>
<script>
import SlideWidget from "@/components/gesture/SlideWidget";

export default {
  name: "AppNotification",
  components: { SlideWidget },
  props: {
    orientationVertical: {
      type: String,
      default: "up",
      validator: function(value) {
        return ["up", "down", "vertical"].indexOf(value) !== -1;
      }
    },
    orientationHorizontal: {
      type: String,
      default: "horizontal",
      validator: function(value) {
        return ["left", "right", "horizontal"].indexOf(value) !== -1;
      }
    }
  },
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
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/common.scss";

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

  .notification-content {
    padding: 8px 10px;
  }
}
</style>
