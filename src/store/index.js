import Vue from "vue";
import Vuex from "vuex";
import fetchSearch from "./fetch.search";
import fetchMovie from "./fetch.movie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { fetchSearch, fetchMovie },
});
