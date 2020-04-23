import {getCNCcode} from '../services/customapi'

export default {
    namespace:'program',
    state:{
        code:[]
    },
    effects:{
        *fetch({payload},{call,put}){
            const codes = yield call(getCNCcode,'O0005',payload);

        }

    },
    reducers:{
        codeSave(state,{payload}){

            return{
                code:payload
            }
        }

    }
}
