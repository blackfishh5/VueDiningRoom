const state = {
  tp: parseFloat(window.localStorage.getItem('tp'))|| 0,
  tn: parseFloat(window.localStorage.getItem('tn'))|| 0,
  carShops: JSON.parse(window.localStorage.getItem('carShops')) || [],

  openReflesh: false
};
const actions = {

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
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
