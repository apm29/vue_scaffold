<script>
export default {
  name: "StateMixin",
  data: function() {
    return {
      loading: false,
      lastVisibleTime: 0,
      minimumTime: 600
    };
  },
  watch: {
    "$store.state.app.loading": {
      immediate: true,
      handler: async function(val) {
        let now = new Date().getTime();
        if (val <= 0) {
          let duration = now - this.lastVisibleTime;
          if (duration < this.minimumTime) {
            await this.$delay(this.minimumTime - duration);
          }
        }
        this.loading = val > 0;
        if (this.loading) {
          this.lastVisibleTime = now;
        }
      }
    }
  }
};
</script>

<style scoped></style>
