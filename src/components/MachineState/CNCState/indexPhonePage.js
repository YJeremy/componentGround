import React, { Component } from 'react';
import { Spin, message } from 'antd';
import { flexH, flexHC, flexV } from '@/utils/flex';
import { cnclinkAddr } from '@/utils/dynamic-global';
import { createWS } from '@/utils/createWS';
import { isNullOrUndefined } from '@/utils/utils';
import CNCStateMessage from './CNCStateMessage';
import CNCModelState from './CNCModelState';
import StartingSituation from './StartingSituation';
import Magnification from './Magnification';
import Coordinate from './Coordinate';
import { history } from 'umi';

import CNCGraph from '@/components/MachineState/CNCGraph';

const timeFormat = sTime => {
    if (typeof sTime !== 'number') {
        return ({
            d: -1,
            h: -1,
            m: -1,
            s: -1,
        })
    }
    if (!isNaN(sTime)) {
        return ({
            d: Math.floor(sTime / 3600 / 24),//天数
            h: Math.floor((sTime / 3600) % 24),//超过24时再累加
            m: Math.floor((sTime / 60) % 60),
            s: Math.floor(sTime % 60),
        })
    }
};

let loading = true;
const flexPhoneItem = { flex: 1 };
class CNCState extends Component {
    componentDidMount() {
        const { dispatch, type, index, dev, staticModel } = this.props;
        dispatch({
            type: 'staticModel/getOneStatic',
            payload: {
                type,
                index,
                dev,
            },
        });
    }

    componentDidUpdate() {
        const { dispatch, type, index, dev, staticModel } = this.props;
        if (!staticModel) {
            dispatch({
                type: 'staticModel/getOneStatic',
                payload: {
                    type: type,
                    index: index,
                    dev,
                },
            });
        }
    }


    render() {
        const {
            type,
            index,
            dev,
            machine,
    /* alarm, */ CNCAlarmTable: AlarmTable,
            staticModel,
            style,
            dispatch,
            absoluteAxes,
            cncName,
            cncModel,
            cncSn,
            mode,
            cutTime,
            runTime,
            dailyCutTime,
            anaState,
            override,
            absoluteCord,
            Graph,
        } = this.props;

        if (isNullOrUndefined(staticModel)) {
            return (
                <div style={{ fontSize: '2.5em', lineHeight: 2, marginLeft: 28, marginTop: 34 }}>
                    无效的设备
               <Spin style={{ flex: 1 }} size="large" />
                </div>
            );
        }

        if (!machine.dynamic) {
            return (
                <div style={{ fontSize: '2.5em', lineHeight: 2, marginLeft: 28, marginTop: 34 }}>
                    设备读取中
               <Spin style={{ flex: 1 }} size="large" />
                </div>
            )
        }

        const timeRun = timeFormat(runTime);
        const timeCut = timeFormat(cutTime);
        const timeDaily = timeFormat(dailyCutTime);

        return (
            <div
                style={{
                    width:'100%',
                    //...style,
                    padding: 12,
                    // color: anaState.state == 1 ? '#CCCCCC' : 'rgba(0, 0, 0, 0.65)',
                    ...flexV,
                }}
            >
                <div style={{ flex: 1 }}>
                    <CNCStateMessage sn={cncSn} model={cncModel} cutTime={timeCut} runTime={timeRun} dailyCutTime={timeDaily} state={anaState} />
                </div>

                <div style={{ flex: 1 }}>
                    <StartingSituation Graph={Graph} />
                </div>
                <div style={{ flex: 1 }}>
                    <Magnification override={override} />
                </div>

                <div style={{ flex: 1 }}>
                    <Coordinate absoluteAxes={absoluteAxes} absoluteCord={absoluteCord} />
                </div>

                <div style={{ flex: 1 }}>{AlarmTable}</div>
            </div>
        );
    }
}

export default CNCState;
