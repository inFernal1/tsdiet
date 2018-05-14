<template>
  <v-container>
     <v-layout>
        <h1>{{recipes}}</h1>
     </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  validate({ params }) {
    return !isNaN(+params.id)
  },
   async asyncData({params}) {
       let  recipesData = await axios.get(`http://localhost:3000/api/get-recipe`, {
           id: params.id
       })
       return {
           recipes: 4
       }
  }, 
  data() {
      return {
          
      }
  }
}
</script>
