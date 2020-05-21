import React from 'react';

const CNCStateR = props => {
  const { cutTime, runTime } = props;
  return [
    <div key="CNCStateRT-0">
      <span style={{ marginRight: '20px' }}>切削时间:</span>
      <span>{`${cutTime.d} 天- ${cutTime.h}:${cutTime.m}:${cutTime.s}`}</span>
    </div>,
    <div key="CNCStateRT-1">
      <span style={{ marginRight: '20px' }}>运行时间:</span>
      <span>{`${runTime.d} 天- ${runTime.h}:${runTime.m}:${runTime.s}`}</span>
    </div>,
  ];
};
export default CNCStateR;
