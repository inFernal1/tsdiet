<template>
<div>
        <v-card color="grey lighten-5" class="mb-5">
            <v-container column>
                <v-snackbar vertical auto-height color="red" 
                :timeout="0" top multi-line v-model="hints" >
<div v-if="getUserPurposeWay == 40">
<span>Мы не рекомендуем выбирать этот пункт,если только вы не: </span>
              <ol>
               <li>Имеете многолетний опыт в фитнесе,отлично зная своё здоровье. </li> 
               <li> Имеете способность во время остановиться, отвечая на сигналы своего организма.</li> 
               <li>Выбирали предыдущие темпы достижения цели и они давали вам очень
                    несущественный результат из-за ваших особенностей организма.</li> 
               </ol>
</div>
 <v-btn flat color="black" @click.native="hints=false">Закрыть</v-btn>
                </v-snackbar>
                <v-layout>
                    <v-flex>
           <h3 class="calc-caption">Цель
           </h3>
           </v-flex>
                </v-layout>
            <v-layout column class="select_purpose">
                <v-flex ><h3>Укажите вашу цель:</h3></v-flex>
                <v-flex>
                    <v-radio-group v-model="userPurpose" color="primary" >
                        <v-radio value="loseWeight" color="primary" v-ripple >
                            <div slot="label" class="purpose_lbl">Сбросить вес</div>
                        </v-radio>
                        <v-radio value="keepWeight" color="primary" v-ripple @change="hints = false">
                            <div slot="label" class="purpose_lbl">Поддерживать <span class="hidden-xs-only">вес</span></div>
                        </v-radio>
                        <v-radio value="takeWeight" color="primary" v-ripple >
                            <div slot="label" class="purpose_lbl">Набрать вес</div>
                        </v-radio>
                    </v-radio-group>
                </v-flex>
            </v-layout>
            <v-layout column class="speed_purpose" v-if="getUserPurpose !== 'keepWeight' && getUserPurpose !== ''">
                <v-flex>
                    <v-alert class="advice_purpose hidden-xs-only" color="success" type="info" :value="true" transition="scale-transition">
      У всех людей индивидуальные организмы, поэтому настоятельно 
      рекомендуем начать достижение свой цели  именно с медленного темпа. 
      Это поможет организму постепенно настроиться, запуская процессы 
      эффективного сжигания жира или набора качественного набора мышечной массы.
      В противном случае, если вы выберете сразу быстрый темп, то резкая смена 
    образа жизни повлечет за собой замедление метаболизма, а возможно и проблемы со здоровьем.
    Если же после 2-4 недель медленного темпа ваш вес стоит на месте и вы чувствуете, 
    что результата почти нет, то тогда выбирайте быстрый темп. 
    Всегда прислушивайтесь к своему организму, ничего нет такого, что может подходить всем.
    Экстремальный темп подходит в основном только профессиональным спортсменам.
    
    </v-alert></v-flex>
                <v-flex><h3>Темп достижения цели:</h3></v-flex>
                <v-flex>
                    <v-radio-group v-model="userPurposeWay" color="primary" >
                        <v-radio :value="15" color="success" v-ripple @change="hints = false">
                            <div slot="label" class="purpose_lbl">Медленно<span class="hidden-xs-only">, но верно</span></div>
                        </v-radio>
                        <v-radio :value="25" color="success" v-ripple @change="hints = false">
                            <div slot="label" class="purpose_lbl" >Быстро</div>
                        </v-radio>
                        <v-radio :value="40" color="red" v-ripple @change="hints = true">
                            <div slot="label" class="purpose_lbl">Экстремально</div>
                        </v-radio>
                    </v-radio-group>
                </v-flex>
            </v-layout>
           </v-container>
        </v-card>
        <v-btn color="primary" @click.native="dialog = true" :disabled="!readyToGo">Далее
            <v-icon dark>chevron_right</v-icon>
        </v-btn>
        <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
          <v-layout column align-center>
        <v-flex>
            <v-card-title class="align-text-center"><span class="subheading">Вы занимаетесь силовыми тренировками?</span></v-card-title> </v-flex>
          <v-spacer></v-spacer>
          <v-flex>
          <v-btn color="primary" flat @click.native="stepResult(true)">Да</v-btn>
          <v-btn color="primary"  flat @click.native="stepResult(false)">Нет</v-btn>
          </v-flex>
          </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
        dialog:false,
      hints: false
    };
  },
  methods: {
    ...mapMutations({
      change: "Calc/changeE1",
      setUserPurpose: "Calc/setUserPurpose",
      setUserPurposeWay: "Calc/setUserPurposeWay",
      totalSumCalc:"Calc/totalSumCalc",
      setUserLifting: "Calc/setUserLifting"
    }),
    stepResult(userLifting) {
        if(userLifting) {
            this.setUserLifting(true)
        }
        else {
            this.setUserLifting(false)
        }
        this.dialog = false;
        this.totalSumCalc();
        this.change(5);
    }
  },
  computed: {
    ...mapGetters( {
      getUserPurpose: "Calc/getUserPurpose",
      getUserPurposeWay: "Calc/getUserPurposeWay",
      
    }),
    userPurpose: {
      get() {
        return this.getUserPurpose;
      },
      set(value) {
        this.setUserPurpose(value);
      }
    },
    userPurposeWay: {
      get() {
        return this.getUserPurposeWay;
      },
      set(value) {
        this.setUserPurposeWay(value);
      }
    }, 
    readyToGo() {
        return (this.getUserPurpose !== '' && this.getUserPurposeWay !== 0) || 
        (this.getUserPurpose == 'keepWeight')
    }
  }
};
</script>
<style scoped>
.purpose_lbl {
  font-weight: 400;
  color: black;
}
.select_purpose {
  outline: 2px solid #009dff;
  padding-left: 15px;
  padding-top: 20px;
  margin-bottom: 30px;
}
.speed_purpose {
  outline: 2px solid #0ca600;
  padding-left: 15px;
  padding-top: 20px;
   padding-right:15px;
   }
   .advice_purpose{
       
       margin-bottom: 20px;
   }
   .align-text-center {
       text-align: center;
   }
</style>

