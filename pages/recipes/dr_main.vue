<template>
  <v-container class="container-recipes">
    <v-layout column>
    
    <v-flex>
    <v-layout justify-space-between row wrap v-if="filterToggle"> 
      <v-flex  v-for="(item,index) in filter" :key="index" class="filter-items" >
        <h3 class="filter-title-item">{{item.title}}</h3>
      <v-select multiple :items = "item.items" v-model="selectedFilter" chips deletable-chips></v-select>
      </v-flex>
       <v-flex xs12>
         <v-btn class="primary" block>ПРИМЕНИТЬ</v-btn>
       </v-flex>
    </v-layout>
       </v-flex>
         <v-flex d-flex justify-center>
        <v-btn @click="filterToggle = !filterToggle">
          <span v-if="!filterToggle">Открыть фильтр</span>
           <span v-if="filterToggle">Закрыть фильтр</span>
        <v-icon>filter_list</v-icon>
        </v-btn>
      </v-flex>
      </v-layout>
  </v-container>
</template>
<script>
export default {
  layout: 'default',
  data() {
    return {
      filterToggle: false,
      filter: [{
        title: 'Тип блюда',
        items: ['Салаты', 'Выпечка', 'Перекусы', 'Вторые блюда','Супы']
      },
      {
        title: 'Время приготовления',
        items: ['Медленно (более 40 мин.)', 'Средне (20-40 мин.)', 'Быстро (менее 20 мин.)']
      },
      {
        title: 'Калорийность',
        items: ['Низкокалорийные','Среднекалорийные','Высококалорийные']
      }],
      selectedFilter:[]
    }
  },
}
</script>
<style scoped>
.container-recipes {
  max-width: 960px;
}
.filter-items {
  margin: 0 20px;
  max-width: 260px;
}
.filter-title-item {
  text-align: center;
}
</style>

