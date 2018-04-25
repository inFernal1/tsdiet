<template>
<v-container fluid class="calc-container">
  <v-stepper :value="getE1" >
    <v-stepper-header>
      <v-stepper-step step="1" :complete="getE1 > 1">Выбор калькулятора</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="getE1 > 2">Ввод данных</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3" :complete="getE1 > 3">Указание активности</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="4" :complete="getE1 > 4">Указание цели</v-stepper-step>
      <v-divider></v-divider>
       <v-stepper-step step="5" >Результат</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
      <select-calc></select-calc>
      </v-stepper-content>
      <v-stepper-content step="2">
        <input-data></input-data>
      </v-stepper-content>
      <v-stepper-content step="3">
      
        <activity-data-simple v-if="getTypeCalc === 'simpleCalc'"></activity-data-simple>
        <activity-data-wide v-else-if="getTypeCalc === 'wideCalc'"></activity-data-wide>
      </v-stepper-content>
        
        <v-stepper-content step="4">
        <purpose-data></purpose-data>
      </v-stepper-content>
        <v-stepper-content step="5">
          <result-calc></result-calc>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</v-container>
</template>
<script>
import selectCalc from '~/components/select_calc';
import inputData from '~/components/input_data';
import activityDataSimple from '~/components/activity_data_simple';
import purposeData from '~/components/purpose_data';
import resultCalc from '~/components/result_calc';
import activityDataWide from '~/components/activity_data_wide'
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
import {mapState} from 'vuex'
export default {
  layout: 'default',
  computed: {
    ...mapGetters({
      getE1: 'getE1',
      getTypeCalc:'getTypeCalc'
    })
  },
  methods:{
    ...mapMutations({
      changeE1:'changeE1'
    })
  },
  	components: {
      selectCalc,
      resultCalc,
      inputData,
      activityDataSimple,
      purposeData,
      activityDataWide
		}
}
</script>
<style scoped>
.calc-container{
    max-width: 900px;
    min-width: 305px;
}
</style>
