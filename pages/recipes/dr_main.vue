<template>
  <v-container class="container-recipes">
   <v-layout column>
    <v-flex>
      <v-layout row class="recipe-add-link">
        <v-flex d-flex>
          <v-btn block flat color="success" nuxt to="../administration/add" >
            <v-icon color="success" x-large>add</v-icon>
            <span class="add-recipe-link-text">Добавить новый рецепт</span>
            </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex>
    <v-layout  justify-center row wrap v-if="filterToggle"> 
      <v-flex  v-for="(item,index) in getFilter" :key="index" class="filter-items" >
        <h3 class="filter-title-item">{{item.title}}</h3>
      <v-select multiple :items = "item.items" v-model="selectedFilter" chips deletable-chips></v-select>
      </v-flex>
       <v-flex xs12>
         <v-btn class="primary" block>ПРИМЕНИТЬ</v-btn>
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
        <v-layout class="recipes-items">
          <v-flex class="recipe-item">
                 <v-layout row wrap justify-center>
                   <v-flex xs11>
                       <h2 class="recipe-items-title">Протеиновые батончики к празднику</h2>
                   </v-flex>
                   <v-flex class="recipe-image" xs7 lg2 sm4 xl2 md3>
                     <img src="~/assets/img/recipes_lvl1.png" alt="Нет фото">
                   </v-flex>
                   <v-flex xs11 lg7 sm8 xl7 md7 >
                     <div class="recipe-cal">
                     <div>Пищевая ценность на 100 грамм:</div>
                     <div>ккал: <b>145</b>, белков: <b>12.43</b>, жиров: <b>14.52</b>, углеводов: <b>45.52</b></div>
                     </div>
                     <p class="recipe-description">
                       Этот рецепт не оставит равнодушным никого. Он ояень подходит как для похудения, так и для набора массы. Если кто хочет его опробовать, то пожалуйста. Можете перейти на следующую страницу и сами всё посмотреть.
Этот рецепт очень крут, отвечаю. 
                     </p>
                   </v-flex>
                   <v-flex xs12 >
                     <v-btn color="primary" block>Перейти к рецепту</v-btn>
                   </v-flex>
                 </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  layout: "default",
  data() {
    return {
      filterToggle: false,
      selectedFilter: []
    };
  },
  computed: {
    ...mapGetters("Recipes", {
      getFilter: "getFilter"
    })
  },
  methods: {
    resetFilter() {
      this.selectedFilter.splice(0);
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
  margin: 20px 0;
}
.recipe-item {
  border: 3px solid #0ca600;
    border-left: 3px solid #009cff;
     border-right: 3px solid #009cff;
  padding: 15px;
  padding-right: 10px;
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
</style>

