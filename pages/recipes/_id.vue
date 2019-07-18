<template>
  <v-container>
    <view-recipe class="tsd-container" :recipe="recipe" />
  </v-container>
</template>
<script>
import viewRecipe from "~/components/view_recipe"
export default {
  validate({ params }) {
    return String(params.id).length > 10
  },
  components: {
    viewRecipe
  },
  data() {
    return {}
  },
  async asyncData({params, store}) {
    try {
        const recipe = await store.dispatch('recipes/fetchRecipe', params.id)
        return {recipe}
    }
    catch(e) {
      throw e
    }
  }
}
</script>
