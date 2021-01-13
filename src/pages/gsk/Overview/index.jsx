import { history } from 'umi';
import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, message, Table } from 'antd';
import { isNullOrUndefined } from '@/pages/gsk/Overview/utils';
import { columns, fillCNCDynamic, fillRBDynamic } from '@/pages/gsk/Overview/utils';

export default connect(({ machine }) => ({
    machine: {
        cnclink: machine.cnclink,
        robotlink: machine.robotlink,
    },
    page: machine.page,
}))(
    class Overview extends Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            const {
                dispatch,
                route: { routes, authority },
                cnclink,
            } = this.props;

            //初始化获取所有设备基本配置数据
            /* dispatch({
                type: 'machine/initAllMachine',
                payload:{dispatch:dispatch}
            }); */
        }

        // 卸载时, 把 websocket 全部清除
        /* componentWillUnmount() {
            const { machine, dispatch } = this.props;
            const { cnclink } = machine;
            cnclink.map((_, idx) =>
                dispatch({
                    type: 'machine/closeWS',
                    payload: {
                        type: 'cnclink',
                        index: idx,
                    },
                })
            );

            dispatch({
                type: 'machine/closeWS4Robot',
                payload: {
                    ws: machine.robotlink.ws,
                },
            });
        } */

        onRefreshPage = () => {
            history.push('/gsk/overview');
        };


        onImgClick = (type, index) => {
            const { dispatch } = this.props;
            dispatch({
                type: 'machine/updatePage',
                payload: {
                    type,
                    index,
                },
            });
            history.push('/gsk/monitor');
        }

        render() {
            const { machine } = this.props;
            const { cnclink: mcCNClink, robotlink: mcRobotlink } = machine;

            const dynamic = [
                ...mcCNClink
                    .map((elm, idx) => ({
                        ...elm,
                        index: idx,
                    }))
                    .map(elm => {
                        let dynamicData;
                        if ( isNullOrUndefined(elm.ws) || isNullOrUndefined(elm.dynamic)) {
                            dynamicData = { valid: false, ...fillCNCDynamic };
                        } else {
                            dynamicData = { valid: true, ...elm.dynamic };
                        }
                        return {
                            type: 'cnclink',
                            index: elm.index,
                            mach: elm.mach,
                            ...dynamicData,
                        };
                    }),
            ];

           /*  const rbDynamic = mcRobotlink.statics.map((elm, idx) => {
                let dynamicData = mcRobotlink.dynamic[idx];
                if (!dynamicData) {
                    dynamicData = { valid: false, ...fillRBDynamic };
                } else {
                    // const machineTime = getRobotLaunchState(dynamicData.state.value, elm.mach.name);
                    const machineTime = dynamicData.machineTime;
                    const cut = machineTime[3];
                    const idle = machineTime[1];
                    const alm = machineTime[2];
                    const offline = machineTime[0];
                    dynamicData = { valid: true, cut, idle, alm, offline, state: dynamicData.state.value };
                }
                return {
                    type: 'robotlink',
                    index: idx,
                    mach: elm.mach,
                    ...dynamicData,
                };
            });

            dynamic.push(...rbDynamic); */

            const renderData = dynamic.map(elm => {
                if (elm.type === 'cnclink') {
                    return {
                        type: elm.type,
                        index: elm.index,
                        key: elm.index + 'cnclink',
                        typeAndstate: { type: elm.type, state: elm.analysis.state },
                        sn: elm.mach.sn,
                        model: elm.mach.model,
                        name: elm.mach.name,
                        timeOffline: elm.analysis.time.offline,
                        timeIdle: elm.analysis.time.idle,
                        timeAlm: elm.analysis.time.alm,
                        timeCut: elm.analysis.time.cut,
                        cutted: elm.parts.cutted,
                        valid: elm.valid,
                    };
                }
                if (elm.type === 'robotlink') {
                    return {
                        type: elm.type,
                        index: elm.index,
                        key: elm.index + 'robotlink',
                        typeAndstate: { type: elm.type, state: elm.state },
                        sn: elm.mach.sn,
                        model: elm.mach.model,
                        name: elm.mach.name,
                        timeOffline: elm.offline,
                        timeIdle: elm.idle,
                        timeAlm: elm.alm,
                        timeCut: elm.cut,
                        cutted: '/',

                        valid: elm.valid,
                    };
                }
                return null;
            });

            if (!renderData) {
                message.error('数据格式错误');
                return (
                    <div style={{ width: '100%', top: '200px' }}>
                        <Spin size="large" />
                    </div>
                );
            }

            return (
                <div style={{ width: '100%' }}>
                    <Table
                        style={{ fontWeight: 'bold', lineHeight: 5, fontSize: '20px' }}
                        columns={columns(this.onRefreshPage, this.onImgClick)}
                        dataSource={renderData}
                        //scroll={{ y: window.innerHeight }}
                        pagination={{
                                //onChange: this.onPageChange,
                                defaultPageSize: 8,
                                defaultCurrent:1,
                                //size:isMobile?'small':'default',
                                showQuickJumper:true,
                            }}
                    />
                </div>
            );
        }
    }
);
