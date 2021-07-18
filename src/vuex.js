import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  token: null,
  boards: [{
    id: '0',
    title: 'on hold',
    class: 'on-hold',
    cards: []
  }, {
    id: '1',
    title: 'in progress',
    class: 'in-progress',
    cards: []
  }, {
    id: '2',
    title: 'needs review',
    class: 'needs-review',
    cards: []
  }, {
    id: '3',
    title: 'approved',
    class: 'approved',
    cards: []
  }]
};

const store = new Vuex.Store({
  state,
  getters: {
    token: state => state.token,
    boards: state => state.boards,
  },
  actions: {
    token(context, token) {
      context.commit('token', token);
    },
    boards(context, boards) {
      context.commit('boards', boards);
    },
  },
  mutations: {
    token(state, token) {
      state.token = token;
    },
    boards(state, boards) {
      state.boards = boards;
    },
  }
});

export default store;