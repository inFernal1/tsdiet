import state from './calc.state'
import mutations from './calc.mutations'
import actions from './calc.actions'
import getters from './calc.getters'

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
