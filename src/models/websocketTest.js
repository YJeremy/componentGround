import {getCNCcode} from '../services/customapi'

export default {
    namespace:'websocketTest',
    state:{
        dynamic:null,
        ws:[]
    },

    effects:{
    },

    reducers:{

        wsMsg(state,{payload}){
            const {dynamic} = payload
            return {
                ...state,
                dynamic:dynamic
            }
        },

        wsOpen(state,{payload}){
            const { ws } = payload
            return {
                ...state,
                ws:ws,
            }
        },

        wsClose(state,{payload}){

        },

        wsError(state,{payload}){

        }
    }
}
