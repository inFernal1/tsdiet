export default {
    getE1(state) {
        return state.e1;
    },
    getTypeCalc(state) {
        return state.typeCalc;
    },
    getHintsForRadios(state) {
        return state.hintsForRadios.show;
    },
    getHintsColor(state) {
        return state.hintsForRadios.color;
    },
    getUserAge(state) {
        return state.userAge;
    },
    getGender(state) {
        return state.gender;
    },
    getUserTall(state) {
        return state.userTall;
    },
    getUserWeight(state) {
        return state.userWeight;
    },
    getUserActivitySimple(state) {
        return state.userActivitySimple;
    },
    getUserActivityWide(state) {
        return state.userActivityWide;
    },
    getUserPurpose(state) {
        return state.userPurpose;
    },
    getUserPurposeWay(state) {
        return state.userPurposeWay;
    },
    getResultSum(state) {
        return state.resultCal;
    },
    getPfc(state){
        return state.pfc;
    },
    getPfcPercents(state) {
        return state.pfcPercents;
    }

}