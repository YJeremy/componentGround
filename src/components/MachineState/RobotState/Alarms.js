import React, { Component } from 'react';
import { flexH, flexV } from '@/utils/flex';
import { getXYZWPR } from '../utils';

export default class Alarms extends Component {
  render() {
    const { alarms } = this.props;
    const alarmsLen = Array.isArray(alarms) ? alarms.length : 0;
    const extrAlarmsLen = 8 - alarmsLen;
    const extrAlarms = [];
    for (let i = 0; i < extrAlarmsLen; i += 1) {
      extrAlarms.push(1);
    }

    return (
      <div style={{ ...flexH, width: '100%', height: '100%' }}>
        <div style={{ flex: 1, ...flexV, padding: '0 .3em' }}>
          <p
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              borderRadius: '5px',
              textAlign: 'center',
              lineHeight: '2',
              fontSize: '20px',
              fontWeight: 'bold',
              margin: '0.5em auto 0.2em',
            }}
          >
            报警
          </p>
          <div
            style={{
              ...flexV,
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: '5px',
              justifyContent: 'center',
              lineHeight: 2,
              fontSize: '17px',
              fontWeight: 'bold',
            }}
          >
            <ul style={{ ...flexV, textAlign: 'left', padding: 0, margin: 0 }}>
              {!Array.isArray(alarms)
                ? ''
                : alarms.map((e, i) => (
                    <li
                      style={{
                        flex: 1,
                        lineHeight: 2,
                        padding: '10px 35px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                      }}
                    >
                      {`历史报警号${i + 1}: ${e}`}
                    </li>
                  ))}
              {extrAlarms.map((e, i) => (
                <li
                  style={{
                    flex: 1,
                    lineHeight: 2,
                    padding: '10px 35px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                  }}
                >
                  {`历史报警号${i + 1 + alarmsLen}:   ------`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
