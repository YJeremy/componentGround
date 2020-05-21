import React from 'react';
import { flexH, flexHW } from '@/utils/flex';
import { getPointToStr } from '@/utils/utils';

const Coordinate = props => {
  const { absoluteAxes, absoluteCord } = props;
  return (
    <div
      style={{
        minHeight: '100px',
        width: '100%',
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
        }}
      >
        <span>绝对坐标</span>
      </div>
      <div
        style={{
          lineHeight: 3,
          background: '#ffffff',
          borderRadius: '5px',
          padding: '.5em auto .2em',
          fontSize: '16px',
          fontWeight: 'bold',
          ...flexH,
          ...flexHW,
        }}
      >
        {Array.isArray(absoluteAxes)
          ? absoluteAxes.map((elm, idx) => [
              <div key={`CNCState-Coordinate-${idx}`} style={{ flex: 1 }}>
                <div style={{ textAlign: 'center', minWidth: '100px', padding: '0 auto' }}>
                  {elm}
                </div>
                <div style={{ textAlign: 'center' }}>{getPointToStr(absoluteCord[idx], 5)}</div>
              </div>,
            ])
          : []}
      </div>
    </div>
  );
};
export default Coordinate;
