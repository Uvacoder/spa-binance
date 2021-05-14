<template>
  <div id="app">
  <v-app id="inspire">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        app
        clipped
      >
        <v-list dense>
          <v-list-item link :to="'/'">
            <v-list-item-action>
              <v-icon>fa-glass-whiskey</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Depth</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/symbols'">
            <v-list-item-action>
              <v-icon>fa-stream</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Symbols</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar
        app
        clipped-left
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>BINANCE INFO</v-toolbar-title>
      </v-app-bar>
  
      <v-main>
        <v-container
          fluid
        >
          <v-row
          justify="center"
          >
            <router-view />
          </v-row>
        </v-container>
      </v-main>
  
      <v-footer app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </v-app>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    drawer: null,
  }),
  methods: {
    ...mapActions(["updateActiveSymbol", "saveChangedElements", "updateValues"])
  },
  computed: {
    ...mapGetters(["activeSymbolTitle"])
  },
  watch: {
    activeSymbolTitle: function () {
      const self = this;
      this.connection.close();
      this.connection = new WebSocket(`wss://stream.binance.com:9443/ws/${this.activeSymbolTitle.toLowerCase()}@depth`)

    this.connection.onopen = function() {
      self.updateActiveSymbol(self.activeSymbolTitle);
      
    }

    this.connection.onmessage = function(event) {
      self.saveChangedElements(JSON.parse(event.data));
      self.updateValues(JSON.parse(event.data));
    }
    }
  },
  created () {
    const self = this;
    this.$vuetify.theme.dark = true;

    this.connection = new WebSocket(`wss://stream.binance.com:9443/ws/${this.activeSymbolTitle.toLowerCase()}@depth`)

    this.connection.onopen = function() {
      self.updateActiveSymbol(self.activeSymbolTitle);
      
    }

    this.connection.onmessage = function(event) {
      self.saveChangedElements(JSON.parse(event.data));
      self.updateValues(JSON.parse(event.data));
    }


  },
}
</script>
