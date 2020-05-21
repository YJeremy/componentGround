import React, { Component } from 'react';
import { Table, Spin } from 'antd';
import { isNullOrUndefined } from '@/utils/utils';
import columns from './columns';

const AlarmList = props => {
  const { list, pagination = {},isMobile } = props;
  if (isNullOrUndefined(list)) {
    return (
      <div style={{ padding: '1em' }}>
        <Spin size="large" />
      </div>
    );
  }
  if(isMobile){
   return (
    <Table
      bodyStyle={{ fontSize: '16px' }}
      pagination={pagination}
      columns={columns}
      dataSource={list}
      style={{ margin: '5px 0' }}
      scroll={{ y: 530 }}
      rowkey = {record =>`用作唯一标识${list.id}`}
    />
  );
  }

  return (
    <Table
      bodyStyle={{ fontSize: '18px' }}
      pagination={pagination}
      columns={columns}
      dataSource={list}
      style={{ margin: '20px 0' }}
      scroll={{ y: 530 }}
      rowkey = {record =>`用作唯一标识${list.id}`}
    />
  );
};
export default AlarmList;
