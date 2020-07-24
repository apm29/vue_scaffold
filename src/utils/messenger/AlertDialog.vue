<template>
  <v-dialog v-model="show" persistent light max-width="290">
    <v-card>
      <v-card-title>
        <span>{{ options.title }}</span>
      </v-card-title>
      <v-card-text>
        <div>{{ options.msg }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="ok()" color="primary">{{ options.okBtnText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AlertDialog",

  data: function() {
    return {
      show: true,
      value: false,
      options: {
        title: "提示",
        msg: "",
        okBtnText: "确定"
      }
    };
  },

  methods: {
    ok: function() {
      this.value = true;
      this.show = false;
      this.$destroy();
    }
  }
};
</script>
