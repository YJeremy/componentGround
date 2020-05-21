import React, { Component } from 'react';
import { flexH, flexV } from '@/utils/flex';
import { getXYZWPR } from '../utils';
import IoTable from './IoTable';

export default class JointAndCartes extends Component {
  render() {
    const { cartes, joint } = this.props;

    return (
      <div style={{ ...flexH, width: '98%', height: '100%' }}>
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
            轴角度
          </p>
          <div
            style={{
              ...flexV,
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: '5px',
              justifyContent: 'center',
              textAlign: 'left',
              lineHeight: 2,
              fontSize: '17px',
              fontWeight: 'bold',
            }}
          >
            <ul style={{ ...flexV, padding: 0, margin: 0 }}>
              {!Array.isArray(joint)
                ? '数据接收异常,轴角度无法正确显示'
                : joint.map((e, i) => (
                    <li
                      style={{
                        flex: 1,
                        padding: '10px 18px',
                      }}
                    >
                      {`J${i + 1}轴角度: ${e.toFixed(2)}`}
                    </li>
                  ))}
            </ul>
          </div>
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
            轴坐标
          </p>
          <div
            style={{
              ...flexV,
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: '5px',
              justifyContent: 'center',
              textAlign: 'left',
              lineHeight: 2,
              fontSize: '17px',
              fontWeight: 'bold',
            }}
          >
            <ul style={{ ...flexV, padding: 0 }}>
              {!Array.isArray(cartes)
                ? '数据接收异常,轴坐标无法正确显示'
                : cartes.map((e, i) => (
                    <li
                      style={{
                        flex: 1,
                        padding: '10px 18px',
                      }}
                    >
                      {`${getXYZWPR(i)}坐标值: ${e.toFixed(2)}`}
                    </li>
                  ))}
            </ul>
          </div>
        </div>
        <div style={{ flex: 3 }}>
          <IoTable {...this.props} />
        </div>
      </div>
    );
  }
}
