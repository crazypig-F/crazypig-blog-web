import { createStore } from 'vuex'

export default createStore({
    state: {
        navType: localStorage.getItem('navType')
    },
    mutations: {
        changeNav(state, navType) {
            localStorage.setItem('navType', navType)
            state.navType = localStorage.getItem('navType')
        }
    },
    actions: {
    },
    modules: {
    }
})

