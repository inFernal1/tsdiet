<template>
  <v-layout class="recipe-container mx-auto" column>
    <v-flex xs12>
      <h1 class="recipe-title calc-caption">
        {{ recipe.title }}
      </h1>
    </v-flex>
    <v-flex>
      <v-layout row wrap>
        <v-flex fill-height xs12 lg4 md4 sm6>
          <figure class="recipe-img-container">
            <img :src="recipe.image" alt="Рецепт">
          </figure>
          <v-layout column class="ingredients">
            <h3 class="ingredients-title">
              Ингредиенты
            </h3>
            <v-flex
              v-for="(ingredient, index) in recipe.ingredients"
              :key="ingredient.name + index"
              row
              d-flex
              class="ingredient-item"
            >
              <v-layout class="ingredient-icons">
                <v-icon small color="success">
                  play_arrow
                </v-icon>
              </v-layout>
              <v-layout column class="ingredient-data">
                <v-flex class="ingredient-block-one">
                  <span class="ingredient-name">{{
                    ingredient.name + " "
                  }}</span>
                </v-flex>
                <v-flex class="ingredient-block-two">
                  <span>Б: {{ ingredient.protein }}г.|</span>
                  <span> Ж: {{ ingredient.fat }}г.|</span>
                  <span> У: {{ ingredient.carb }}г.</span>
                </v-flex>
              </v-layout>
              <v-layout column class="ingredient-portion">
                <v-flex>
                  <span>{{ ingredient.portion + " " }}</span>
                </v-flex>
                <v-flex>
                  <span>грамм</span><span v-if="portionLastLetter(ingredient.portion)">а</span>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="steps" xs12 lg8 md8 sm6>
          <v-layout column>
            <v-flex v-for="(step, index) in recipe.steps" :key="step + index">
              <v-layout>
                <v-flex>
                  <fieldset class="steps-fieldset">
                    <legend>ШАГ {{ index + 1 }}</legend>
                    <p>{{ step }}</p>
                  </fieldset>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex>
      <h2 class="pfc-captions mt-4">
        Энергетическая ценность рецепта
      </h2>
      <v-layout column class="container-items pt-4">
        <v-flex>
          <v-layout column>
            <v-radio-group v-model="userGramms" column>
              <v-layout row wrap>
                <v-flex xs11 lg3 md3 sm4>
                  <v-radio class="pfc-radio" color="success" :value="100">
                    <div slot="label" class="radio_lbl">
                      100 грамм
                    </div>
                  </v-radio>
                </v-flex>
                <v-flex xs11 lg5 md5 sm6>
                  <v-radio class="pfc-radio" color="success" :value="allGramms">
                    <div slot="label" class="radio_lbl">
                      Весь рецепт
                    </div>
                  </v-radio>
                </v-flex>
              </v-layout>
            </v-radio-group>
            <v-layout class="pfc-radio" row wrap>
              <!-- <v-radio color="success"  :value="1"><div slot="label" class="radio_lbl">Ваше значение:</div></v-radio>-->
              <v-flex xs12 lg12>
                <h2 class="mr-3 caption-user-gramms">
                  Ваше значение:
                </h2>
              </v-flex>
              <v-flex lg9 md10 sm10 xs12>
                <v-slider
                  v-model="userGramms"
                  :min="1"
                  :max="allGramms"
                  class="mt-2 mr-3"
                  thumb-label
                  hint="Установите количество грамм на одну порцию и вам автоматически рассчитается энергетическая ценность порции"
                />
              </v-flex>
              <v-flex lg2 md2 sm2 xs12>
                <v-text-field v-model="userGramms" type="number" solo />
              </v-flex>
            </v-layout>
          </v-layout>
        </v-flex>
        <v-flex>
          <v-layout row wrap>
            <v-flex class="tsd-chart" xs11 lg5 md5 sm5>
              <chart-pfc :chart-data="fillData" />
            </v-flex>
            <v-flex class="pfc-text" xs11 lg6 md6 sm6>
              <div class="pfc-items pfc-carbs">
                Грамм: <b>{{ userGramms }}</b>
              </div>
              <div class="pfc-items pfc-calories">
                Калории: <b>{{ userCal }}</b>
              </div>
              <div class="pfc-items pfc-proteins">
                Белки: <b>{{ userProteins }} г.</b>
              </div>
              <div class="pfc-items pfc-fats">
                Жиры: <b>{{ userFats }} г.</b>
              </div>
              <div class="pfc-items pfc-carbs">
                Углеводы: <b>{{ userCarbs }} г.</b>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex />
      </v-layout>
    </v-flex>
    <v-flex v-if="$store.state.authAdmin">
      <v-btn block color="red" dark @click="deleleAccess = true">
        Удалить рецепт
      </v-btn>
    </v-flex>
    <v-dialog v-model="deleleAccess" max-width="290">
      <v-card>
        <v-card-title class="headline">
          Вы действительно хотите удалить рецепт?
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red darken-1" flat="flat" @click.native="deleteRecipe">
            Да
          </v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click.native="deleleAccess = false"
          >
            Нет
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import ChartPfc from "~/plugins/ChartPfc.js"
import axios from "axios"
export default {
  components: {
    ChartPfc
  },
  props: ["recipe"],
  data() {
    return {
      deleleAccess: false,
      userGramms: 100,
      allGramms: 0,
      userProteins: 0,
      userFats: 0,
      userCarbs: 0,
      userCal: 0
    }
  },
  computed: {
    fillData() {
      return {
        labels: ["% белков", "% жиров", "% углеводов"],
        datasets: [
          {
            label: ["% белков", "% жиров", "% углеводов"],
            backgroundColor: ["#009cff", "orange", "#0ca600"],
            data: [this.userProteins, this.userFats, this.userCarbs]
          }
        ]
      }
    }
  },
  watch: {
    userGramms(value) {
      this.userProteins = this.recipe.proteinHundred
      this.userFats = this.recipe.fatHundred
      this.userCarbs = this.recipe.carbHundred
      this.userCal = this.recipe.calHundred
      this.userProteins = ((this.userProteins / 100) * value).toFixed(2)
      this.userCarbs = ((this.userCarbs / 100) * value).toFixed(2)
      this.userFats = ((this.userFats / 100) * value).toFixed(2)
      this.userCal = ((this.userCal / 100) * value).toFixed(2)
    }
  },
  mounted() {
    let allGramms = 0
    this.recipe.ingredients.forEach(elem => {
      if (
        elem.portion !== "" &&
        elem.portion > 0 &&
        elem.protein !== "" &&
        elem.fat !== "" &&
        elem.carb !== ""
      ) {
        allGramms += elem.portion
      }
    })
    this.allGramms = allGramms
    this.userGramms = 100
    this.userProteins = this.recipe.proteinHundred
    this.userFats = this.recipe.fatHundred
    this.userCarbs = this.recipe.carbHundred
    this.userCal = this.recipe.calHundred
  },
  methods: {
    portionLastLetter(val) {
      let valStr = String(val)
      let valLength = String(val).length - 1
      return Number(valStr[valLength]) > 1 && Number(valStr[valLength]) < 5
    },
    async deleteRecipe() {
      this.deleleAccess = false
      //await axios.delete('https://thesmartestdiet.herokuapp.com/api/administration/delete-recipe/' + this.recipe._id)
      await axios
        .delete(
          window.location.toString() +
            "api/administration/delete-recipe/" +
            this.recipe._id
        )
        .then(response => {
          if (response.status === 200) {
            console.log("Рецепт успешно удален")
            $nuxt._router.push("/")
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
<style scoped>
.recipe-container {
  max-width: 960px;
}
.recipe-title {
  text-align: center;
}
.ingredients {
  border: 2px solid #0ca600;
  border-right: 3px solid #009cff;
  border-left: 3px solid #009cff;
  margin-right: 40px;
  min-width: 275px;
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
  padding-top: 0;
}
.ingredients span {
  font-size: 1.2em;
}
.ingredient-name {
  font-weight: 500;
}
.ingredient-item {
  border-bottom: 3px solid #0ca600;
}
.ingredient-item:last-child {
  border-bottom: 1px solid #0ca600;
}
.ingredient-data {
  min-width: 185px;
}
.ingredient-portion {
  padding: 5px;
  text-align: center;
  min-width: 71px;
  border-left: 2px solid #009cff;
}
.ingredient-portion span {
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
.recipe-img-container {
  margin-bottom: 30px;
}
.container-items {
  margin-bottom: 30px;
  border-left: 4px solid #009cff;
  border-right: 4px solid #009cff;
  border-bottom: 2px solid #0ca600;
  border-top: 2px solid #0ca600;
}
.pfc-captions {
  font-size: calc((100vw - 480px) / (1280 - 480) * (22 - 14) + 18px);
  text-align: center;
  font-weight: 300;
  padding: 5px;
  border-left: 4px solid #009cff;
  border-right: 4px solid #009cff;
  border-top: 2px solid #0ca600;
}
.tsd-chart {
  width: 100%;
  height: 100%;
  margin: 0px 20px 40px 20px;
}
.pfc-text {
  font-size: 1.3em;
  margin: auto auto;
  text-align: center;
}
.pfc-items {
  border: 2px solid #0ca600;
  padding: 15px;
  margin-bottom: 30px;
}
.pfc-proteins {
  border-color: #009cff;
  border-top: 2px solid #009cff;
}
.pfc-proteins b {
  color: #009cff;
}
.pfc-fats {
  border-color: orange;
}
.pfc-calories {
  border-color: rgb(0, 95, 24);
}
.pfc-calories b {
  color: rgb(0, 95, 24);
}
.pfc-fats b {
  color: orange;
}
.pfc-carbs b {
  color: #0ca600;
}

.pfc-myself {
  margin: auto auto;
}
.pfc-radio {
  padding: 15px;
  margin: 10px 40px;
}
.radio_lbl {
  font-size: 1.4em;
  color: #353535;
  margin-left: 20px;
}
.caption-user-gramms {
  font-weight: 400;
  color: #353535;
}
@media (max-width: 960px) {
  .recipe-img-container {
    text-align: center;
  }
}
@media (max-width: 600px) {
  .caption-user-gramms {
    font-size: 1.3em;
  }
  .pfc-radio {
    margin: 0 10px;
    padding: 5px;
  }
}
</style>
