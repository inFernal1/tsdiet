const state = {
    e1: 0,
    typeCalc: '',
    hintsForRadios: {
        show: false,
        color: 'info'
    },
    userAge: 18,
    gender: 'M',
    userWeight: '',
    userTall: '',
    userActivitySimple: 1.375,
    userActivityWide: 0,
    userPurpose: '',
    userPurposeWay: 0,
    resultCal: {
        calWithPurpose: 0,
        calKeepWeight: 0,
        calBasic: 0
    },
    userLifting: true,
    pfc: {
        proteins: 0,
        fats: 0,
        carbs: 0
    },
    pfcPercents:{
        proteins:0,
        fats:0,
        carbs: 0
    }
}
export default state;