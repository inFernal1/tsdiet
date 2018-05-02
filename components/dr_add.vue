<template>
  <v-layout column class="add_container">
    <v-flex>
      <h2 class="calc-caption">Добавление рецепта</h2>
    </v-flex>
    <v-form v-model="valid" ref="form">
      <v-layout column>
        <v-flex class="add add_caption">
          <v-text-field label="Введите заголовок рецепта" v-model="addCaption" required :counter="100" :rules="captionRules">
          </v-text-field>
        </v-flex>
        <v-flex class="add add_describe">
          <v-text-field label="Введите описание рецепта" v-model="addDescribe" required :counter="255" :rules="describeRules" multi-line>
          </v-text-field>
        </v-flex>
        <v-flex class="add add_image">
          <v-layout column align-center>
            <!--<v-text-field prepend-icon="attach_file" single-line
    
                          v-model="addImage" label="Загрузите изображение" required
    
                          :disabled="false" ref="fileTextField"></v-text-field>
    
            <input type="file" :accept="true" :multiple="false" :disabled="true"
    
                   ref="fileInput" > -->
            <v-flex d-flex class="view_image" ref="image">
              <img :src="imageUrl" height="150" width="150">
            </v-flex>
            <v-flex d-flex>
              <v-btn rased class="primary" @click="onPickFile">Загрузить изображение</v-btn>
              <input type="file" ref="fileInput" style="display:none" accept="image/*" @change="onFilePicked"></v-flex>
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
                   class="mr-4" :rules="requireRules" required></v-text-field>
                  <v-text-field v-model="ingredient.portion" label="Количество" 
                  solo suffix="гр." type="number" :min="0">
                  </v-text-field>
                </v-flex>
                <v-flex row d-flex align-center>
                  <v-text-field v-model="ingredient.protein" label="белков" 
                  solo suffix="гр." type="number" class="mr-3" :min="0"  required>
                  </v-text-field>
                  <v-text-field v-model="ingredient.fat" label="жиров" 
                  solo suffix="гр." type="number" class="mr-3" :min="0"
                    required>
                  </v-text-field>
                  <v-text-field v-model="ingredient.carb" label="углеводов" 
                  solo suffix="гр." type="number" :min="0"  required>
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
                   v-model="addSteps[index]" required :counter="255" 
                  :rules="describeRules" multi-line>
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
      <v-flex  v-for="(item,index) in getFilter" :key="index" class="filter-items" >
        <h3 class="filter-title-item">{{item.title}}</h3>
      <v-select multiple :items = "item.items" v-model="selectedFilter[index]" chips deletable-chips></v-select>
      </v-flex>
    </v-layout>
        </v-flex>
        <v-flex class="add buttons">
          <v-layout justify-center>
          <v-btn color="primary"  style="width:40%" @click="addRecipe">Добавить рецепт</v-btn>
          <v-btn color="red" dark style="width:40%">Закрыть без сохранения данных</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-form>
  </v-layout>
</template>
<script>
import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        valid: false,
        imageUrl: "",
        addCaption: "",
        addDescribe: "",
        addImage: null,
        addIngredients: [],
        addSteps: [],
        addTags: [],
        selectedFilter:[],
        captionRules: [
          v =>
          (v.length > 10 && v.length < 100) ||
          "Знаков не может быть меньше 10 и больше 100"
        ],
        describeRules: [
          v =>
          (v.length > 100 && v.length < 255) ||
          "Знаков не может быть меньше 100 и больше 255"
        ],
        requireRules: [v => !!v || "Поле является обязательным"]
      };
    },
    computed: {
      ...mapGetters('Recipes',{
        getFilter: 'getFilter'
      })
    },
    methods: {
      onPickFile() {
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
      },
      eventAddIngredient() {
        let objIngredients = {
          name: "",
          portion: 0,
          protein: 0,
          fat: 0,
          carb: 0
        };
        this.addIngredients.push(objIngredients);
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
      addRecipe() {
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
          //let protein = this.addIngredients.reduce((a,b) =>  a.protein + b.protein);
          //console.log(protein)
          
          this.addIngredients.forEach(elem => {
            protein += +elem.protein;
            fat += +elem.fat;
            carb += +elem.carb;
            allGramms += +elem.portion;
    
          });
          cal = (protein * 4) + (carb * 4)+ (fat * 9);
          
        }
        getAllCalFromIngridients();
      }
    }
  };
</script>
<style scoped>
  .add_container {
    border: 3px solid #009cff;
    padding: 20px;
    margin-bottom: 20px;
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
</style>

