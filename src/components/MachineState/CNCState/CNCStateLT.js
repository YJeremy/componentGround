import React, { Component } from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Tooltip } from 'antd';

const styles = {
  mode: {
    marginLeft: '10px',
    marginRight: '5px',
  },
};

export default class CNCStateLT extends Component {
  render() {
    const { cncName } = this.props;
    const { modeText, mode } = this.props;
    const { tooltip, icon, state } = this.props;
    return [
      <div key="CNCStateLT-0" style={{ width: '50%', float: 'left' }}>
        <div
          style={{
            fontSize: 28,
            lineHeight: 2,
          }}
        >
          <span style={{ margin: 'auto', fontSize: 28 }}>{cncName}</span>
          <span style={{ marginLeft: '8px', fontSize: 28 }}>
            <Tooltip {...tooltip[state]}>
              <LegacyIcon {...icon[state]} />
            </Tooltip>
          </span>
        </div>
      </div>,
      <div key="CNCStateLT-1">
        <div
          style={{
            fontSize: 28,
            lineHeight: 2,
          }}
        >
          <span style={styles.mode}>{modeText[mode].text}</span>
          <span style={styles.mode}>模式</span>
        </div>
      </div>,
    ];
  }
}
