import React from 'react';
import { flexH, flexHC, flexV } from '@/utils/flex';
import { getSpdrate } from '../utils';

const ModeAndSpdrate = props => {
  const { mode, enabled } = props;
  const modeValue = mode.value;
  let modeName = '读取模式失败';
  if (modeValue === 1) {
    modeName = '示教模式';
  } else if (modeValue === 2) {
    modeName = '再现模式';
  } else if (modeValue === 3) {
    modeName = '远程模式';
  }

  const enabledValue = enabled.value;
  let enabledName = '读取使能失败';
  if (enabledValue === 1) {
    enabledName = '已使能';
  } else if (enabledValue === 0) {
    enabledName = '未使能';
  }

  return (
    <div style={{ ...flexH, width: '100%', height: '100%' }}>
      <div style={{ ...flexV, flex: 1, marginRight: '1px' }}>
        <p
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '5px',
            textAlign: 'center',
            lineHeight: '3',
            fontSize: '20px',
            fontWeight: 'bold',
            margin: '0.5em auto 0.2em',
          }}
        >
          机器人模式:
        </p>
        <p
          style={{
            flex: 2,
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '5px',
            textAlign: 'center',
            lineHeight: '4',
            fontSize: '25px',
            fontWeight: 'bold',
            marginBottom: '45px',
          }}
        >
          {modeName}
        </p>
      </div>
      <div style={{ ...flexV, flex: 1 }}>
        <p
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '5px',
            textAlign: 'center',
            lineHeight: '3',
            fontSize: '20px',
            fontWeight: 'bold',
            margin: '0.5em auto 0.2em',
          }}
        >
          使能状态:
        </p>
        <p
          style={{
            flex: 2,
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '5px',
            textAlign: 'center',
            lineHeight: '4',
            fontSize: '25px',
            fontWeight: 'bold',
            marginBottom: '45px',
          }}
        >
          {enabledName}
        </p>
      </div>
    </div>
  );
};
export default ModeAndSpdrate;
