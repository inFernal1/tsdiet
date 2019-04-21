<template>
<div>
        <v-card color="grey lighten-5" class="mb-5" height="200px">
            <v-container >
            <h3 class="calc-caption mb-3">Выберите тип калькулятора:</h3>
        <v-radio-group v-model="radios" :mandatory="false" >
      <v-radio color="primary"  v-ripple value="simpleCalc" @change="changeHints({show:true,color:'primary'})" >
          <div slot="label" class="calc_lbl">Обычный
          </div>
      </v-radio>
      <v-radio  color="success" v-ripple="{color:'success'}" value="wideCalc" @change="changeHints({show:true,color:'success'})">
          <div slot="label" class="calc_lbl">Расширенный
          </div></v-radio>
    </v-radio-group>
            </v-container>
                <v-snackbar   :color="getHintsColor" :timeout="0" 
                 vertical auto-height  top multi-line v-model="hints" >
      <div v-if="getTypeCalc === 'simpleCalc'">
          Обычный тип калькулятора предполалает более быстрый расчёт 
калорийности по формуле Миффлина-Сан Жеора с 
учётом ваших целей. Результат расчёта будет менее точным 
по сравнению с расширенным типом калькулятора.
</div>
    <div v-else-if="getTypeCalc === 'wideCalc'">Расширенный тип калькулятора предполагает более точный 
расчет калорийности с учётом ваших целей.  Он отличается от 
обычного тем, что вам придется потратить больше времени на ввод данных,
чтобы калькулятор смог вычесть ваши энергозатраты на основе
вашей активности в течении одних суток. Чтобы получить наиболее точный результат, рекомендуем 
считать калорийность каждый день в течение недели, а потом сложить все данные и поделить на 7(количество дней). 
Так вы получите среднее суточное количество калорий, которое вы тратите.
Но помните: никакой онлайн калькулятор не выдаст 100% результата из-за индивидульности организмов</div>
      <v-btn flat color="black" @click.native="changeHints({show:false})">Закрыть</v-btn>
    </v-snackbar>
        </v-card>
        <v-btn color="primary" @click.native="change(2)" :disabled="getTypeCalc == ''">Далее
            <v-icon dark>chevron_right</v-icon>
        </v-btn>
</div>
</template>

<script>
import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters({
            getTypeCalc: 'Calc/getTypeCalc',
            getHints:'Calc/getHintsForRadios',
            getHintsColor:'Calc/getHintsColor'
        }),
        radios: {
            get() {
                return this.getTypeCalc
            },
            set(value) {
                this.setTypeCalc(value)
            }
        },
        hints: {
            get() {
                return this.getHints
            },
            set(value) {
                this.changeHints({show:value})
            }

        }
    },
  methods:{
      ...mapMutations({
          change: 'Calc/changeE1',
          setTypeCalc:'Calc/setTypeCalc',
          changeHints:'Calc/changeHintsForRadios'
      })
  }
}
</script>
<style scoped>
    .calc_lbl{
        color:black;
        font-weight: 500
    }
  .help-notification {
display: flex;

  }
  .help-notification *{
border: none;
box-shadow: 0 0 0 0;
outline: none;
  }
</style>
