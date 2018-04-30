<template>
  <v-layout column class="add_container">
      <v-flex >
        <h2 class="calc-caption">Добавление рецепта</h2>
      </v-flex>
      <v-form v-model="valid" ref="form">
        <v-layout column>
      <v-flex class="add add_caption">
        
        <v-text-field 
        label ="Введите заголовок рецепта"
         v-model="addCaption"
          required 
          :counter="100"
          :rules="captionRules"> 
          
        </v-text-field>
       
      </v-flex>
      <v-flex class="add add_describe">
         <v-text-field 
        label ="Введите описание рецепта"
         v-model="addDescribe"
          required 
          :counter="255"
          :rules="describeRules"
          multi-line> 
          
        </v-text-field>
      </v-flex>
      <v-flex class="add add_image">
        <v-layout column  align-center>
         <!--<v-text-field prepend-icon="attach_file" single-line
                      v-model="addImage" label="Загрузите изображение" required
                      :disabled="false" ref="fileTextField"></v-text-field>
        <input type="file" :accept="true" :multiple="false" :disabled="true"
               ref="fileInput" > -->
               <v-flex d-flex class="view_image" ref="image">
                 <img :src="imageUrl"  height="150" width="150">
               </v-flex>
               <v-flex d-flex>
               <v-btn rased class="primary"
                @click="onPickFile"
                >Загрузить изображение</v-btn>
               <input
                type="file"
                ref="fileInput"
                style="display:none"
                 accept="image/*"
                 @change="onFilePicked"
                 
                 ></v-flex>
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
              <v-flex row d-flex align-center >
           <v-text-field v-model="ingredient.name" label="Название ингредиента" 
           class="mr-4"  :rules="requireRules" required></v-text-field>
           <v-text-field v-model="ingredient.portion" label="Количество" solo suffix="гр."  type="number" :min="0">

           </v-text-field>
           </v-flex>
           <v-flex row d-flex align-center>
           <v-text-field v-model="ingredient.proteins" label="белков" solo 
           suffix="гр."  type="number" class="mr-3" :min="0"  :rules="requireRules" required>

           </v-text-field>
           <v-text-field v-model="ingredient.fats" label="жиров" 
           solo suffix="гр."  type="number" class="mr-3" :min="0"  :rules="requireRules" required>

           </v-text-field>
           <v-text-field v-model="ingredient.carbs" label="углеводов"
            solo suffix="гр." type="number" :min="0" :rules="requireRules" required>

           </v-text-field>
           </v-flex>
           </v-layout>
           
              <v-btn fab dark color="red" @click="eventDeleteIngredient(index)"><v-icon>delete</v-icon> </v-btn>
           
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="add choose_count_steps"></v-flex>
      <v-flex class="add add_steps"></v-flex>
      <v-flex class="add add_tags"></v-flex>
      <v-flex class="add buttons"></v-flex>
      </v-layout>
       </v-form>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      valid: false,
      imageUrl:'',
      addCaption: '',
      addDescribe: '',
      addImage: null,
      addIngredients: [],
      countSteps: 0,
      addSteps: [],
      addTags: [],
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
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      if(event.target.files.length == 0) return
      const files = event.target.files;
      let fileName = files[0].name;
      if(fileName.lastIndexOf('.') <= 0) {
        return alert('Пожалуйста добавьте корректное изображение')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0]);
      this.addImage = files[0];
    },
    eventAddIngredient() {
      let objIngredients = {
        name: '',
        portion:'',
        proteints:'',
        fats:'',
        carb:''
      }
      this.addIngredients.push(objIngredients);
    },
    eventDeleteIngredient(i) {
      this.addIngredients.splice(i,1);
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
  border: 1px dotted #009cff;
  border-bottom: 0;
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
 
</style>

