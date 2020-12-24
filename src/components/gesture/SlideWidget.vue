<template>
  <div
    :class="{ content: true, end: !moving }"
    ref="content"
    :style="`transform:translateY(${-slideY}px) translateX(${-slideX}px) `"
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
        return (
          [
            "up",
            "down",
            "left",
            "right",
            "vertical",
            "horizontal",
            "all"
          ].indexOf(value) !== -1
        );
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
      startX: 0, //触摸位置
      endX: 0, //结束位置
      moveX: 0, //滑动时的位置
      distanceX: 0, //移动距离
      slideX: 0,
      moving: false
    };
  },
  methods: {
    // 向左滚动代码
    touchStart(ev) {
      if (ev.touches.length === 1) {
        // 记录开始位置
        this.startY = ev.touches[0].clientY;
        this.startX = ev.touches[0].clientX;
        this.moving = true;
      }
    },
    touchMove(ev) {
      if (!this.$refs.content) {
        this.moving = false;
        return;
      }
      let contentHeight = this.$refs.content.offsetHeight;
      let contentWidth = this.$refs.content.offsetWidth;
      if (ev.touches.length === 1) {
        this.moveY = ev.touches[0].clientY;
        this.moveX = ev.touches[0].clientX;
        this.distanceY = this.startY - this.moveY;
        this.distanceX = this.startX - this.moveX;
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
        } else if (this.orientation === "down") {
          if (this.distanceY >= 0) {
            this.slideY = 0;
          } else if (this.distanceY < 0) {
            if (this.distanceY >= contentHeight) {
              this.slideY = contentHeight;
            } else {
              this.slideY = this.distanceY;
            }
          }
        } else if (this.orientation === "vertical") {
          if (this.distanceY >= contentHeight) {
            this.slideY = contentHeight;
          } else {
            this.slideY = this.distanceY;
          }
        } else if (this.orientation === "left") {
          if (this.distanceX <= 0) {
            this.slideX = 0;
          } else if (this.distanceX > 0) {
            if (this.distanceX >= contentWidth) {
              this.slideX = contentWidth;
            } else {
              this.slideX = this.distanceX;
            }
          }
        } else if (this.orientation === "right") {
          if (this.distanceX >= 0) {
            this.slideX = 0;
          } else if (this.distanceX < 0) {
            if (this.distanceX >= contentWidth) {
              this.slideX = contentWidth;
            } else {
              this.slideX = this.distanceX;
            }
          }
        } else if (this.orientation === "horizontal") {
          if (this.distanceX >= contentWidth) {
            this.slideX = contentWidth;
          } else {
            this.slideX = this.distanceX;
          }
        } else {
          if (this.distanceX >= contentWidth) {
            this.slideX = contentWidth;
          } else {
            this.slideX = this.distanceX;
          }
          if (this.distanceY >= contentHeight) {
            this.slideY = contentHeight;
          } else {
            this.slideY = this.distanceY;
          }
        }
      }
    },
    touchEnd(ev) {
      if (!this.$refs.content) {
        return;
      }
      let contentHeight = this.$refs.content.offsetHeight;
      let contentWidth = this.$refs.content.offsetWidth;
      if (ev.changedTouches.length === 1) {
        let endY = ev.changedTouches[0].clientY;
        let endX = ev.changedTouches[0].clientX;
        this.distanceY = this.startY - endY;
        this.distanceX = this.startX - endX;
        if (Math.abs(this.distanceY) < contentHeight / 2) {
          this.slideY = 0;
        } else {
          this.slideY = contentHeight;
          this.slideX = contentWidth;
          this.$emit("end");
        }
        if (Math.abs(this.distanceX) < contentWidth / 2) {
          this.slideX = 0;
        } else {
          this.slideY = contentHeight;
          this.slideX = contentWidth;
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
