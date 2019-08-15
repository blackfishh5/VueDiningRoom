const state = {
    username: '请前往登陆页面',
    password: null,
    realname: '未设置',
    money: 0,
    avatar: 'default.jpg'
  };
  const actions = {
  
  };
  const mutations = {
    SET_USER: (state, payload) => {
      state.username = payload.username;
      state.realname = payload.realname;
      state.money = payload.money;
    }
  };
  export default {
    namespaced: true,
    state,
    actions,
    mutations
  }
  