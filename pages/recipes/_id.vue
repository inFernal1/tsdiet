<template>
  <v-container>
     <view-recipe class="tsd-container" :recipe="recipe"></view-recipe>
  </v-container>
</template>
<script>
import axios from 'axios'
import viewRecipe from '~/components/view_recipe'
export default {
  validate({ params }) {
    return String(params.id).length > 10
  },
   async asyncData({params}) {
       // let  recipesData = await axios.get(`https://thesmartestdiet.herokuapp.com/api/get-recipe/${params.id}`)
       let  recipesData = await axios.get(`http://127.0.0.1:3000/api/get-recipe/${params.id}`)
       return {
           recipe: recipesData.data
       }
  }, 
  data() {
      return {
          
      }
  },
  components: {
    viewRecipe
  }
}
</script>
