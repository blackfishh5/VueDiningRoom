const state = {
  tp: window.localStorage.getItem('tp') || 0,
  mn: JSON.parse(window.localStorage.getItem('mn')) || [],
  fn: JSON.parse(window.localStorage.getItem('fn')) || []
};
const actions = {

};
const mutations = {
  SET_MENU: (state, payload) => {
    state.mn = payload.mn;
  },
  SET_PRICE: (state, payload) => {
    state.tp = payload.tp || 0
  },
  SET_FOODNUM: (state, payload) => {
    state.fn = payload.fn;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
