<script>
export default {
  name: "StateMixin",
  data: function() {
    return {
      loading: false
    };
  },
  watch: {
    "$store.state.app.loading": {
      immediate: true,
      handler: async function(val) {
        if (val <= 0) {
          await this.$delay(350);
        }
        this.loading = val > 0;
      }
    }
  }
};
</script>

<style scoped></style>
