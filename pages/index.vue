<template>
  <v-container class="container-recipes" v-scroll="onScroll" >
   <v-layout column ref="wrapper">
    <v-flex v-if="$store.state.authAdmin">
      <v-layout row class="recipe-add-link">
        <v-flex d-flex>
          <v-btn block flat color="success" nuxt to="/administration/add" >
            <v-icon color="success" x-large>add</v-icon>
            <span class="add-recipe-link-text">Добавить новый рецепт</span>
            </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex>
    <v-layout  justify-center row wrap v-if="filterToggle"> 
      <v-flex  v-for="(item,index) in getFilter" :key="item.title" class="filter-items" >
        <h3 class="filter-title-item">{{item.title}}</h3>
      <v-select multiple :items = "item.items" v-model="selectedFilter[index]" chips deletable-chips></v-select>
      </v-flex>
       <v-flex xs12>
         <v-btn class="primary" block @click="startFilter">ПРИМЕНИТЬ</v-btn>
       </v-flex>
       <v-flex xs12>
         <v-btn  block @click="resetFilter">СБРОСИТЬ ФИЛЬТР</v-btn>
       </v-flex>
    </v-layout>
       </v-flex>
         <v-flex d-flex justify-center>
        <v-btn @click="filterToggle = !filterToggle" block>
          <span v-if="!filterToggle">Показать фильтр </span>
           <span v-if="filterToggle">Скрыть фильтр</span>
        <v-icon>filter_list</v-icon>
        </v-btn>
      </v-flex>
      <v-flex>
        <v-layout class="recipes-items" column ref="recipeItems">
          <v-flex class="recipe-item" v-for="(recipe,index) in recipes" :key="recipe.title + index">
                 <v-layout row wrap justify-center>
                   <v-flex xs11 >
                       <h2 class="recipe-items-title">{{recipe.title}}</h2>
                   </v-flex>
                   <v-flex class="recipe-image" xs7 lg2 sm4 xl2 md3>
                     <img :src="recipe.image" alt="Нет фото">
                   </v-flex>
                   <v-flex xs11 lg7 sm8 xl7 md7 >
                     <div class="recipe-cal">
                     <div>Пищевая ценность на 100 грамм:</div>
                     <div>ккал: <b>{{recipe.calHundred}}</b>, белков: <b>{{recipe.proteinHundred}}</b>,
                     жиров: <b>{{recipe.fatHundred}}</b>, углеводов: <b>{{recipe.carbHundred}}</b></div>
                     </div>
                     <p class="recipe-description">
                       {{recipe.description}}
                     </p>
                   </v-flex>
                   <v-flex>
                     <span class="tags-caption">Характеристика рецептов:</span>
                     <v-chip v-for="(tag,index) in recipe.tags" :key="recipe.tags + index * 10">
                       <span v-if="index === 3" class="mr-1">Вегетарианские: </span> {{tag}}</v-chip>
                   </v-flex>
                   <v-flex xs12 >
                     <v-btn color="primary" block nuxt :to="{path:'/recipes/' + recipe._id}">Перейти к рецепту</v-btn>
                   </v-flex>
                 </v-layout>
                   <v-layout class="recipe-icons" v-if="index !== (recipes.length - 1)">
            <v-icon color="success">receipt</v-icon>
            <v-icon color="yellow">receipt</v-icon>
            <v-icon color="primary">receipt</v-icon>
          </v-layout>
          </v-flex>
          <v-flex class="recipes-loading">
            <v-layout justify-center align-center>
        <v-progress-circular indeterminate color="green" v-if="getRecipesController === false"></v-progress-circular>
            </v-layout>
        </v-flex>
        </v-layout>
      </v-flex>
      </v-layout>
      
  </v-container>
</template>
<script>
import axios from 'axios'
import { mapGetters } from "vuex";
export default {
  layout: "default",
  async created() {
    let createdWatcher = true;
    await this.getRecipes(createdWatcher);
  }, 
  async mounted() {
let {data} = await axios.get('https://thesmartestdiet.herokuapp.com/api/get-count-recipes');
    this.countDB = data;
  },
  data() {
    return {
      filterToggle: false,
      selectedFilter: [[],[],[],[]],
      recipes: [],
      btnFilterActivate:false,
      getRecipesController: true,
      countDB: 0
    }
  },
  computed: {
    ...mapGetters("Recipes", {
      getFilter: "getFilter"
    })
  },
  methods: {
    resetFilter() {
      for(let i = 0; i < this.selectedFilter.length; i++) {
      this.selectedFilter[i].splice(0);
      }
    },
    async getRecipes(createdWatcher) {
      let elems;
        if(createdWatcher) {
           elems = 0
          }
        else {
           elems = this.recipes.length % 5 === 0 ? this.recipes.length : this.recipes.length + 5;
            
        }
        this.getRecipesController = false;
      await axios.get('https://thesmartestdiet.herokuapp.com/api/get-recipes', {
        //proxy: { host: '127.0.0.1', port: 3000 },
        params:{
          elems
        }
      })
    .then(response => {
      if(response.status === 200) {
        this.recipes = this.recipes.concat(response.data);
        this.getRecipesController = true;
      }
    })
    .catch(error => console.log(error))
    },
    async filterRecipes(startedFilter) {
      let elems;
      if(startedFilter) {
           elems = 0
          }
        else {
           elems = this.recipes.length % 5 === 0 ? this.recipes.length : this.recipes.length + 5;
        }
        let sendFilter = this.selectedFilter.map((item,i) => {
          if(this.selectedFilter[i].length === 0) {
            return this.getFilter[i].items
          }
          return item
        })
        this.getRecipesController = false;
        await axios.post('https://thesmartestdiet.herokuapp.com/api/filter-recipes', {
         elems,
          tags: sendFilter
      })
    .then(response => {
      if(response.status === 200) {
       this.getRecipesController = true;
        this.recipes = this.recipes.concat(response.data);
      }
    })
    .catch(error => console.log(error))
    },
    startFilter() {
      this.btnFilterActivate = true;
    this.recipes.splice(0);
    this.filterToggle = false;
    this.filterRecipes(true)
    },
    onScroll(event) {
       if(this.recipes.length === this.countDB) return;
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      if( bottomOfPage && pageHeight > visible) {
        
        if(!this.btnFilterActivate) {
         
          if(this.getRecipesController === true) {
        this.getRecipes()
          }
        }
        else {
          if(this.getRecipesController === true) {
          this.filterRecipes()
          }
        }
      }
    }
  }
};
</script>
<style scoped>
.container-recipes {
  max-width: 960px;
}
.filter-items {
  margin: 0 20px;
  max-width: 320px;
  min-width: 280px;
}
.filter-title-item {
  text-align: center;
}
.recipe-add-link {
  border: 2px dashed #0ca600;

  padding: 10px;
  margin-bottom: 30px;
}
.add-recipe-link-text {
  display: inline-block;
  padding-left: 10px;
}
.recipes-items {
  margin-top: 20px;
  min-width: 320px;
}
.recipe-item {
  border: 3px solid #0ca600;
    border-left: 3px solid #009cff;
     border-right: 3px solid #009cff;
  padding: 15px;
  padding-right: 10px;
  margin-bottom: 50px;
}
.recipe-item:nth-last-child(1) {
  margin-bottom: 0;
}
.recipe-image {
  min-width: 300px;
  min-height:180px;
}
.recipe-items-title {
  border: 2px solid #0ca600;
 border-right: 3px solid #009cff;
  border-left: 3px solid #009cff;
 margin-bottom: 10px;
 color: #3a3a3a;
 text-transform: uppercase;
 font-weight: 400;
 text-align: center;
 padding: 5px;
}
.recipe-description {
  text-align: justify;
  font-size:16px
}
.recipe-cal {
  font-size: 15px;
  border-bottom: 2px solid #0ca600;
  text-align: center;
  font-weight: 500;
  margin-bottom: 5px;
  padding-bottom: 5px;
}
.recipes {
  margin-bottom: 20px;
}
.recipe-icons {
  position: absolute;
  width:70px;
  margin-left: -35px;
  left: 50%;
  margin-top: 30px;
}
.tags-caption {
  display: inline-block;
  padding: 0 5px;
  font-weight: 500;
  font-size: 1.1em;
}
.recipes-loading {
  margin-top: -30px;
}
@media (max-width:600px) {
    .container-recipes{
        padding: 0;
    }
    .recipe-item{
      border-left: 0;
      border-right: 0;
    }
}
</style>

