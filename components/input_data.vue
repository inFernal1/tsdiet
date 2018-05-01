<template>
<div>
        <v-card color="grey lighten-5" class="mb-5">
            <v-container fluid>
                    <h3 class="calc-caption">Ввод ваших данных:</h3>
                    <v-form lazy-validation v-model="validateForm" ref="form">
                <v-layout column>
                    <v-flex>
                        <v-text-field label="Ваш вес в кг" 
                        type="number"
                        v-model="userWeight" suffix="кг"
                        tabindex="0" hint="Примеры заполнения: 70 | 83,5 | 100.5 | 67,320"
                        required
                         :rules="[rules.required,rules.rangeWeight]"
                         >
                        </v-text-field>
                    </v-flex>
                        <v-flex>
                        <v-text-field label="Ваш рост в см" v-model="userTall" 
                        suffix="см" tabindex="1"
                        hint="Примеры заполнения: 160,5 | 178 | 200.7"
                        type="number"
                        required
                          :rules="[rules.required,rules.rangeTall]"
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex>
                        <v-radio-group row label="Ваш пол:" v-model="gender">
                            <v-flex xs5 md2 sm2 lg1 xl1>
                            <v-radio label="M" color="primary" value="M"></v-radio>
                            </v-flex>
                            <v-flex xs5 md2 sm2 lg1 xl1>
                            <v-radio label="Ж" color="primary" value="F"></v-radio>
                            </v-flex>
                        </v-radio-group>
                    </v-flex>
                    <p class="caption-age">Ваш возраст:</p>
                    <v-layout row wrap>
          <v-flex xs9>
            <v-slider :min="1" :max="85" v-model="userAge"></v-slider>
          </v-flex>
          <v-flex xs3>
            <v-text-field v-model="userAge" type="number"></v-text-field>
          </v-flex>
                    </v-layout>
                </v-layout>
                    </v-form>
            </v-container>
        </v-card>
        <v-btn color="primary" @click.native="validateAndClick" :disabled="!validateForm">Далее
            <v-icon dark>chevron_right</v-icon>
        </v-btn>
</div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
export default {
      data () {
      return {
        validateForm: true,
        rules: {
          required: (value) => {
              if(this.getUserWeight.length < 1) return 'Поле ввода не может быть пустым или некорректно заполненным'
              return true
          },
          rangeWeight: function(value){
              if(value < 20 || value > 200) return 'Введите число в диапазоне от 20-200'
              return true
          },
          rangeTall:function(value){
              if(value < 80 || value > 250) return 'Введите число в диапазоне от 80-200'
              return true
          },
          /*patternValidator: (value) => {
            const pattern = /^([1-9]\d{1,2}[.,]\d{1,9})|^([1-9]\d{1,2})/
            return pattern.test(value) || 'Неправильно заполнено поле' */
        }
      }
    },
    computed: {
        ...mapGetters({
            getUserAge:'Calc/getUserAge',
            getGender: 'Calc/getGender',
            getUserTall:'Calc/getUserTall',
            getUserWeight:'Calc/getUserWeight'
        }),
        userAge: {
            get() {
                return this.getUserAge
            },
            set(value) {
                this.setUserAge(value)
            }
        },
        gender: {
            get() {
                return this.getGender
            },
            set(value) {
                return this.setGender(value)
            }
        },
        userWeight: {
            get() {
                return this.getUserWeight
            },
            set(value) {
                this.setUserWeight(value)
            }
        },
          userTall: {
            get() {
                return this.getUserTall
            },
            set(value) {
                this.setUserTall(value)
            }
        }
    },
  methods: {
    ...mapMutations({
      change: 'Calc/changeE1',
      setUserAge: 'Calc/setUserAge',
      setGender:'Calc/setGender',
      setUserWeight:'Calc/setUserWeight',
      setUserTall:'Calc/setUserTall'
    }),
    validateAndClick() {
        if(this.$refs.form.validate()) this.change(3)
    }
  }
};
</script>
<style>
.caption-age {
    font-size: 16px;
    color:rgb(128, 127, 127)
    
}
</style>
