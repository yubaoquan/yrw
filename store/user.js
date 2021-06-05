function getState() {
  return {
    user: null,
  };
}

const getters = {};
const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};
const actions = {};

export { getState as state, mutations, actions, getters };
