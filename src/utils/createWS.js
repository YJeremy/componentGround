import { WSProtocol, SourceIP} from './dynamic-global';
import { getListRobot } from '@/services/customapi';


const intervalCrossover = 1000;
/**
 *创建websocket 结合调用models的 reducers
 *
 * @param {object} linkAddr: 字段ws地址， api:地址设备号，如dev1
 * @param {object} type :cnclink or robotlink; index CNC数据表格序号
 * @param {function} dispatch ：dva的dispatch函数
 */
export const createWS = ({ linkAddr, api }, { type, index }, dispatch) => {
  const ws = new WebSocket(`${WSProtocol}${linkAddr}/ws/${api}`);
  let now = Number(new Date());

  ws.addEventListener('open', () => {
    // TAG: 保存该连接, 而并没有关闭其他连接
    dispatch({
      type: 'machine/updateWS',
      payload: {
        type,
        index,
        ws,
      },
    });
  });

  const wsClose = () => {
    // 防止二次触发, 可能没用
    ws.removeEventListener('close', wsClose);
    // 出现错误/关闭, 关闭连接; 触发重渲染, 然后重连; 同时防止关闭了新的连接
    dispatch({
      type: 'machine/closeWS',
      payload: {
        type,
        index,
        ws,
      },
    });
  };

  //ws.addEventListener('close', wsClose); //因为后面加了延时，会出现把第一台关闭了的情况，所以注释这里
  ws.addEventListener('error', () => {
    ws.close();
  });
  ws.addEventListener('message', ({ data }) => {
    // slow down 每1秒一次信息
    if (Number(new Date()) - now < intervalCrossover) {
      return;
    }
    now = Number(new Date());

    const wsdata = JSON.parse(data);
    // 更新数据
    dispatch({
      type: 'machine/updateDynamic',
      payload: {
        type,
        index,
        dynamic: wsdata[0],
      },
    });
  });
};


const intervalCrossover2= 1000;
export const createWS2 = (api, dispatch) => {
    const ws = new WebSocket(`${api}`);
    let now = Number(new Date());

    ws.addEventListener('open', () => {
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

    //ws.addEventListener('close', wsClose); //因为后面加了延时，会出现把第一台关闭了的情况，所以注释这里
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
};


export const createWS4CNC = dispatch =>{
    const ws = new WebSocket(`ws://${cnclinkAddr}/ws`);
    let now = Number(new Date());

    //
    ws.addEventListener('open',()=>{
        dispatch({
            type: '',
            payload: {
                ws:ws,
            }
        })
    })

    // 出现关闭链接的情况是 后端重启或者断开时
    ws.addEventListener('close',() =>{

    })


}
