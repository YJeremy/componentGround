import { flexV } from '@/utils/flex';

export const IoInOutTable = props => {
  const { dataSource, type } = props;

  return (
    <div style={{ display: 'flex', ...flexV, flex: 1 }}>
      <p
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '5px',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      >
        {type === 'in' ? '输入' : '输出'}
      </p>
      {dataSource.map((value, index) => {
        const array = value.toString(2).split('');
        for (let i = array.length; i < 8; i++) {
          array.unshift('0');
        }
        return (
          <ul
            key={index}
            style={{
              display: 'flex',
              backgroundColor: '#dddddd',
              borderRadius: '5px',
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingLeft: 10,
              justifyContent: 'center',
              margin: '15px 0',
            }}
          >
            {array.map((item, i) => {
              if (item === '1') {
                return (
                  <li
                    key={i}
                    style={{
                      listStyleType: 'disc',
                      flex: 1,
                      transform: 'scale(1.5) translate(18px)',
                    }}
                  />
                );
              }
              if (item === '0') {
                return (
                  <li
                    key={i}
                    style={{
                      listStyleType: 'circle',
                      flex: 1,
                      transform: 'scale(1.5) translate(18px)',
                    }}
                  />
                );
              }
            })}
          </ul>
        );
      })}
    </div>
  );
};
