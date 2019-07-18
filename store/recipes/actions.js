export default {
    async fetchRecipe({}, recipeId) {
        try {
            const recipesData = await this.$axios.$get(
                `http://127.0.0.1:3000/api/get-recipe/${recipeId}`
              )
              return recipesData
        }
        catch(e) {
            throw e;
        }
    },
    async fetchRecipes({commit},obj) {
        try {
            let elems = obj.elems
            const recipes = await this.$axios.$get('http://127.0.0.1:3000/api/get-recipes', {
                params:{
                  elems
                }
              })
              commit('setRecipes', recipes)
        }
        catch(e) {
            throw(e)
        }
    },
    async fetchFilterRecipes({commit},obj) {
        try {
            let elems = obj.elems
            let sendFilter = obj.sendFilter
        const filterRecipes = await this.$axios.$post('http://127.0.0.1:3000/api/filter-recipes', {
         elems,
          tags: sendFilter
      })
      console.log(filterRecipes)
      commit('setRecipes', filterRecipes)
    }
    catch(e) {
        throw e
    }
}

}