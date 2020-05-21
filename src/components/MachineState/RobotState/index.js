import React, { Component } from 'react';
import { Spin, message } from 'antd';
import { flexH, flexHC, flexV } from '@/utils/flex';
import { createWS4Robot } from '@/utils/createWS';
import { isNullOrUndefined } from '@/utils/utils';
import RobotStateMessage from './RobotStateMessage';
import StartingSituation from '../CNCState/StartingSituation';
import JointAndCartes from './JointAndCartes';
import ModeAndSpeed from './ModeAndSpdrate';
import Alarms from './Alarms';

let loading = true;

export default class RobotState extends Component {
    componentDidMount(){
    const {ws,dispatch,style,flexH,flexHC} = this.props
    if (!ws) {
      createWS4Robot(dispatch);
      return (
        <div style={{ ...style, ...flexH, ...flexHC, marginTop: '100px' }}>
          机器人读取中
          <Spin style={{ flex: 1 }} size="large" />
        </div>
      );
    }
    }
  onTargetPartChange = value => {
    const { dev, dispatch } = this.props;
    const numValue = parseInt(value, 10);
    dispatch({
      type: 'machine/setTargetPart',
      payload: {
        dev,
        value: numValue,
      },
    });
  };

  render() {
    // 左侧子路由的标签
    const {
      ws,
      statics,
      // rb的dynamic数据
      machine,
      style,
      dispatch,
      Graph,
    } = this.props;

    // 正常渲染
    //const { Graph } = this.props;
    const dynamic = machine;

    if (isNullOrUndefined(dynamic)) {
      // message.loading('实时数据读取中...', 1);
      // return <div style={{ ...style, fontSize: 20 }}>Websocket 数据读取中...</div>;
      return <div style={{ ...style,  fontSize:'2.5em',lineHeight: 2, marginLeft: 28, marginTop: 34 }}>无效的设备</div>;
    }
    if (loading === true) {
      message.success('实时数据读取成功!', 0.1);
      loading = false;
    }

    /* if (isNullOrUndefined(staticModel)) {
      dispatch({
        type: 'staticModel/getOneStatic',
        payload: {
          ...page,
          dev,
        },
      });
      return (
        <div style={{ ...style, ...flexH, ...flexHC, marginTop: '100px' }}>
          <Spin style={{ flex: 1 }} size="large" /> <div />
        </div>
      );
    } */

    const { name: rbName, model: rbModel } = statics.mach;
    // const { /* state, */ mode, time, parts, analysis, override } = dynamic;

    // const absoluteAxes = staticModel.axes.names.absolute;
    // const absoluteCord = dynamic.cord.absolute;
    //
    // const cutTime = timeFormat(time.cut);
    // const runTime = timeFormat(time.run);
    //
    // const { state: anaState, time: anaTime } = analysis;

    return (
      <div style={{ ...style, ...flexV, padding: 12 }}>
        <div
          style={{
            ...flexH,
          }}
        >
          <div style={{ minWidth: '318px', flex: 5, ...flexV }}>
            <div style={{ flex: 0 }}>
              <RobotStateMessage
                name={rbName}
                model={rbModel}
                state={dynamic.state.value}
                dynamic={dynamic}
              />
            </div>
            <div style={{ flex: 6, ...flexH }}>
              <div style={{ flex: 6, ...flexV }}>
                <div style={{ flex: 5 }}>
                  <StartingSituation Graph={Graph} />
                </div>
                <div style={{ flex: 3 }}>
                  <ModeAndSpeed {...dynamic} />
                </div>
              </div>
              <div style={{ flex: 4, ...flexV }}>
                <Alarms {...dynamic} />
              </div>
            </div>
          </div>
          <div style={{ flex: 7, paddingBottom: 25 }}>
            <JointAndCartes {...dynamic} />
          </div>
        </div>
      </div>
    );
  }
}
