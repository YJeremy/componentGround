//import router from 'umi/router';
import { isNullOrUndefined } from '@/utils/utils';
import { createWS } from '@/utils/createWS';
import { getListCNC } from '../services/customapi';
import { Protocol, cnclinkAddr } from '../utils/dynamic-global';
//import dispatch from 'dva';

export default {
    namespace: 'machine',
    state: {
        page: {
            type: 'cnclink',
            index: 2,
        },
        cnclink: [],//[]
    },

    effects: {
        *initAllMachine({ payload }, { call, put }) {
            const { server, devs } = yield call(getListCNC);//获取cnclink所有配置数据
            //这里先put，初始化cnclink[]，防止创建ws时index超出数组越界
            //后面cnclink、Robotlinkws创建ws里 已带dispatch调用到 reducers里修改 state的值
            const {dispatch} = payload;
            yield put({
                type: 'initBothList',
                payload: {
                    cnclink: devs,
                }
            })

             if (devs.length != 0) {
                //创建各台设备的ws
                devs.forEach((elm, index) => {
                    const timeout = (index * 100) % 1000;
                    window.setTimeout( //过多台ws 也会占用卡顿
                        () =>
                            createWS(
                                { linkAddr: cnclinkAddr, api:'dev1'},
                                { type: 'cnclink', index },
                                dispatch,
                            ),
                        timeout
                    );
                })
            }

        },

        *wstest({payload},{call,put}){


        }
    },

    reducers: {
        initBothList(state, { payload }) {
            const { cnclink, robotlink } = payload;
            return {
                ...state,
                cnclink: [...cnclink],
                robotlink: { ...robotlink },
            };
        },

        initCNCPage(state, { payload }) {
            return {
                ...state,
                page: {
                    ...payload
                }
            }
        },

        // 更新指定类型的数据表里的ws对象,关闭过去的ws
        // 与 closeWS 配套使用
        updateWS(state, { payload }) {
            const { type, index, ws } = payload;
            state[type][index].ws instanceof WebSocket ? state[type][index].ws.close() : null;
            state[type][index].ws = ws;
            return { ...state };
        },

        // 关闭指定 websocket
        // 与 updateWS 配套使用
        closeWS(state, { payload }) {
            const { type, index } = payload;
            const machine = state[type][index];
            machine.ws instanceof WebSocket ? machine.ws.close() : null;
            state[type][index] = { ...machine };
            return { ...state };
        },

        // 更新 dynamic
        updateDynamic(state, { payload }) {
            const { type, index, dynamic } = payload;
            state[type][index].dynamic = dynamic;
            return { ...state };
        },

    },
    subscriptions: {

    }

};
