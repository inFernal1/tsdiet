<template>
  <v-layout v-scroll="onScroll" column>
    <v-snackbar vertical
     auto-height
      color="primary"
       :timeout="0" 
       top 
       multi-line 
       v-model="hint"
       v-if="stateSnackbar === 'normal'"
    >
    <h2 class="hidden-xs-only">Осталось ввести: {{getTime.hours}} ч. {{getTime.min}} мин.</h2>
    <h4 class="hidden-sm-and-up">Осталось ввести: {{getTime.hours}} ч. {{getTime.min}}мин.</h4>
    <v-progress-linear :value="progressPercent" color="light-blue darken-4"></v-progress-linear>
    </v-snackbar>
    <v-snackbar 
     
      color="success"
       :timeout="0" 
       top 
       multi-line 
       v-model="hint"
       v-else-if="stateSnackbar === 'success'"
       class="success-notification"
    >
    <div>
    <v-icon x-large dark class="hidden-xs-only">done</v-icon>
     <v-icon x-large dark class="hidden-sm-and-up">done</v-icon>
     <v-btn outline class="btn-wide-active white" :disabled="stateSnackbar !== 'success'" @click.native="nextSlide()">
       <span>Cледующий шаг</span>
       <v-icon dark>chevron_right</v-icon>
     </v-btn>
     </div>
    </v-snackbar>
      <v-snackbar vertical
     
      color="red"
       :timeout="0" 
       top 
       multi-line 
       v-model="hint"
       v-else-if="stateSnackbar === 'error'"
    >
    <h2 class="error-snackbar mb-2"> <v-icon large dark c>error_outline</v-icon> Ошибка</h2>
    <p class="error-snackbar">{{errorMessage}}</p>
    </v-snackbar>
        
            
            <h3 class="calc-caption">Суточная активность:</h3>
            <h3 class="mb-4">1. Выберите действия, которые вы выполняли в течение одних суток:</h3>
                <v-layout column>
                    <v-flex column v-for="(select,index) in selects" :key="select.title">
                        <h3 class="list-titles">{{select.title}} 
                          <v-tooltip left offset-overflow color="success">
                          <v-icon color="success" v-if="select.hint" slot="activator">help_outline</v-icon>
                          <div v-html="select.hint"></div>
                          </v-tooltip>
                          </h3>
                        <v-select
                        chips
                        deletable-chips
                         multiple 
                         hide-selected
                         :items="selects[index].items" 
                        return-object    
                        v-model="selectsValue[index]"
                       max-height="auto"
                        label="Выбрать действия"
                        > 
                       
                        </v-select>
                    </v-flex>
                </v-layout>
                <v-layout column id="fieldsList">
                       

                            <v-layout column >
                                <h3 class="my-4" v-if="selectsValue.length > 0">2. Введите количество затраченного времени на действия, 
                                  которые выполняли в течение одних суток:</h3>
                               <v-flex column  v-for="(value,index) in selectsValue" :key="index + 'cnt'">
                                   <v-layout column>
                            <v-flex v-for="(val,i) in selectsValue[index]" 
                            :key="val.text" 
                            class="table-v-flex"
                            v-deletelem="{value:0,obj:val,type:'reset',func:setTime}"
                            >
                            
                            <v-layout row wrap justify-center class="activity-list-container" 
                            >
                               <v-flex xs12 lg3 md3 sm3 class="activity-list-caption" ><h4>{{selectsValue[index][i].text}}</h4></v-flex>
                               <v-flex  xs12 lg4 md4 sm4 class="activity-time mb-3 mr-2" > <v-text-field 
                                type="number"
                                :min="0"
                                :max="24"
                                id="fieldHours"
                                 solo suffix="ч."
                                  @input="setTime($event,val,'hours')"
                                >
                                </v-text-field>
                                </v-flex>
                               <v-flex xs12 lg4 md4 sm4 class="activity-time mb-3 mr-2"> <v-text-field 
                               type="number"
                                :min="0"
                                :max="60"
                                solo suffix="мин."
                                @input="setTime($event,val,'minutes')"
                                >
                                </v-text-field>
                                </v-flex>
                                </v-layout>
                            </v-flex>

                               </v-layout>
                               </v-flex>
                      </v-layout>
                        
                  
                </v-layout>
            
        <v-flex>
        <v-btn color="primary"  :disabled="stateSnackbar !== 'success'" @click.native="nextSlide()">Далее
           <v-icon dark>chevron_right</v-icon>
        </v-btn>
        </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
export default {
  directives: {
    deletelem: {
      unbind: function(el, binding) {
        let value = binding.value.value;
        let obj = binding.value.obj;
        let type = binding.value.type;
        let func = binding.value.func;

        func(value, obj, type);
      }
    }
  },
  data() {
    return {
      hint: false,
      selectsValue: [],
      activeTime: 0,
      objTime: {},
      activateSetTime: false,
      errorMessage: "",
      stateSnackbar: "",
      resSumActivity:0,
      resCalActivity:0,
      selected:[],
      headers: [
        {
          text: "Выбранная активность",
          align: "left",
          sortable: false
        },
        {
          text: "Время активности",

          align: "left",
          sortable: false
        }
      ],
      selects: [
        {
          title: "Базовые потребности ",
          
          items: [
            {
              text: "Сон",
              value: 1,
              select:false
            },
            {
              text: "Прием пищи",
              value: 1.5,
              select:false
            },
            {
              text: "Уход за собой",
              value: 2.2,
              select:false
            }
          ]
        },
        {
          title: "Основная деятельность",
          hint:`<span>Учитывается полностью рабочее время в деятельности, учитывая перерывы.</span>
          <ul>
          <li>1. Полностью сидячая работа: программист, фрилансер, кассир и т.д.</li>
          <li>2. Умеренная работа: работа в офисе с передвижениями, преподаватель и т.д.</li>
          <li>3. Работа средней интенсивости(стоя): продавец-консультант, официант, бармен,мерчендайзер, повар и т.д. </li>
          <li>4. Тяжелая физическая работа: курьер,механик и т.д.</li>
          </ul>
          `,
          items: [
            {
              text: "Сидячая деят.",
              value: 1.5
            },
            {
              text: "Умеренная деят.",
              value: 1.7
            },
            {
              text: "Средняя деят.",
              value: 2.0
            },
            {
              text: "Тяжелая деят.",
              value: 2.3
            }
          ]
        },
         {
          title: "Работа по дому",
          hint:`
          <ul>
          <li>1. Легкая работа: приготовление пищи, мытьё посуды, вытирание пыли</li>
          <li>2. Не тяжелая работа: уборка комнат, мытьё окон</li>
          <li>3. Тяжелая работа: мытьё полов, выбивание ковров, ремонтные работы </li>
          </ul>
          `,
          items: [
            {
              text: "Легкая дом. р.",
              value: 2.4
            },
            {
              text: "Не тяжелая дом. р.",
              value: 3.7
            },
            {
              text: "Тяжелая дом. р.",
              value: 4.5
            }
          ]
        },
        {
          title: "Перемещение и транспорт",
          items: [
            {
              text: "Поездки в общ. транспорте",
              value: 1.4
            },
            {
              text: "Медленная ходьба",
              value: 2.7
            },
            {
              text: "Ходьба в ср. темпе",
              value: 4.6
            },  
             {
              text: "Быстрая ходьба",
              value: 6.7
            },
            {
              text: "Вождение автомобиля",
              value: 1.84
            },
            {
              text: "Вождение грузовика",
              value: 2.76
            },
            {
              text: "Вождение мотоцикла",
              value: 3.6
            },
            {
              text: "Передвижение на велосипеде",
              value: 3.69
            },
               {
              text: "Передвижение на самокате ",
              value: 7
            }
          ]
        },
         {
          title: "Отдых, развлечения",
          hint:`
          <ul>
          <li>1. Пассивный отдых: Просмотр телевизора, отдых за компьютером, чтение книг</li>
          
          </ul>
          `,
          items: [
            {
              text: "Пассивный отдых",
              value: 1.3
            },
            {
              text: "Медленные танцы",
              value: 2
            },
            {
              text: "Энергичные танцы",
              value: 5.07
            },
            {
              text: "Скейтборд",
              value: 5.3
            },
            {
              text: "Ролики",
              value: 6
            },
            {
              text: "Бильярд",
              value: 2.30
            }
          ]
        },
         {
          title: "Спорт",
          items: [
            {
              text: "Футбол",
              value: 7.7
            },
            {
              text: "Теннис",
              value: 7.75
            },
            {
              text: "Волейбол",
              value: 7.9
            },
            {
              text: "Борьба",
              value: 11
            },
            {
              text: "Баскетбол",
              value: 13
            },
            {
              text: "Бокс",
              value: 6
            },
            {
              text: "Бадминтон",
              value: 4.14
            },
            {
              text: "Бейсбол",
              value: 4.2
            },
            {
              text: "Гольф",
              value: 4
            },
            {
              text: "Плавание(тренировка)",
              value: 8
            },
            {
              text: "Коньки(отдых)",
              value: 3.3
            },
            {
              text: "Конькобежная тренировка",
              value: 9.5
            },
            {
              text: "Фехтование",
              value: 8.9
            },
            {
              text: "Альпинизм",
              value: 8.903
            },
            {
              text: "Стрельба",
              value: 3.3
            },
            {
              text: "Крикет",
              value: 6.0
            },
            {
              text: "Спортивные танцы",
              value: 6
            },
            {
              text: "Верховая езда",
              value: 4.2
            }
          ]
        },
        {
          title: "Аэробика,фитнес",
          items: [
            {
              text: "Аэробика легкая",
              value: 3.97
            },
            {
              text: "Аэробика интенсивная",
              value: 6.45
            },
            {
              text: "Силовая тренировка",
              value: 6.3
            },
               {
              text: "Стрит воркаут",
              value: 6.3
            },
            {
              text: "Спортивная ходьба",
              value: 7.9
            },
            {
              text: "Бег 8км/ч",
              value: 8.8
            },
            {
              text: "Бег 12км/ч",
              value: 10
            }, {
              text: "Бег 15км/ч",
              value: 13
            },
            {
              text: "Бег 18км/ч",
              value: 17
            },
            {
              text: "Велотренажер",
              value: 7.4
            },
            {
              text: "Гребной тренажер",
              value: 7.403
            },
            {
              text: "Тренажер эллипсоид",
              value: 10
            },
            {
              text: "Йога",
              value: 4
            },
            {
              text: "Прыжки через скакалку",
              value: 10.6
            }
          ]
        },
         {
          title: "Самостоятельная оценка активности",
          hint:`
          <span>Если вы не нашли в списках ту активность, котороую вы выполняли в течение суток, то вы сами можете приблизительно оценить её.
          </span>
          `,
          items: [
            {
              text: "Оч. легкая акт.",
              value: 1.4
            },
            {
              text: "Легкая акт.",
              value: 1.7
            },
            {
              text: "Умеренная акт.",
              value: 2.2
            },
            {
              text: "Тяжелая акт.",
              value: 3
            },
            {
              text: "Оч. тяжелая акт.",
              value: 5
            },
            {
              text: "Чр. тяжёлая акт.",
              value: 8
            },
             {
              text: "Изнурительная акт.",
              value: 11
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      getUserWeight: 'getUserWeight'
    }),
    getTime() {
      function getDecimal(num) {
        var str = "" + num;
        var zeroPos = str.indexOf(".");
        if (zeroPos == -1) return 0;
        str = str.slice(zeroPos);
        return +str;
      }
      if (this.activateSetTime === false)
        return {
          min: "00",
          hours: 24
        };
      let minutesFloat = this.activeTime / 60;
      let hours = Math.floor(minutesFloat);
      let minutesInt = getDecimal(minutesFloat) * 60;

      return {
        min: Math.round(minutesInt),
        hours: hours
      };
    },
    progressPercent() {
      if (this.activateSetTime === false) return 0;
      return 100 - this.activeTime / 1440 * 100;
    }
  },
  methods: {
    ...mapMutations( {
      change: "changeE1",
      setUserActivityWide: "setUserActivityWide"
    }),
    onScroll(e) {
      
      let elem = document.getElementById('fieldsList');
      let elemCoords = elem.getBoundingClientRect().top + window.pageYOffset;
      let windowScrollTop = document.documentElement.clientHeight + window.pageYOffset;
      if (windowScrollTop > elemCoords) {
        this.hint = true;
      } else if (windowScrollTop < elemCoords) {
        this.hint = false;
      }
    },
    nextSlide() {
      this.setUserActivityWide(this.resSumActivity);
      this.change(4)
    },
    setTime(value, obj, type) {
      this.activateSetTime = true;
      if (!obj.hasOwnProperty("minutes")) this.$set(obj, "minutes", 0);
      if (!obj.hasOwnProperty("hours")) this.$set(obj, "hours", 0);
      if (type === "minutes") {
        if (value < 60 && value >= 0) {
          this.stateSnackbar = "normal";
          obj.minutes = value;
        } else {
          this.stateSnackbar = "error";
          this.errorMessage =
            "Минуты в полях могут быть только в диапазоне от 0 до 59";
            obj.minutes = 0;
        }
      }
      if (type === "hours") {
        if (value <= 24 && value >= 0) {
          this.stateSnackbar = "normal";
          obj.hours = value;
        } else {
          this.stateSnackbar = "error";
          this.errorMessage = "такое количество часов в сутках не существует";
          obj.hours=0;
         
        }
      }
      if (type === "reset") {
        obj.minutes = value;
        obj.hours = value;
        this.stateSnackbar = 'normal'
      }

      if (!obj.hasOwnProperty("fullTime")) this.$set(obj, "fullTime", 0);
      obj.fullTime = obj.hours * 60 + +obj.minutes;
      if (!this.objTime.hasOwnProperty(obj.text))  this.$set(this.objTime, obj.text, 0);
      let sumActivity = obj.value * (obj.fullTime / 60);
        let calActivity = (obj.fullTime / 60) * (obj.value * this.getUserWeight);
      Object.defineProperty(this.objTime, obj.text, {
        value: {
          fullTime:obj.fullTime,
          sumActivity:sumActivity,
          calActivity:calActivity
        }
      });
      let sum = 0;
      let resSumActivity = 0;
      let resCalActivity = 0;
      for (let key in this.objTime) {
       sum += this.objTime[key].fullTime
          resSumActivity += this.objTime[key].sumActivity;
          resCalActivity += this.objTime[key].calActivity;
      }
      if (sum === 1440) this.stateSnackbar = "success";
      this.activeTime = 1440 - sum;
      this.resSumActivity = (resSumActivity / 24).toFixed(2)
      this.resCalActivity = resCalActivity;
    }
  }
};
</script>
<style scoped>
.activity-time {
  min-width: 110px;
}
.activity-list-caption {
  display: flex;
  max-height: 48px;
  margin-bottom: 5px;
}
.activity-list-caption h4 {
  margin: auto 0;
}
.activity-list-container {
  margin-bottom: 20px;
  border-bottom: 2px solid rgba(128, 128, 128, 0.568);
}
.btn-wide-active{
  padding: 5px;
  color: white;
  margin-left:10px;
}
.error-snackbar{
  text-align: center;
}
.list-titles{
font-weight: 400;
}
.success-notification {
 
}
</style>


