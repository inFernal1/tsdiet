<template>
    <v-layout class="container recipe-container" column>
        <v-flex xs12><h1 class="recipe-title calc-caption">{{recipe.title}}</h1></v-flex>
        <v-flex>
            <v-layout row>
                <v-flex class="ingredients">
                    <h3 class="ingredients-title">Ингредиенты</h3>
                    <v-layout column>
                        
                        <v-flex v-for="(ingredient,index) in recipe.ingredients" :key="ingredient.name + index" row d-flex  class="ingredient-item">
                            <v-layout class="ingredient-icons">
                                <v-icon small color="success">play_arrow</v-icon>
                            </v-layout>
                            <v-layout column class="ingredient-data">
                                <v-flex class="ingredient-block-one"><span class="ingredient-name">{{ingredient.name  + ' '}}</span>
                                 </v-flex>
                                <v-flex class="ingredient-block-two">
                                    <span>Б. 16 </span>
                                    <span>Ж. 18 </span>
                                    <span>У. 27 </span>
                                </v-flex>
                            </v-layout>
                            <v-layout column class="ingredient-portion">
                              <v-flex><span>{{ ingredient.portion + ' ' }}</span></v-flex>
                              <v-flex><span>грамм</span><span v-if="portionLastLetter(ingredient.portion)">а</span></v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex class="steps">
                     <v-layout column>
                        <v-flex v-for="(step,index) in recipe.steps" :key="step + index">
                            <v-layout>
                                <v-flex>
                                    <fieldset class="steps-fieldset">
                                        <legend>ШАГ {{index + 1}}</legend>
                                            <p>{{step}}</p>
                                    </fieldset>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex></v-flex>
        <v-flex></v-flex>
    </v-layout>
</template>
<script>
export default {
    props: ['recipe'],
    data() {
        return {

        }
    },
    methods: {
        portionLastLetter(val) {
            let valStr = String(val)
            let valLength = (String(val)).length - 1
            return Number(valStr[valLength]) > 1 && Number(valStr[valLength]) < 5
        }
    }
}
</script>
<style scoped>
.recipe-container {
   max-width:960px;
}
.recipe-title {
    text-align:center;
}
.ingredients {
    border: 2px solid #0ca600;
 border-right: 3px solid #009cff;
  border-left: 3px solid #009cff;
  margin-right: 20px;
  min-width:300px;
}
.ingredient-block-one {
  
    padding: 5px;
}
.ingredients-title {
    text-align: center;
    font-size: 1.3em;
    padding: 10px;
    border-bottom: 3px solid #0ca600;
}
.ingredient-block-two {
    
    padding: 5px;
    padding-top:0;
}
.ingredients span{
    font-size: 1.2em
}
.ingredient-name {
    font-weight: 500
}
.ingredient-item {
    border-bottom: 3px solid #0ca600;
}
.ingredient-data {
    flex-grow: 330;
}
.ingredient-portion{
    padding: 5px;
    text-align: center;
    width:70px;
    border-left:2px solid #009cff;
}
.ingredient-portion span{
    font-size: 1.2em;
}
.steps-fieldset {
    border-color: #0ca600;
    padding: 10px;
    border-width: 3px;
    font-size: 1.1em;
    
}
.steps-fieldset legend {
    font-size: 1.3em;
    margin-left: 50px;
}
</style>
