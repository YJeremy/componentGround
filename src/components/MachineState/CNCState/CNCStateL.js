import React from 'react';
import { Spin, message } from 'antd';
import { isNullOrUndefined, getPointToStr } from '@/utils/utils';
import { flexV, flexVW } from '@/utils/flex';

const CNCStateL = props => {
  const { axes, cord } = props;
  if (isNullOrUndefined(axes) || isNullOrUndefined(cord)) {
    return (
      <div style={{ width: '100%', height: '100%', margin: 'auto' }}>
        <Spin />
      </div>
    );
  }
  if (!Array.isArray(axes) || !Array.isArray(cord) || axes.length !== cord.length) {
    message.info(`轴号与轴数据不对应 ${JSON.stringify(axes)} ${JSON.stringify(cord)}`);
    return <div />;
  }

  return (
    <div style={{ ...flexV, ...flexVW, fontSize: 18, height: '170px' }}>
      {axes.map((elm, idx) => (
        <div key={`CNCStateL-${idx}`} style={{ lineHeight: 2, fontSize: '26px', width: '50%' }}>
          <span style={{ marginRight: 20 }}>{elm}</span>:
          <span style={{ marginLeft: 20 }}>{getPointToStr(cord[idx], 5)}</span>
        </div>
      ))}
    </div>
  );
};
export default CNCStateL;
