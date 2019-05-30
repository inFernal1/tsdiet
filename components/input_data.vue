<template>
  <div>
    <v-card color="grey lighten-5" class="mb-5">
      <v-container fluid>
        <h3 class="calc-caption">
          Ввод ваших данных:
        </h3>
        <v-form ref="form" v-model="validateForm" lazy-validation>
          <v-layout column>
            <v-flex>
              <v-text-field
                v-model="userWeight"
                label="Ваш вес в кг"
                type="number"
                suffix="кг"
                tabindex="0"
                hint="Примеры заполнения: 70 | 83,5 | 100.5 | 67,320"
                required
                :rules="[rules.required, rules.rangeWeight]"
              />
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="userTall"
                label="Ваш рост в см"
                suffix="см"
                tabindex="1"
                hint="Примеры заполнения: 160,5 | 178 | 200.7"
                type="number"
                required
                :rules="[rules.required, rules.rangeTall]"
              />
            </v-flex>
            <v-flex>
              <v-radio-group v-model="gender" row label="Ваш пол:">
                <v-flex>
                  <v-radio label="M" color="primary" value="M" />
                </v-flex>
                <v-flex>
                  <v-radio label="Ж" color="primary" value="F" />
                </v-flex>
              </v-radio-group>
            </v-flex>
            <p class="caption-age">
              Ваш возраст:
            </p>
            <v-layout row wrap>
              <v-flex xs9>
                <v-slider v-model="userAge" :min="1" :max="85" />
              </v-flex>
              <v-flex xs2 class="ml-3">
                <v-text-field v-model="userAge" type="number" />
              </v-flex>
            </v-layout>
          </v-layout>
        </v-form>
      </v-container>
    </v-card>
    <v-btn
      color="primary"
      :disabled="!validateForm"
      @click.native="validateAndClick"
    >
      Далее
      <v-icon dark>
        chevron_right
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex"
export default {
  data() {
    return {
      validateForm: true,
      rules: {
        required: value => {
          if (this.getUserWeight.length < 1)
            return "Поле ввода не может быть пустым или некорректно заполненным"
          return true
        },
        rangeWeight: function(value) {
          if (value < 20 || value > 200)
            return "Введите число в диапазоне от 20-200"
          return true
        },
        rangeTall: function(value) {
          if (value < 80 || value > 250)
            return "Введите число в диапазоне от 80-200"
          return true
        }
      }
    }
  },
  computed: mapGetters({
    getUserAge: "сalc/getUserAge",
    getGender: "сalc/getGender",
    getUserTall: "сalc/getUserTall",
    getUserWeight: "сalc/getUserWeight"
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
  },
  methods: {
    ...mapMutations({
      change: "сalc/changeE1",
      setUserAge: "сalc/setUserAge",
      setGender: "сalc/setGender",
      setUserWeight: "сalc/setUserWeight",
      setUserTall: "сalc/setUserTall"
    }),
    validateAndClick() {
      if (this.$refs.form.validate()) this.change(3)
    }
  }
}
</script>
<style>
.caption-age {
  font-size: 16px;
  color: rgb(128, 127, 127);
}
</style>
