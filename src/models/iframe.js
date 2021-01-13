import {getCNCcode} from '../services/customapi'

async function name(params) {

}

export const SourceIP = `${location.hostname}`;
//export const SourceIP = '172.22.19.45';
export const cnclinkAddr = `${SourceIP}:11520`;
export const robotlinkAddr = `${SourceIP}:11523`;
export const workshopAddr = `${SourceIP}:3000`;

export default {
    namespace:'iframe',
    state:{
        pageName:'',
        data:'',
    },
    effects:{
        *fetch({payload},{call,put}){
            const codes = yield call(getCNCcode,'O0005',payload);

        },

        *testAnsy({payload},{call,put}){
            const result = yield call(getthing)
        },






    },
    reducers:{
        codeSave(state,{payload}){
            return{
                code:payload
            }
        },

        isPage(state,{payload}){
            const {pageName} = payload

            return{
                ...state,
                pageName: pageName,

            }
        },

        parentPost(state,{payload}){
            console.log('reducers is gengxin!',payload)
            return{
                ...state,
                ...payload,
            }
        }

    }
}
