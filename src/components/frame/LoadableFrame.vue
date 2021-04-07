<template>
  <mescroll-vue
    :down="scroll.down"
    :up="scroll.up"
    class="flex-grow-1 list-wrapper"
    @init="initScroll"
    id="scrolling-target"
  >
    <slot name="default"></slot>
  </mescroll-vue>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";

export default {
  name: "LoadableFrame",
  components: { MescrollVue },
  props: {
    noMoreText: String,
    noDataText: String,
    autoLoadMore: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      mescroll: undefined,
      scroll: {
        down: {
          auto: false,
          mustToTop: true
        },
        up: {
          auto: this.autoLoadMore,
          callback: this.onLoadMore,
          htmlNodata: `<p class="caption">${this.noMoreText ||
            "没有更多数据了~"}</p>`,
          empty: {
            warpId: "scrolling-target",
            icon: null,
            tip: this.noDataText || "暂无相关数据~",
            btntext: "",
            btnClick: null,
            supportTap: false
          }
        }
      }
    };
  },
  methods: {
    initScroll(mescroll) {
      this.mescroll = mescroll;
    },
    refresh(scrollToTop = false) {
      if (this.mescroll) {
        this.mescroll.resetUpScroll();
        if (scrollToTop) this.mescroll.scrollTo(0);
      }
    },
    onLoadMore(page, mescroll) {
      this.$emit("on-load-more", page, mescroll);
    }
  }
};
</script>

<style scoped></style>
