import React from 'react';
import bgi from './cnc-gray.jpeg'
import { Form, Input, Button, Select } from 'antd';
import Authorized from '@/components/Authorized/Authorized';
import { setAuthority } from '@/utils/authority';

// window.parent.postMessage('我是mary页！','*')

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


const SayHi =()=>{
    return (
    <div>

      <Authorized authority={['admin']}>
             <h1>从public的路径插入，可用$括号</h1>
        <img src={`/img/cnc-gray.jpeg`}/>
        <div style={{backgroundImage:`url(${bgi})`,margin:10,border:'3px solid blue'}}>
        背景图文字1<img src={bgi} style={{border:'3px solid yellow'}}/> 图片文字2
        </div>
       </Authorized>

    </div>
    )
}
export default SayHi
