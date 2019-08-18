import Vue from 'vue'
import Vuex from 'vuex'
import buyfood from './buyfood'
import user from './user'
import base from './base'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{

    },
    mutations: {
        
    },
    actions: {
        
    },
    modules:{
        buyfood,
        user,
        base
    }
})


