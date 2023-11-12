export default {
  state: {
    user: null,
    token: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    login(context, payload) {
      context.commit("SET_USER", payload.user);
      context.commit("SET_TOKEN", payload.token);
    },
  },
  getters: {
    user: function () {
      return state.user;
    },
    token: function () {
      return state.token;
    },
  },
};
