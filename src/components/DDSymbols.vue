<template>
 <div>
      <v-overflow-btn
              class="my-2"
              :items="symbols"
              label="Select active symbol"
              :value="activeSymbolTitle"
              @change="updateSymbol"
            ></v-overflow-btn>
 </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data () {
        return {
            symbols: ['BTCUSDT','BNBBTC','ETHBTC'],
        }
    },
    computed: {
        ...mapGetters(["activeSymbolTitle"])
    },
    methods: {
        ...mapActions(["updateActiveSymbol"]),
        updateSymbol(value) {
            this.updateActiveSymbol(value)
        }
    }
}
</script>

<style>

</style>