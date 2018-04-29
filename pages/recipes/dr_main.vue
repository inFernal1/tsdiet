<template>
  <v-container class="container-recipes">
    <v-layout column>
      <v-flex v-if="addActivated">
          <dr-add></dr-add>
        </v-flex>
    <v-flex v-if="!addActivated">
      <v-layout row class="recipe-add-link">
        <v-flex d-flex>
          <v-btn block flat color="success" @click="addActivated = true">
            <v-icon color="success" x-large>add</v-icon>
            <span class="add-recipe-link-text">Добавить новый рецепт</span>
            </v-btn>
        </v-flex>
        
      </v-layout>
    </v-flex>
    
    <v-flex>
    <v-layout  justify-center row wrap v-if="filterToggle"> 
      <v-flex  v-for="(item,index) in filter" :key="index" class="filter-items" >
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
          <span v-if="!filterToggle">Показать фильтр</span>
           <span v-if="filterToggle">Скрыть фильтр</span>
        <v-icon>filter_list</v-icon>
        </v-btn>
      </v-flex>
      </v-layout>
  </v-container>
</template>
<script>
import drAdd from '~/components/dr_add';
export default {
  
  layout: 'default',
  data() {
    return {
      addActivated: false,
      filterToggle: false,
      filter: [{
        title: 'Тип блюда',
        items: ['Салаты', 'Выпечка', 'Перекусы', 'Вторые блюда','Супы']
      },
      {
        title: 'Время приготовления',
        items: ['Медленно (более 40 мин.)', 'Средне (20-40 мин.)', 'Быстро (10 - 20 мин.)', 'Очень быстро (менее 10 мин.)']
      },
      {
        title: 'Калорийность',
        items: ['Низкокалорийные','Среднекалорийные','Высококалорийные']
      },
      {
        title: 'Вегетарианские рецепты?',
        items: ['Нет', 'Да']
      }],
      selectedFilter:[]
    }
  },
  methods: {
    resetFilter() {
      this.selectedFilter.splice(0)
    }
  },
  components: {
    drAdd
  }
}
</script>
<style scoped>
.container-recipes {
  max-width: 960px;
}
.filter-items {
  margin: 0 20px;
  max-width: 320px;
  min-width:280px;
}
.filter-title-item {
  text-align: center;
}
.recipe-add-link {
 border: 2px dashed green;
 padding: 10px;
 margin-bottom:30px;
};
.add-recipe-link-text {
  display: inline-block;
  padding-left: 10px;
}
</style>

