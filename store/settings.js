export const state = () => ({
  drawer: false,
})

export const mutations = {
  SET_DRAWER(state, payload) {
    state.drawer = payload
  },
}

export const getters = {
  DRAWER(state) {
    return state.drawer
  },
}
