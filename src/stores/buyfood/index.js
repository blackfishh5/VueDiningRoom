const state = {
  tp: parseFloat(window.localStorage.getItem('tp'))|| 0,
  tn: parseFloat(window.localStorage.getItem('tn'))|| 0,
  carShops: JSON.parse(window.localStorage.getItem('carShops')) || [],

  openReflesh: false
};
const actions = {
  clearData(context){
    context.commit('CLEAR_DATA');
  }
};
const mutations = {
  SET_PRICE: (state, payload) => {
    state.tp = payload.tp || 0;
  },
  SET_NUM: (state, payload) => {
    state.tn = payload.tn || 0;
  },
  SET_CARSHOP: (state,payload)=>{
    state.carShops = payload.carShops;
  },
  SET_OPENREFLESH: (state,payload) =>{
    state.openReflesh = payload.openReflesh
  },
  CLEAR_DATA:(state) =>{
    state.tp = 0;
    state.tn = 0;
    state.carShops = [];
    state.openReflesh = false;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
