
import React from 'react';
import { Tooltip, Button, Statistic,Row,Col } from 'antd';
import { deviceState2Img } from '@/utils/machine';

const CNCModelState = (props) => {

    const { sn, model, cutTime, runTime, dailyCutTime, state } = props;
    const renderText = deviceState2Img('cnclink', state.state);
    return (
        <div
         style={{
                minHeight: '260px',
                width: '100%',
                padding: '0 .3em',
            }}
        >
            <div style={{width:'50%',float:'left'}}>
            <Descriptions title="设备状态信息" bordered >
                <Descriptions.Item label="设备编号" span={3}>{sn}</Descriptions.Item>
                <Descriptions.Item label="设备型号" span={3}>{model}</Descriptions.Item>
                <Descriptions.Item label="历史加工" span={3}>
                    {runTime.d >= 1 ? (`${runTime.d} 天 `) : null}
                    {runTime.h > 1 ? (`${runTime.h} 小时 `) : null}
                    {runTime.m > 1 ? (`${runTime.m} 分 `) : null}
                    {runTime.d >= 1 ? null : `${runTime.s} 秒`}
                </Descriptions.Item>
                <Descriptions.Item label="开机加工" span={3}>
                    {cutTime.d >= 1 ? (`${cutTime.d} 天 `) : null}
                    {cutTime.h > 1 ? (`${cutTime.h} 小时 `) : null}
                    {cutTime.m > 1 ? (`${cutTime.m} 分 `) : null}
                    {cutTime.d >= 1 ? null : `${cutTime.s} 秒`}
                </Descriptions.Item>
                <Descriptions.Item label="今天加工" span={3}>
                    {dailyCutTime.d >= 1 ? (`${dailyCutTime.d} 天 `) : null}
                    {dailyCutTime.h > 1 ? (`${dailyCutTime.h} 小时 `) : null}
                    {dailyCutTime.m > 1 ? (`${dailyCutTime.m} 分 `) : null}
                    {dailyCutTime.d >= 1 ? null : (`${dailyCutTime.s} 秒`)}
                </Descriptions.Item>
            </Descriptions>
            </div>
            <div style={{ minHeight: '220px', width: '50%', float: 'left' }}>
                <Tooltip placement="rightTop" title={renderText.tooltip}>
                    <img
                        style={{
                            margin: 'auto',
                            width: 'auto',
                            height: 'auto',
                            maxWidth: '100%',
                            maxHeight: '220px',
                            borderRadius: '5px',
                            float: 'right',
                        }}
                        src={`/img/${renderText.img}`}
                        alt="设备状态"
                    />
                </Tooltip>
            </div>
        </div>
    )
}

export default CNCModelState
