import * as loginSer from '../service/loginService'

export default {
    namespaced: true,
    state: {
        data: null,
        isLoading: false
    },
    mutations: {
        setData(state, payload){
            state.data = payload;
        },
        setIsLoading(state, payload){
            state.isLoading = payload;
        }
    },
    actions: {
        async login({commit}, {loginId, loginPwd}){
            commit("setIsLoading", true);
            const resp = await loginSer.login(loginId, loginPwd);
            commit("setData", resp.data);
            commit("setIsLoading", false);
            return resp;
        },
        async loginOut({commit}){
            commit("setData", null);
            loginSer.loginOut();
        },
        async whoami({commit}){
            commit("setIsLoading", true);
            try {
                const resp = await loginSer.whoami();
                commit("setData", resp.data);
                return resp;
            } catch (error) {
                commit("setData", null);
            }
            commit("setIsLoading", false);
        }
    }
}