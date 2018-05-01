const mutations = {
    changeE1(state, payLoad) {
        state.e1 = payLoad;
    },
    setTypeCalc(state, payLoad) {
        state.typeCalc = payLoad;
    },
    changeHintsForRadios(state, payLoad) {
        state.hintsForRadios.show = false;
        state.hintsForRadios.show = payLoad.show;
        state.hintsForRadios.color = payLoad.color
    },
    setUserAge(state, payLoad) {
        state.userAge = payLoad;
    },
    setGender(state, payLoad) {
        state.gender = payLoad;
    },
    setUserWeight(state, payLoad) {
        state.userWeight = payLoad;
    },
    setUserTall(state, payLoad) {
        state.userTall = payLoad;
    },
    setUserActivitySimple(state, payLoad) {
        state.userActivitySimple = payLoad;
    },
    setUserActivityWide(state, payLoad) {
        state.userActivityWide = payLoad;
    },
    setUserPurpose(state, payLoad) {
        state.userPurpose = payLoad;
    },
    setUserPurposeWay(state, payLoad) {
        state.userPurposeWay = payLoad;
    },
    setUserLifting(state,payLoad) {
        state.userLifting = payLoad
    },
    totalSumCalc(state,convertingValue) {
        let weight = state.userWeight;
        let tall = state.userTall;
        let gender = state.gender;
        let age = state.userAge;
        let basicExchange = 0;
        let resultSum = 0;
        let purpose = state.userPurpose;
        let purposeWay = state.userPurposeWay;
        let cal = 0;
        if(convertingValue === "" || convertingValue == undefined) {
        if(purpose === 'takeWeight') purposeWay = purposeWay - 5;
        if (gender === 'M') {
            basicExchange = 10 * weight + 6.25 * tall - 5 * age + 5;
        }
        else if (gender === 'F') {
            basicExchange = 10 * weight + 6.25 * tall - 5 * age - 161;
        }
        if (state.typeCalc === 'simpleCalc') {
            resultSum = basicExchange * state.userActivitySimple;
        }
        else if (state.typeCalc === 'wideCalc') {
            resultSum = basicExchange * state.userActivityWide;
        }
        state.resultCal.calKeepWeight = Math.round(resultSum);
        if (purpose === 'loseWeight') {
            resultSum = resultSum - (resultSum * purposeWay / 100)
        }
        else if (purpose === 'takeWeight') {
            resultSum = resultSum + (resultSum * purposeWay / 100)
        }
        if (gender === 'M' && resultSum < 1200) {
            resultSum = 1200;
        }
        else if (gender === 'F' && resultSum < 1000) {
            resultSum = 1000;
        }
         cal = Math.round(resultSum);
        state.resultCal.calBasic = Math.round(basicExchange); 
        state.resultCal.calWithPurpose = cal;
        setPfc()
    }
        else {
             cal = convertingValue;
            setPfc()
        }
        function setPfc() {
            let proteinGramm = 0;
            let fatLoseWeight = weight * 0.7;
            if (state.userLifting) {
                if(state.gender === 'F') proteinGramm = weight * 1.5
                else {
                if(cal < 3000) proteinGramm = weight * 2
                else proteinGramm = weight * 2.25
                }
            }
            else {
                if (purpose === 'loseWeight') {
                    proteinGramm = weight * 1.5
                }
                else proteinGramm = weight
            }

            let proteinPercent = proteinGramm * 4 * 100 / cal;
            let carbFatCal = (100 - proteinPercent) / 100 * cal;
             let carbGramm = carbFatCal * 0.5 / 4;
            let fatGramm = carbFatCal * 0.5 / 9;
           
            if ((fatGramm > weight) && purpose !== 'loseWeight') {
                if(cal < 3000) {
                carbGramm = carbGramm + ((fatGramm - weight) * 9 / 4)
                fatGramm = weight;
            }
            else if (cal > 4000){
                carbGramm = carbGramm + ((fatGramm - (weight * 1.25)) * 9 / 4);
                    fatGramm = weight * 1.5
            }
                else {
                    carbGramm = carbGramm + ((fatGramm - (weight * 1.25)) * 9 / 4);
                    fatGramm = weight * 1.25
                };
            }
            else if (purpose === 'loseWeight') {
                if (fatGramm > fatLoseWeight) {
                    carbGramm = carbGramm + ((fatGramm - fatLoseWeight) * 9 / 4);
                    fatGramm = fatLoseWeight;
                }
                else if (fatGramm < fatLoseWeight) {
                    carbGramm = carbGramm - ((fatLoseWeight - fatGramm) * 9 / 4)
                }
            }
            state.pfc.proteins = Math.round(proteinGramm);
            state.pfc.carbs = Math.round(carbGramm);
            state.pfc.fats = Math.round(fatGramm);
            /*state.pfcPercents.proteins = Math.round((proteinGramm * 4) / cal * 100);
            state.pfcPercents.fats = Math.round((fatGramm * 9) / cal * 100);
            state.pfcPercents.carbs = Math.round((carbGramm * 4) / cal * 100); // percent from calories */
            let totalPfcGramm = state.pfc.proteins + state.pfc.carbs + state.pfc.fats;
            state.pfcPercents.proteins = Math.round(proteinGramm  / totalPfcGramm * 100);
            state.pfcPercents.fats = Math.round(fatGramm  / totalPfcGramm * 100);
            state.pfcPercents.carbs = Math.round(carbGramm  / totalPfcGramm * 100);
          
            

        }
       
    }
}
export default mutations;