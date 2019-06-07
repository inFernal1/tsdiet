export const state = () => ({
  authUser: null
})
export const mutations = {
  SET_USER: function(state, user) {
    state.authUser = user
  }
}
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit("SET_USER", req.session.authUser)
    }
  },
  async login({ commit }, { email, password }) {
    try {
      console.log(password)
      //const { data } = await axios.post('https://thesmartestdiet.herokuapp.com/api/login', { login, password })
      const { data } = await axios.post('http://127.0.0.1:3000/api/login', { email, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async registration({ commit }, { email, password, passwordTwo }) {
    try {
      console.log(passwordTwo)
      //const { data } = await axios.post('https://thesmartestdiet.herokuapp.com/api/login', { login, password })
      const { data } = await axios.post('http://127.0.0.1:3000/api/register', { email, password, passwordTwo })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async logout({ commit }) {
    //await axios.post('https://thesmartestdiet.herokuapp.com/api/logout')
    await axios.post('http://127.0.0.1:3000/api/logout')
    commit('SET_USER', null)
  }
}
