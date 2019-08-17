const state = {
  tp: parseFloat(window.localStorage.getItem('tp'))|| 0,
  // mn: JSON.parse(window.localStorage.getItem('mn')) || [],

  // fn: JSON.parse(window.localStorage.getItem('fn')) || [],
  tn: window.localStorage.getItem('tn') || 0,
  // accMn: JSON.parse(window.localStorage.getItem('accMn')) || [],
  // accFn: JSON.parse(window.localStorage.getItem('accFn')) || [],

  carShops: JSON.parse(window.localStorage.getItem('carShops')) || [],
};
const actions = {

};
const mutations = {
  SET_MENU: (state, payload) => {
    state.mn = payload.mn;
  },
  SET_PRICE: (state, payload) => {
    state.tp = payload.tp || 0;
  },
  SET_NUM: (state, payload) => {
    state.tn = payload.tn || 0;
  },
  SET_FOODNUM: (state, payload) => {
    state.fn = payload.fn;
    state.total = payload.total;
  },
  SET_BUTFOOD: (state,payload)=>{
    state.accMn = payload.accMn;
    state.accFn = payload.accFn;
  },
  SET_CARSHOP: (state,payload)=>{
    state.carShops = payload.carShops;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
