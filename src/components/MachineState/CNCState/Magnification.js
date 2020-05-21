import React from 'react';

const Magnification = props => {
  const {
    override: { feed, rappid, jog, mpg },
  } = props;
  return (
    <div
      style={{
        minHeight: '300px',
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
          lineHeight: '2',
        }}
      >
        <span>倍率</span>
      </div>
      <div
        style={{
          height: '250px',
          background: '#ffffff',
          borderRadius: '5px',
          padding: '.5em auto .2em',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        <div
          style={{
            marginLeft: '5px',
            minHeight: '60px',
            padding: '1.1em 0',
            textAlign: 'center',
          }}
        >
          <span>进给倍率:</span>
          <span style={{ marginLeft: '10px' }}>{feed} %</span>
        </div>
        <div
          style={{
            marginLeft: '5px',
            minHeight: '60px',
            padding: '1.1em 0',
            textAlign: 'center',
          }}
        >
          <span>手动倍率:</span>
          <span style={{ marginLeft: '10px' }}>{jog} %</span>
        </div>
        <div
          style={{
            marginLeft: '5px',
            minHeight: '60px',
            padding: '1.1em 0',
            textAlign: 'center',
          }}
        >
          <span>快速倍率:</span>
          <span style={{ marginLeft: '10px' }}>{rappid} %</span>
        </div>
        <div
          style={{
            marginLeft: '5px',
            minHeight: '60px',
            padding: '1.1em 0',
            textAlign: 'center',
          }}
        >
          <span>手轮倍率:</span>
          <span style={{ marginLeft: '10px' }}>{mpg}</span>
        </div>
      </div>
    </div>
  );
};
export default Magnification;
