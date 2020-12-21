<template>
  <div
    :class="{ content: true, end: !moving }"
    ref="content"
    :style="`transform:translateY(${-slideY}px)`"
  >
    <div @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlideWidget",
  props: {
    orientation: {
      type: String,
      default: "up",
      validator: function(value) {
        return ["up", "down"].indexOf(value) !== -1;
      }
    }
  },
  data() {
    return {
      startY: 0, //触摸位置
      endY: 0, //结束位置
      moveY: 0, //滑动时的位置
      distanceY: 0, //移动距离
      slideY: 0,
      moving: false
    };
  },
  methods: {
    // 向左滚动代码
    touchStart(ev) {
      if (ev.touches.length === 1) {
        // 记录开始位置
        this.startY = ev.touches[0].clientY;
        this.moving = true;
      }
    },
    touchMove(ev) {
      let contentHeight = this.$refs.content.offsetHeight;
      if (ev.touches.length === 1) {
        this.moveY = ev.touches[0].clientY;
        this.distanceY = this.startY - this.moveY;
        if (this.orientation === "up") {
          if (this.distanceY <= 0) {
            this.slideY = 0;
          } else if (this.distanceY > 0) {
            if (this.distanceY >= contentHeight) {
              this.slideY = contentHeight;
            } else {
              this.slideY = this.distanceY;
            }
          }
        } else {
          if (this.distanceY >= 0) {
            this.slideY = 0;
          } else if (this.distanceY < 0) {
            if (this.distanceY >= contentHeight) {
              this.slideY = contentHeight;
            } else {
              this.slideY = this.distanceY;
            }
          }
        }
      }
    },
    touchEnd(ev) {
      if (!this.$refs.content) {
        return;
      }
      let contentHeight = this.$refs.content.offsetHeight;
      if (ev.changedTouches.length === 1) {
        let endY = ev.changedTouches[0].clientY;
        this.distanceY = this.startY - endY;
        if (Math.abs(this.distanceY) < contentHeight / 2) {
          this.slideY = 0;
        } else {
          this.slideY = contentHeight;
          this.$emit("end");
        }
        this.moving = false;
      }
    }
  }
};
</script>

<style scoped>
.end {
  transition: all 0.8s ease;
}
</style>
