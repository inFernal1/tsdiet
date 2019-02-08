<template>
  <v-layout column class="add_container" >
    <v-flex>
      <h2 class="calc-caption">Добавление рецепта</h2>
    </v-flex>
    <v-form v-model="valid" ref="form" >
      <v-layout column>
        <v-flex class="add add_caption">
          <v-text-field label="Введите заголовок рецепта" v-model="addCaption" required :counter="100" :rules="captionRules">
          </v-text-field>
        </v-flex>
        <v-flex class="add add_describe">
          <v-text-field label="Введите описание рецепта" v-model="addDescribe" required :counter="255" :rules="describeRules" multi-line>
          </v-text-field>
        </v-flex>
        <!--<v-flex class="add add_image">
          <v-layout column align-center>
            <v-flex d-flex class="view_image" ref="image">
              <img :src="imageUrl" height="150" width="150">
            </v-flex>
            <v-flex d-flex>
              <v-btn rased class="primary" @click="onPickFile">Загрузить изображение</v-btn>
              <input type="file" ref="fileInput" style="display:none" accept="image/*" @change="onFilePicked"></v-flex>
          </v-layout>
        </v-flex>
        -->
        <v-flex class="add choose-lvl">
          <v-layout row align-center>
            <v-flex xs5 >
              <span class="choose-lvl-text">Выберите уровень сложности рецепта:</span>
            </v-flex>
            <v-flex xs6 class="mt-2">
              <v-radio-group v-model="imageUrl" row>
                <v-radio label="1" color="primary" value="/img/recipes_lvl1.png"></v-radio>
                <v-radio label="2" color="primary" value="/img/recipes_lvl2.png"></v-radio>
                <v-radio label="3" color="primary" value="/img/recipes_lvl3.png"></v-radio>
                <v-radio label="4" color="primary" value="/img/recipes_lvl4.png"></v-radio>
                <v-radio label="5" color="primary" value="/img/recipes_lvl5.png"></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="add add_ingredients">
          <v-layout column align-center>
            <v-flex>
              <span class="headline">Добавить ингредиент</span>
              <v-btn fab dark color="primary" @click="eventAddIngredient">
                <v-icon dark small>add</v-icon>
              </v-btn>
            </v-flex>
            <v-flex v-for="(ingredient,index) in addIngredients" :key="index" 
            class="ingredient_item" d-flex row align-center>
              <v-layout column>
                <v-flex row d-flex align-center>
                  <v-text-field v-model="ingredient.name" label="Название ингредиента"
                   class="mr-4" :rules="requireRules" required :counter="21"></v-text-field>
                  <v-text-field v-model.number="ingredient.portion" label="Количество" 
                  solo suffix="гр." type="number" :min="0">
                  </v-text-field>
                </v-flex>
                <v-flex row d-flex align-center>
                  <v-text-field v-model.number="ingredient.protein" label="белков на 100гр." 
                  solo suffix="гр." type="number" class="mr-3" :min="0"  required>
                  </v-text-field>
                  <v-text-field v-model.number="ingredient.fat" label="жиров на 100гр." 
                  solo suffix="гр." type="number" class="mr-3" :min="0"
                    required>
                  </v-text-field>
                  <v-text-field v-model.number="ingredient.carb" label="углеводов на 100гр." 
                  solo suffix="гр." type="number" :min="0"   required>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-btn fab dark color="red" @click="eventDeleteIngredient(index)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="add add_steps">
          <v-layout row align-center justify-center>    
              <span class="headline">Добавить шаг</span>
              <v-btn fab dark color="success" @click="eventAddStep">
                <v-icon dark small>add</v-icon>
              </v-btn>
          </v-layout>
          <v-layout column>
            
            <v-flex v-for="(step,index) in addSteps" :key="index" class="step_item" >
              <v-layout align-center>
                <v-flex xs10>
                  <v-text-field :label="'Описание шага ' + (index + 1)"
                   v-model="addSteps[index]" required  
                  :rules="requireRules" multi-line>
                  </v-text-field>
                  </v-flex>
                  <v-flex xs2>
                  <v-btn fab dark color="red" @click="eventDeleteStep(index)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                  
                  </v-flex>
                  </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="add add_tags">
           <v-layout  justify-center row wrap > 
      <v-flex  v-for="(item,index) in getFilter" v-if="item.title !== 'Калорийность'" :key="index" class="filter-items" >
        <h3 class="filter-title-item">{{item.title}}</h3>
      <v-select  :items = "item.items" v-model="selectedTags[index]" ></v-select>
      </v-flex>
    </v-layout>
        </v-flex>
        <v-flex class="add buttons">
          <v-layout justify-center>
          <v-btn color="primary"  block @click="addRecipe" :disabled="!valid">Добавить рецепт</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-form>
  </v-layout>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
  export default {
    data() {
      return {
        valid: false,
        imageUrl: '/img/recipes_lvl1.png',
        addCaption: '',
        addDescribe: '',
        addImage: null,
        addIngredients: [],
        addSteps: [],
        selectedTags:[],
        captionRules: [
          v =>
          (v.length > 5 && v.length < 100) ||
          "Знаков не может быть меньше 5 и больше 100"
        ],
        describeRules: [
          v =>
          (v.length > 100 && v.length < 255) ||
          "Знаков не может быть меньше 100 и больше 255"
        ],
        /*ingredientNameRules: [
          v =>
          (v.length > 2 && v.length < 22) ||
          "Знаков не может быть меньше 2 и больше 21"
        ], */
        requireRules: [v => !!v || "Поле является обязательным"]
      };
    },
    computed: {
      ...mapGetters('Recipes',{
        getFilter: 'getFilter'
      })
    },
    methods: {
      /*onPickFile() {
        this.$refs.fileInput.click();
      },
      onFilePicked(event) {
        if (event.target.files.length == 0) return;
        const files = event.target.files;
        let fileName = files[0].name;
        if (fileName.lastIndexOf(".") <= 0) {
          return alert("Пожалуйста добавьте корректное изображение");
        }
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(files[0]);
        this.addImage = files[0];
      }, */
      eventAddIngredient() {
        this.addIngredients.push({});
      },
      eventDeleteIngredient(i) {
        this.addIngredients.splice(i, 1);
      },
      eventAddStep() {
        this.addSteps.push("");
      },
      eventDeleteStep(i) {
        this.addSteps.splice(i, 1);
      },
       async addRecipe() {
        let protein = 0;
          let fat = 0;
          let carb = 0;
          let cal = 0;
          let calHundred = 0;
          let proteinHundred = 0;
          let fatHundred = 0;
          let carbHundred = 0;
          let allGramms = 0
        let getAllCalFromIngridients = () => {
          this.addIngredients.forEach(elem => {
            if(elem.portion !== '' && elem.portion > 0 && elem.protein !== '' && elem.fat !== ''
             && elem.carb !== '') {
            protein += (+elem.protein * elem.portion / 100);
            fat += (+elem.fat * elem.portion / 100);
            carb += (+elem.carb * elem.portion / 100);
            allGramms += +elem.portion;
            }
          });
          cal = +((protein * 4) + (carb * 4) + (fat * 9)).toFixed(2);
          proteinHundred = +(protein * 100 / allGramms).toFixed(2) ;
          fatHundred = +(fat * 100 / allGramms).toFixed(2);
          carbHundred = +(carb * 100 / allGramms).toFixed(2);
          calHundred = +(cal * 100 / allGramms).toFixed(2);
        }
        let getTypeTagCal = () => {
        let tag = '';

          if(this.calhundred <= 150) {
            tag = 'Низкокалорийные'
          }
          else if(this.calhundred > 150 && this.calHundred < 300) {
            tag = 'Среднекалорийные'
          }
          else {
            tag = 'Высококалорийные'
          }
    
          this.getFilter.forEach((v,i) => {
            if(v.title === 'Калорийность') this.selectedTags[i] = tag;
          })
        }
           if (this.$refs.form.validate() && 
           ( this.addIngredients.length > 0 && this.addSteps.length > 0 && this.selectedTags.length === 4)) {
             getAllCalFromIngridients();
            getTypeTagCal()
           await axios.post('https://thesmartestdiet.herokuapp.com/api/administration/add', {
            title: this.addCaption,
            description: this.addDescribe,
            image: this.imageUrl,
            ingredients: this.addIngredients,
            steps:this.addSteps,
            calories: cal,
            protein: +protein.toFixed(2),
            fat: +fat.toFixed(2),
            carb: + carb.toFixed(2),
            proteinHundred,
            fatHundred,
            carbHundred,
            calHundred,
            tags: this.selectedTags
          }).then(function (response) {
            if(response.status === 200) {
              console.log('Рецепт успешно добавлен')
    $nuxt._router.push('/')
            }
  }).catch(function (error) {
    console.log(error);
  });
        }
        else {
          alert('Заполните все блоки информацией')
        }
      },
      closeAdding() {
        this.$refs.form.reset();
      }
    }
  };
</script>
<style scoped>
  .add_container {
    border: 3px solid #009cff;
    padding: 20px;
    margin-bottom: 20px;
    width: 960px;
  }
  .add {
    margin-bottom: 20px;
    border: 2px solid #0ca600;
    padding: 20px;
  }
  .view_image {
    margin-bottom: 10px;
    border: 5px solid #0ca600;
  }
  .ingredient_item {
    padding-bottom: 20px;
    border-bottom: 4px solid #0ca600;
  }
  .filter-items {
  margin: 0 20px;
  max-width: 320px;
  min-width:280px;
}
.filter-title-item {
  text-align: center;
}
.buttons {
  border:0;
  padding-bottom: 0;
}
.choose-lvl-text {
  font-size: 1.3em
}
</style>

