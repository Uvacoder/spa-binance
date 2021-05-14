import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeSymbolInfo: {},
    activeSymbolTitle: 'BTCUSDT',
    changedElements: []
  },
  mutations: {
    updateActiveSymbolTitle(state, activeSymbol) {
      state.activeSymbolTitle = activeSymbol;
    },
    updateActiveSymbolInfo(state, payload) {
      state.activeSymbolInfo = payload;
    },
    loadChangeElements(state, payload) {
      state.changedElements = payload;
    },
  },
  actions: {
    async updateActiveSymbol({commit}, activeSymbol) {
      const response = await axios
        .get("https://api.binance.com/api/v3/depth", {
          params: {
            symbol: activeSymbol,
            limit: 500
          }
        });
      if (response) {
        const asks = {};
        response.data.asks.forEach((item) => {
          asks[item[0]] = item;
        });
        const bids = {};
        response.data.bids.forEach((item) => {
          bids[item[0]] = item;
        });
        commit("updateActiveSymbolInfo", {asks, bids});
        commit('updateActiveSymbolTitle', activeSymbol);
      }
    },
    updateValues(context, obj) {
      const asks = context.state.activeSymbolInfo.asks;
      obj.a.forEach((item) => {
        if (item[1] === "0.00000000") {
          delete asks[item[0]];
        } else {
          asks[item[0]] = item;
        }
      })
      const bids = context.state.activeSymbolInfo.bids;
      obj.b.forEach((item) => {
        if (item[1] === "0.00000000") {
          delete bids[item[0]];
        } else {
          bids[item[0]] = item;
        }
      })
    },
    saveChangedElements({commit}, elements) {
      const changedBids = elements.b.filter((item) => item[1] !== "0.00000000");
      const changedAsks = elements.a.filter((item) => item[1] !== "0.00000000");
      const changedElements = changedAsks.concat(changedBids)
      commit("loadChangeElements", changedElements);
    }
  },
  getters: {
    activeSymbolInfo: s => s.activeSymbolInfo,
    activeSymbolTitle: s=> s.activeSymbolTitle,
    changedElements: s=> s.changedElements
  }
})
