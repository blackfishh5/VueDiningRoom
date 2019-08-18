const state = {
    isLoading: true,
}
const action = {

}
const mutations = {
    SET_ISLOADING:(state,payload)=>{
        state.isLoading = payload.isLoading
    }
}
export default  {
    namespaced: true,
    state,
    action,
    mutations
}

