const cookieparser = process.server && require('cookieparser');

const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      const user = JSON.parse(parsed.user);
      commit('user/setUser', user);
    }
  },
};

export { actions };
