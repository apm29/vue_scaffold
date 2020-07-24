<template>
  <v-snackbar
    v-model="show"
    :absolute="options.absolute"
    :top="options.top"
    :right="options.right"
    :bottom="options.bottom"
    :vertical="options.vertical"
    :left="options.left"
    :timeout="options.timeout"
    :color="options.color"
    :multi-line="options.multi_line"
  >
    <div class="d-flex flex-row align-center">
      <div class="flex-grow-1 title">
        {{ options.msg }}
      </div>
      <v-btn
        v-if="options.show_close"
        :color="options.close_text_color"
        text
        @click="show = false"
        ><v-icon>{{ options.close_text }}</v-icon></v-btn
      >
    </div>
  </v-snackbar>
</template>

<script>
export default {
  name: "Toast",

  data: function() {
    return {
      show: true,
      options: {}
    };
  }
};
</script>
