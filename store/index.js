export const state = () => ({
  authAdmin: null
})
export const mutations = {
  SET_ADMIN: function(state, admin) {
    state.authAdmin = admin
  }
}
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit("SET_USER", req.session.authUser)
    }
  }
}
