<template>
<div>
        <v-card color="grey lighten-5" class="mb-5" height="200px">
            <v-container >
            <h3 class="calc-caption mb-3">Выберите тип калькулятора:</h3>
        <v-radio-group v-model="radios" :mandatory="false" >
      <v-radio color="primary"  v-ripple value="simpleCalc" @change="changeHints({show:true,color:'info'})" >
          <div slot="label" class="calc_lbl">Обычный
          </div>
      </v-radio>
      <v-radio  color="success" v-ripple="{color:'success'}" value="wideCalc" @change="changeHints({show:true,color:'success'})">
          <div slot="label" class="calc_lbl">Расширенный
          </div></v-radio>
    </v-radio-group>
            </v-container>
                <v-snackbar vertical auto-height :color="getHintsColor" :timeout="0" bottom multi-line v-model="hints" >
      <div v-if="getTypeCalc === 'simpleCalc'">
          Обычный тип калькулятора предполалает более быстрый расчёт 
калорийности по формуле Миффлина-Сан Жеора с 
учётом ваших целей. Результат расчёта будет менее точным 
по сравнению с расширенным типом калькулятора.
</div>
    <div v-else-if="getTypeCalc === 'wideCalc'">Расширенный тип калькулятора предполагает более точный 
расчет калорийности с учётом ваших целей.  Он отличается от 
обычного тем, что вам придется потратить больше времени на ввод данных,
чтобы калькулятор смог вычесть  ваши энергозатраты наиболее точно на основе
вашей активности в течении одних суток. Чтобы получить результат ещё более точно, рекомендуем 
считать калорийность каждый день в течение недели, а потом всё сложить и поделить на 7(количество дней). 
Так вы получите среднее суточное количество калорий которое вы тратите.
Но помните: никакой калькулятор не выдаст 100% результата.
 Так как организмы у людей
все разные.</div>
      <v-btn flat color="black" @click.native="changeHints({show:false})">Закрыть</v-btn>
    </v-snackbar>
        </v-card>
        <v-btn color="info" @click.native="change(2)" :disabled="getTypeCalc == ''">Далее
            <v-icon dark>chevron_right</v-icon>
        </v-btn>
</div>
</template>

<script>
import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters('calc',{
            getTypeCalc: 'getTypeCalc',
            getHints:'getHintsForRadios',
            getHintsColor:'getHintsColor'
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
      ...mapMutations('calc',{
          change: 'changeE1',
          setTypeCalc:'setTypeCalc',
          changeHints:'changeHintsForRadios'
      })
  }
}
</script>
<style scoped>
    .calc_lbl{
        color:black;
        font-weight: 500
    }
    
</style>
