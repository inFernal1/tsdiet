import Vuex from 'vuex'
import calc from './calc/calc.module.js'
import recipes from './recipes/recipes.module.js'
import Vue from 'vue'
Vue.use(Vuex)
const store = () => {
    return new Vuex.Store({
      modules: {
        Calc: calc,
        Recipes: recipes
      }

})
}
export default store;