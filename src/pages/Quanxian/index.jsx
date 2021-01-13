
import { Form, Input, Button, Select } from 'antd';
import React from 'react';
import Authorized from '@/components/Authorized/Authorized';
import { setAuthority } from '@/utils/authority';

setAuthority(['admin','guest']);
// 可设置为 ‘admin'
// 当前权限还保存在localstorge

const Demo = () => {
  return (
    <div>
      <Authorized authority={['admin']}>权限是管理员</Authorized>
      <Authorized authority={['guest']}>权限是普通用户</Authorized>
    </div>
  );
};

export default Demo;
