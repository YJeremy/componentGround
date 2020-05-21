import React from 'react';
import { connect } from 'dva';

const intervalCrossover = 1000;

export const createWS = (api, dispatch) => {
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
        if (Number(new Date()) - now < intervalCrossover) {
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

// {code.dynamic.analysis.time.alm}

@connect(({ websocketTest }) => {
    const dynamic  = websocketTest.dynamic
    return {dynamic}
})
class WebsocketTest extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        //createWS('ws://127.0.0.1:11520/ws_array/dev1', dispatch)
        //createWS('ws://127.0.0.1:11520/ws/dev1', dispatch)
    }

    /**
     * data[i][0].analysis.time.cut
     *
     * code.dynamic[0].analysis.time.cut
     */


    render() {
        const { dynamic } = this.props;
        if (!dynamic) {
            return <div>no value!</div>
        } else {
            //使用JSX写法，返回的值是react dom
            const myLayout = (
                <div>
                    {
                        dynamic.map((data, i) => (
                            <div key={`${i}`}>
                                <span>cuttime{`${i}`}: {data[0].analysis.time.cut}</span>
                                <span>  X{`${i}`}: {data[0].cord.absolute[0]}</span>
                                <span>  Y{`${i}`}: {data[0].cord.absolute[1]}</span>
                                <span>today{`${i}`}: {data[0].analysis.part.today}</span>
                            </div>
                        ))
                    }
                </div>
            );
            //JSX里不能使用条件语句，使用for则创建函数，函数返回react DOM，使用时执行函数（）
            const myLayout8 = (item) => {
                let res = [];
                for (let i = 0; i < item; i++) {
                    res.push(
                        <div key={`${i}`}>
                            <span>cuttime{`${i}`}: {dynamic[i][0].analysis.time.cut}</span>
                            <span>  X{`${i}`}: {dynamic[i][0].cord.absolute[0]}</span>
                            <span>  Y{`${i}`}: {dynamic[i][0].cord.absolute[1]}</span>
                            <span>today{`${i}`}: {dynamic[i][0].analysis.part.today}</span>
                        </div>
                    )

                }
                return res
            }

            //console.log(myLayout8)

            return (
                <React.Fragment>
                    {`hi 1个ws连接， 由传数据量是${dynamic.length}台设备的信息, 100ms推送`}
                    <div>
                        cuttime : {dynamic[0][0].analysis.time.cut}
                    </div>
                    {/*  {myLayout} */}
                    {myLayout8(31)}
                </React.Fragment>
            )
        }

    }
}

export default WebsocketTest
