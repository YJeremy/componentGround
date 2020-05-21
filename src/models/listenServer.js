import { message } from 'antd';
import {
    listenWorkshop,
    getListRobot
} from '@/services/customapi';
import { isNullOrUndefined } from '@/utils/utils';
import { history } from 'umi';

export default {

    namespace: 'listenServer',

    state: {
        workshopState: true,
        cnclinkState: true,
        CNCserver: {
            ws: null,
            server: {
                state: 0,
            },
            process: {
                finished: 0,
            },
            devs: [], // {bconnect: ture}
        },
    },

    effects: {
        *getAPI({ }, { call }) {
            const list = yield call(getListRobot);
            //console.log('check port 3000 OK!', list)
        },

        *comebackPage({ }, { call, put }) {
            console.log('listening port3000')
            const list = yield call(listenWorkshop);

            if (list instanceof Array) {
                console.log('list2',list);
                //访问成功则通过改URL方式跳转到首页；是否可以启动浏览器缓存垃圾回收？
                window.location = window.location.origin;
            }
        },
    },

    reducers:{
        updateWS4CNCserver(state, { payload }) {
            const { ws } = payload;
            const machine = state.CNCserver;
            machine.ws instanceof WebSocket ? machine.ws.close() : '';
            machine.ws = ws;
            state.CNCserver = { ...machine };
            return {
                ...state,
            };
        },

        updateWSdate4CNCserver(state, { payload }) {
            const { dynamic } = payload;
            const old = state.CNCserver;
            state.CNCserver = { ...old, ...dynamic };
            return {
                ...state,
            };
        },

    }


}
