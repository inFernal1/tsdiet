<template>
    <div>
        <v-card color="grey lighten-5" class="mb-5" >
            <v-container>
            <h3 class="calc-caption">Активность:</h3>
              <v-radio-group v-model="userActivity">
                  <v-tooltip v-for="radio in radios"
        :key="radio.value" top
        color="success"
        allow-overflow>
      <v-radio color="primary" 
      slot="activator"
       v-ripple 
       class="radios"
       :value="radio.value" >
          <div slot="label" class="calc_lbl">{{radio.text}}
          </div>
      </v-radio>
      <span>{{radio.hint}}</span>
      </v-tooltip>
    </v-radio-group>
           </v-container>
        </v-card>
        <v-btn color="primary" @click.native="change(4)">Далее
            <v-icon dark>chevron_right</v-icon>
        </v-btn>
        </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            radios:[{
                text: 'Малая',
                value: 1.2,
                hint: 'Сидячий образ жизни'
            },
            {
                text:'Умеренная',
                value: 1.375,
                hint: 'Легкие физ. нагрузки,либо тренировки 1-3 раза в неделю'
            },
            {
                text:'Средняя',
                value: 1.4625,
                hint:'Работа средней тяжести или тренировки 4-5 раз в неделю'
            },
            {
                text:'Высокая',
                value:1.725,
                hint:'Ежедневные тренировки или работа высокой степени тяжести'
            },
            {
                text:'Очень высокая',
                value:1.9,
                hint: 'Очень тяжелая физическая работа(спортсмены,грузчики)'
            }
            ]
        }
    },
    computed: {
       ...mapGetters({
           getUserActivity: 'getUserActivitySimple'
       }),
       userActivity: {
           get() {
               return this.getUserActivity
           },
           set(value) {
               this.setUserActivity(value)
           }
       }
    },
  methods:{
      ...mapMutations({
          change: 'changeE1',
          setUserActivity: 'setUserActivitySimple'
      })
  }
}
</script>
<style scoped>
    .calc_lbl{
        color:black;
        font-weight: 400
    }
    .radios{
        max-width: 170px
    }
</style>
