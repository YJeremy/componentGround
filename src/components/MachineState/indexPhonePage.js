import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import { machineModel } from './utils';
import { flexHC, flexH } from '@/utils/flex';
import CNCState from '@/components/MachineState/CNCState/indexPhonePage';
import CNCGraph from '@/components/MachineState/CNCGraph';
import RobotState from '@/components/MachineState/RobotState/index';
import RobotGraph from '@/components/MachineState/RobotGraph';

const MachineState = props => {
  const { type, style } = props;
  if (type === 'cnclink') {
    return <CNCState {...props} Graph={<CNCGraph />} />;
  }
  if (type === 'robotlink') {
    return <RobotState {...props} Graph={<RobotGraph />}/>;
  }

  return (
    <div style={{ ...style, ...flexH, ...flexHC, marginTop: '100px' }}>
      <Spin style={{ flex: 1 }} size="large" />
    </div>
  );

}

export default connect(machineModel)(MachineState);
