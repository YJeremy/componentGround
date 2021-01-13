import React from 'react';
import { connect } from 'dva';

// {code.dynamic.analysis.time.alm}

@connect(({ websocketTest }) => {
    const dynamic  = websocketTest.dynamic
    const initData = {
        part:0,
        description:'',
        state:0,
        timeAlm:0,
        timeCut:0,
        idle:0,
        offline:1,
        poweron:0,
        codrAbsolute:[],
    }
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
                if(!dynamic){
                    return <div></div>;
                }
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
                    { myLayout8(5) }
                </React.Fragment>
            )
        }

    }
}

export default WebsocketTest
