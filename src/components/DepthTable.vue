<template>
<div id="app">
  <v-app id="inspire">
    <h1>{{activeSymbolTitle}}</h1>
    <v-row justify="center">
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Amount</th>
                <th class="text-left">Price</th>
                <th class="text-left d-none d-sm-flex pa-3">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,id) in activeSymbolInfo.asks" :key="id">
                <td class="text-left pa-3">{{ +item[1] }}</td>
                <td class="text-left pa-3">{{ +item[0] }}</td>
                <td class="text-left d-none d-sm-flex pa-3">{{ item[1] * item[0] }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Amount</th>
                <th class="text-left">Price</th>
                <th class="text-left d-none d-sm-flex">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,id) in activeSymbolInfo.bids" :key="id">
                 <td>{{ +item[1] }}</td>
                <td>{{ +item[0] }}</td>
                <td class="text-left d-none d-sm-flex">{{ item[0] * item[1] }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data () {
    return{
    title: 'BTCUSDT'
    }
  },
  computed: {
    ...mapGetters(["activeSymbolInfo","activeSymbolTitle"]),
  },

};
</script>

<style lang="scss">
@media screen and (max-width: 500px) {
  tr td, th {
    display: block;
  }
}
</style>