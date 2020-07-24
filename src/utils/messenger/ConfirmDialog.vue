<template>
  <v-dialog v-model="show" persistent max-width="290" light>
    <v-card>
      <v-card-title>
        <span>{{ options.title }}</span>
      </v-card-title>
      <v-card-text>
        <div>{{ options.msg }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="ok()" color="primary">{{ options.okBtnText }}</v-btn>
        <v-btn @click="cancel()">{{ options.cancelBtnText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDialog",

  data: function() {
    return {
      show: true,
      value: false,
      options: {
        title: "提示",
        msg: "",
        okBtnText: "确定",
        cancelBtnText: "取消"
      }
    };
  },

  methods: {
    ok: function() {
      this.value = true;
      this.show = false;
      this.$destroy();
    },
    cancel: function() {
      this.value = false;
      this.show = false;
      this.$destroy();
    }
  }
};
</script>
