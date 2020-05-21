import React from 'react';
import { Tooltip,Button } from 'antd';
import { deviceState2Img } from '@/utils/machine';
import { flexHC, flexH,flexV,flexVW,flexHW } from '@/utils/flex';

const flexHWC = {
    flex:1,
    ...flexH,
    ...flexHW,
    margin:'5px 10px',

}

const CNCStateMessage = props => {
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
                设备状态信息
            </div>
            <div
                style={{
                    minHeight: '220px',
                    fontSize: '1.1em',
                    fontFamily: 'sans-serif',
                    background: '#ffffff',
                    borderRadius: '5px',
                    ...flexH
                }}
            >
                <div style={{ flex:1,...flexV,...flexVW }}>
                    <div style={{
                            ...flexHWC
                        }}
                    >
                        <div style={{ fontWeight: 'bold' }}>设备编号:</div>
                        <div style={{ marginLeft: '5px'}}>{sn}</div>
                    </div>

                    <div
                        style={{...flexHWC
                        }}
                    >
                        <div style={{ fontWeight: 'bold' }}>设备型号:</div>
                        <div style={{ marginLeft: '5px' }}>{model}</div>

                    </div>
                    <div
                        style={{
                            marginLeft:'5px',
                            ...flexV
                        }}
                    >
                            <Tooltip placement="rightTop" title="设备运行以来累计的切削时间">
                            <Button type='Dashed' size='small'>运行时间</Button>
                            <div style={{ marginLeft: '5px' }}>
                                {runTime.d >= 1 ? (`${runTime.d} 天 `) : null}
                                {runTime.h > 1 ? (`${runTime.h} 小时 `) : null}
                                {runTime.m > 1 ? (`${runTime.m} 分 `) : null}
                                {runTime.d >= 1 ? null : `${runTime.s} 秒`}
                            </div>
                            </Tooltip>
                            <Tooltip placement="rightTop" title="本次连续切削累计的时间">
                            <Button type='Dashed' size='small'>切削时间</Button>
                            <div style={{ marginLeft: '5px' }}>
                                {cutTime.d >= 1 ? (`${cutTime.d} 天 `) : null}
                                {cutTime.h > 1 ? (`${cutTime.h} 小时 `) : null}
                                {cutTime.m > 1 ? (`${cutTime.m} 分 `) : null}
                                {cutTime.d >= 1 ? null : `${cutTime.s} 秒`}
                            </div>
                            </Tooltip>
                            <Tooltip placement="rightTop" title="设备当日累计的切削时间">
                            <Button type='Dashed' size='small'>今天加工</Button>
                            <div style={{ marginLeft: '5px' }}>
                                {dailyCutTime.d >= 1 ? (`${dailyCutTime.d} 天 `) : null}
                                {dailyCutTime.h > 1 ? (`${dailyCutTime.h} 小时 `) : null}
                                {dailyCutTime.m > 1 ? (`${dailyCutTime.m} 分 `) : null}
                                {dailyCutTime.d >= 1 ? null : (`${dailyCutTime.s} 秒`)}
                            </div>
                            </Tooltip>
                    </div>
                </div>

                <div style={{ flex:1}}>
                    <Tooltip placement="rightTop" title={renderText.tooltip}>
                        <img
                            style={{
                                padding: '10px',
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
        </div>
    );
};
export default CNCStateMessage;

// <div style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", backgroundImage: `url(/img/${renderText.img})` }}/>
