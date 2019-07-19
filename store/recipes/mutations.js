export default {
  SET_RECIPE_ID (state, payLoad) {
    state.recipeID = payLoad
  },
  setRecipes(state, payLoad) {
    state.recipes = state.recipes.concat(payLoad)
  },
  resetRecipes(state, payLoad) {
    state.recipes.splice(0)
  },
  setCntRecipes(state,payLoad) {
    state.cntRecipes = payLoad
  }
}
