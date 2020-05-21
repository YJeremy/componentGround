import React from 'react';
import { flexV } from '@/utils/flex';
import { IoInOutTable } from './IoInOutTable';

const IoTable = props => {
  const byteNumber = 1;
  const columnsBefore8 = [];
  const columnsAfter8 = [];
  for (let i = 1; i <= 8; i += 1) {
    columnsBefore8.push(`第${i}字节`);
    columnsAfter8.push(`第${i + 8}字节`);
  }

  const { ioin } = props;
  const { ioout } = props;

  const ioinBefore8 = ioin.splice(0, 8);
  const iooutBefore8 = ioout.splice(0, 8);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        lineHeight: 2,
        padding: '10px 5px',
        fontSize: '17px',
        fontWeight: 'bold',
      }}
    >
      <div style={{ display: 'flex', ...flexV, flex: 1 }}>
        <p
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '5px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          字节号
        </p>
        {columnsBefore8.map((value, index) => (
          <p
            key={index}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '5px',
              paddingTop: '10px',
              paddingBottom: '10px',
              margin: '15px 0',
            }}
          >
            {value}
          </p>
        ))}
      </div>
      <IoInOutTable dataSource={ioinBefore8} type="in" />
      <IoInOutTable dataSource={ioinBefore8} />
      <div style={{ display: 'flex', ...flexV, flex: 1 }}>
        <p
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '5px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          字节号
        </p>
        {columnsAfter8.map((value, index) => (
          <p
            key={index}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '5px',
              paddingTop: '10px',
              paddingBottom: '10px',
              margin: '15px 0',
            }}
          >
            {value}
          </p>
        ))}
      </div>
      <IoInOutTable dataSource={ioin} type="in" />
      <IoInOutTable dataSource={ioin} />
    </div>
  );
};
export default IoTable;
