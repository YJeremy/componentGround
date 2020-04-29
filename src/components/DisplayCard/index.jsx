import React from 'react';
import { connect } from 'dva';
import { machineModel } from './utils';
import { Card } from 'antd';

const dispalyCard = (props) => {
    const { type, gcodeName,cut,idle,almtime,poweron,cncprogram,gcodeLine } = props
    let arr = [...cncprogram];
    const str= arr.join('/')

    return (
        <>
            <h1> 示例展示</h1>
            <Card title="加工时间信息" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <p>运行时间: {cut}</p>
                <p>离线时间: {poweron}</p>
                <p>报警时间: {almtime}</p>
                <p>待机时间: {idle}</p>
            </Card>

             <Card title="CNC加工程序内容" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <p>{str}</p>
                <p>代码执行：{gcodeLine}</p>
            </Card>
        </>
    )
}

export default connect(machineModel)(dispalyCard)
