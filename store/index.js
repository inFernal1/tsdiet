      export const state = () => ({
        authAdmin: null
      })
      export const mutations = {
        SET_ADMIN: function (state, admin) {
          state.authAdmin = admin
        }
      }
      export const actions = {
        nuxtServerInit({ commit }, { req }) {
          if (req.session && req.session.authUser) {
            commit('SET_USER', req.session.authUser)
          }
      },
      async login({ commit }, { login, password }) {
        try {
          console.log(login)
          //const { data } = await axios.post('https://thesmartestdiet.herokuapp.com/api/login', { login, password })
          const { data } = await axios.post('http://127.0.0.1:3000/api/login', { login, password })
          commit('SET_ADMIN', data)
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
        commit('SET_ADMIN', null)
      }
    }
      
