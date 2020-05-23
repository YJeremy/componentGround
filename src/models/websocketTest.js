import {getCNCcode } from '../services/customapi';
import { createWS2 } from '@/utils/createWS';

export default {
    namespace:'websocketTest',
    state:{
        dynamic:null,
        ws:[]
    },

    effects:{
        *websocket({payload},{call,put}){
            const {dispatch} = payload;
            const api = 'ws://127.0.0.1:11520/ws_array/dev1';
            const intervalCrossover2= 1000;
            const ws = new WebSocket(`${api}`);
            let now = Number(new Date());

            ws.addEventListener('open', () => {//在回调函数里的函数跳转，不能用put，改用dispatch
                  dispatch({
                    type: 'websocketTest/wsOpen',
                    payload: {
                        ws,
                    },
                });
            });

            const wsClose = () => {
                // 防止二次触发, 可能没用
                ws.removeEventListener('close', wsClose);
                // 出现错误/关闭, 关闭连接; 触发重渲染, 然后重连; 同时防止关闭了新的连接
                 dispatch({
                    type: 'websocketTest/wsClose',
                    payload: {
                        ws,
                    },
                });
            };

            ws.addEventListener('error', () => {
                ws.close();
            });

            ws.addEventListener('message', ({ data }) => {
                // slow down 每1秒一次信息
                if (Number(new Date()) - now < intervalCrossover2) {
                    return;
                }
                now = Number(new Date());
                const wsdata = JSON.parse(data);
                // 更新数据
                dispatch({
                    type: 'websocketTest/wsMsg',
                    payload: {
                        dynamic: wsdata,
                    },
                });
                });
            },
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
    },

    subscriptions:{

        /**一旦进入路径名带有 ‘table' 的路由，直接出发 websocket ；但是切换其他页面缺少关闭ws的手段，所以调用http好 */
        /* setup({dispatch,history}){
            history.listen(location =>{
                if (location.pathname.includes('table')){
                    dispatch({
                        type:'websocket',
                        payload:{dispatch:dispatch}
                    })
                }
            })
        }
        */
    }


}
