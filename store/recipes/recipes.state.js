const state = {
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
        items: ['Да','Нет']
      }],
      recipeID: 0
      
}
export default state;