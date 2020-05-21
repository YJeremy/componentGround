import React from 'react';
import EditableItem from '@/components/EditableItem';

const CNCStateRT = props => {
  const { parts, onTargetPartChange } = props;
  return [
    <div key="CNCStateRT-0" style={{ float: 'left', width: '50%' }}>
      <div>
        <span>目标件数:</span>
      </div>
      <div>
        <span>已完成件数:</span>
      </div>
    </div>,
    <div key="CNCStateRT-1" style={{ float: 'left', width: '50%' }}>
      <div>
        <span style={{ width: '50%', marginTop: '5px', float: 'left' }}>
          <EditableItem
            iconStyle={{ fontSize: 18 }}
            value={parts.target}
            onChange={onTargetPartChange}
          />
        </span>
        <span style={{ marginLeft: '10px' }}>件</span>
      </div>
      <div>
        <div style={{ width: '50%', float: 'left' }}>
          <span>{parts.cutted}</span>
        </div>
        <span style={{ marginLeft: '10px' }}>件</span>
      </div>
    </div>,
  ];
};
export default CNCStateRT;
