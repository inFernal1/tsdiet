<template>
  <v-container>
     <v-layout>
        <h1>{{recipe.title}}</h1>
     </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  validate({ params }) {
    return String(params.id).length > 10
  },
   async asyncData({params}) {
       let  recipesData = await axios.get(`http://localhost:3000/api/get-recipe/${params.id}`)
       return {
           recipe: recipesData.data
       }
  }, 
  data() {
      return {
          
      }
  }
}
</script>
