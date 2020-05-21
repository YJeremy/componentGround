import React from 'react';
import { Tooltip } from 'antd';
import { deviceState2Img } from '@/utils/machine';

const RobotStateMessage = props => {
  const { name, model, dynamic, state } = props;
  // const cutTimeStamp = Math.floor(getRobotLaunchState(state, name)['3'] / 1000);
  const cutTimeStamp = dynamic.machineTime[3];
  const cutTime = {};
  Reflect.set(cutTime, 'h', Math.floor(cutTimeStamp / 3600));
  Reflect.set(cutTime, 'm', Math.floor((cutTimeStamp % 3600) / 60));
  Reflect.set(cutTime, 's', Math.floor(cutTimeStamp % 60));

  const renderText = deviceState2Img('robotlink', state);
  return (
    <div
      style={{
        minHeight: '260px',
        width: '100%',
        height: '100%',
        padding: '0 .3em',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '5px',
          fontSize: '20px',
          fontWeight: 'bold',
          margin: '.5em auto .2em',
          textAlign: 'center',
          lineHeight: '2',
        }}
      >
        <span>设备状态信息</span>
      </div>
      <div
        style={{
          minHeight: '220px',
          fontSize: '17px',
          background: '#ffffff',
          borderRadius: '5px',
        }}
      >
        <div style={{ width: '50%', float: 'left', fontWeight: 'bold' }}>
          <div
            style={{
              marginLeft: '5px',
              minHeight: '70px',
              padding: '1.3em 0',
              textAlign: 'center',
            }}
          >
            <span>设备编号:</span>
            <span style={{ marginLeft: '10px' }}>{name}</span>
          </div>
          <div
            style={{
              marginLeft: '5px',
              minHeight: '70px',
              padding: '1.3em 0',
              textAlign: 'center',
            }}
          >
            <span>设备型号:</span>
            <span style={{ marginLeft: '10px' }}>{model}</span>
          </div>
          <div
            style={{
              marginLeft: '5px',
              minHeight: '70px',
              padding: '1.3em 0',
              textAlign: 'center',
            }}
          >
            <span>当天运行时长:</span>
            <span style={{ marginLeft: '10px' }}>{`${cutTime.h}:${cutTime.m}:${cutTime.s}`}</span>
          </div>
        </div>
        <div style={{ minHeight: '220px', width: '50%', float: 'left' }}>
          <Tooltip placement="rightTop" title={renderText.tooltip}>
            <img
              style={{
                margin: 'auto',
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '220px',
                borderRadius: '5px',
                float: 'right',
              }}
              src={`/img/${renderText.img}`}
              alt="设备状态"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default RobotStateMessage;

// <div style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", backgroundImage: `url(/img/${renderText.img})` }}/>
