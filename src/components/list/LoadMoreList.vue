<template>
  <div
    :ref="'container' + _uid"
    class="overflow-y-auto overflow-x-hidden"
    @scroll="onScroll"
  >
    <template v-if="loading && firstLoading">
      <v-skeleton-loader
        type=""
        tile
        v-for="n in skeletonCount"
        :key="n + 'boilerplate'"
      >
      </v-skeleton-loader>
    </template>

    <v-list>
      <slot> </slot>
      <slot v-bind:hasMore="hasMore" v-bind:loading="loading" name="footer">
        <div class="subtitle-1 grey--text text-center" v-if="loading">
          <v-icon style="margin: auto">mdi-loading mdi-spin</v-icon>
        </div>
        <div class="subtitle-1 grey--text text-center" v-else-if="!hasMore">
          没有更多了
        </div>
        <div
          class="subtitle-1 grey--text text-center"
          @click="clickLoadMore"
          v-else
        >
          加载更多
        </div>
      </slot>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "LoadMoreList",
  props: {
    //是否有更多列表项
    hasMore: {
      type: Boolean,
      default: true
    },
    //加载中
    loading: {
      type: Boolean,
      default: false
    },
    //站位的列表项个数
    skeletonCount: {
      type: Number,
      default: 3
    },
    //站位的列表项类型
    skeletonType: {
      type: String,
      default: "list-item-avatar-three-line"
    },
    bottomThreshold: {
      type: Number,
      default: 100
    }
  },
  data: function() {
    return {
      bottom: false,
      firstLoading: true
    };
  },

  methods: {
    onScroll: function(e) {
      let top = e.target.scrollTop;
      let height = e.target.scrollHeight;
      let visible = e.target.clientHeight;
      this.bottom = height <= top + visible + this.bottomThreshold;
      if (this.bottom) {
        this.$emit("on-load-more");
        this.firstLoading = false;
      }
    },
    clickLoadMore: function() {
      this.$emit("on-load-more");
    }
  }
};
</script>

<style scoped></style>
