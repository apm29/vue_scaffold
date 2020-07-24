<template>
  <v-app>
    <v-main class="fill-height">
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="48"></v-progress-circular>
      </v-overlay>
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-main>
    <notifications>
      <template slot="body" slot-scope="props">
        <v-card class="mx-2 my-1">
          <v-list-item
            :three-line="props.item.text && props.item.title"
            :class="{ [getColor(props.item.type)]: true, 'lighten-5': true }"
          >
            <v-list-item-icon class="align-self-center">
              <v-icon :color="props.item.type">
                {{ getIcon(props.item.type) }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-if="props.item.title">
                {{ props.item.title }}
              </v-list-item-title>
              <v-list-item-subtitle
                v-if="props.item.title"
                v-html="props.item.text"
              >
              </v-list-item-subtitle>
              <div v-else v-html="props.item.text"></div>
            </v-list-item-content>
            <v-list-item-action class="align-self-center">
              <v-btn icon @click="props.close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </template>
    </notifications>
  </v-app>
</template>
<script>
import StateMixin from "@/mixins/StateMixin";

export default {
  name: "App",
  mixins: [StateMixin],
  methods: {
    getIcon: function(type) {
      switch (type) {
        case "info":
          return "mdi-information-variant";
        case "error":
          return "mdi-close-circle";
        case "warning":
          return "mdi-information-outline";
        case "success":
          return "mdi-check-circle";
        default:
          return "mdi-information-variant";
      }
    },
    getColor: function(type) {
      let dark = this.$store.state.app.dark;
      switch (type) {
        case "info":
          return dark ? "#424242" : "white";
        case "error":
          return dark ? "#424242" : "red";
        case "warning":
          return dark ? "#424242" : "orange";
        case "success":
          return dark ? "#424242" : "white";
        default:
          return dark ? "#424242" : "white";
      }
    }
  }
};
</script>
<style>
.image-thumbnail {
  max-width: 90px;
  height: 80px;
}

.image-icon {
  width: 50px;
  height: 50px;
}

.fill-width {
  width: 100%;
}
</style>
