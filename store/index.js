export default {
    state: {
        auth: false,
        login: 'qwertyqwerty'
    },

    getters: {
        getAuth(state) {
            return state.auth
        }
    },

    mutations: {
        CHANGE_AUTH(state, payload) {
            state.auth = payload
        }
    },

    actions: {
        changeAuth({commit, state}, login) {
            if(login == state.login) {
                commit('CHANGE_AUTH', true)
            }
            
        },

        logOut({commit}) {
            commit('CHANGE_AUTH', false)
        }
    }
}