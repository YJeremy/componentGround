import { Component } from 'react';
import { connect } from 'dva';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { Menu } from 'antd';
import { isNullOrUndefined } from '@/utils/utils';

// import styles from './index.less'

const { SubMenu } = Menu;
const styles = {
    SiderMenu: {
        top: '100px',
    },
};

export default connect(({ machine, listenServer }) => {
    const { page, cnclink, robotlink } = machine;
    const { CNCserver } = listenServer;

    return {
        machine: {
            page,
            cnclink: cnclink.map(e => ({
                api: e.api,
                model: isNullOrUndefined(e.mach) ? null : e.mach.model,
                name: isNullOrUndefined(e.mach) ? null : e.mach.name,
                dynamic: isNullOrUndefined(e.dynamic) ? null : e.dynamic,
            })),
            robotlink: {
                statics: Array.isArray(robotlink.statics)
                    ? robotlink.statics.map((e, i) => ({
                        model: e.mach.model || null,
                        name: e.mach.name || null,
                        index: i,
                    }))
                    : [],
                dynamic: robotlink.dynamic,
            },
        },

        CNCbconnect: CNCserver.devs.map(e => e.bconnect),
    };
})(
    class SiderSubMenu extends Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            const { dispatch, machine } = this.props
            const { page } = machine;
            if (page.type === '') {
                dispatch({
                    type: 'machine/initListCNC',
                });
            }
        }

        onClick = e => {
            const { dispatch } = this.props;
            const { key } = e;
            const strList = key.split('-');
            if (!(strList instanceof Array) || strList.length < 3) {
                throw 'any err in select sideSubMenu';
            }
            dispatch({
                type: 'machine/updatePage',
                payload: {
                    type: strList[1],
                    index: parseInt(strList[2]),
                },
            });
        };


        shouldComponentUpdate(nextProps) {
            const { page: newPage, cnclink: newCNClink, robotlink: newRobotlink } = nextProps.machine;
            const newConnect = nextProps.CNCbconnect;
            const { page, cnclink, robotlink } = this.props.machine;
            const { CNCbconnect: bconnect } = this.props;
            if (page.type !== newPage.type || page.index !== newPage.index) {
                return true;
            }
            if (newConnect !== bconnect) {
                // 设备连接状态图标更新
                return true;
            }
            if (
                newCNClink.length !== cnclink.length ||
                newCNClink.reduce((pree, e, i) => {
                    pree && e.api === cnclink[i].api;
                }, true) === true
            ) {
                return true;
            }
            if (
                newRobotlink.statics.length !== robotlink.statics.length ||
                newRobotlink.statics.reduce((pree, e, i) => {
                    pree && e.name === robotlink.statics[i].name;
                }, true) === false
            ) {
                return true;
            }
            return false;
        }

        onIcon = () => { <CheckCircleTwoTone /> }

        render() {
            const { style, machine, dispatch, CNCbconnect, robotHidden, } = this.props;
            const { cnclink, robotlink, page } = machine;
            // const {state} = cnclink.dynamic.analysis.state.state;
            const displayIndex = [];
            // console.log('cnclinkstate',cnclink[page.index])
            //打算把页数保持，刷新可读取上一次页数；
            localStorage.setItem('MenuIndex', `side-${page.type}-${page.index}`);
            displayIndex.push(localStorage.getItem('MenuIndex'));
            // console.log('displaytype',displayType)
            return (
                <div
                    style={{
                        ...style,
                        backgroundColor: '#222222',
                        maxWidth: '240px',
                    }}
                >
                    <Menu
                        onClick={this.onClick}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        theme="dark"
                        mode="inline"
                        inlineCollapsed={false}
                        defaultOpenKeys={
                            robotHidden ? ['side-cnclink'] : ['side-cnclink', 'side-robotlink']
                        }
                        // openKeys={this.props.robotHidden ? 'side-cnclink' : []}
                        //defaultSelectedKeys={['side-cnclink-0']}
                        selectedKeys={displayIndex}
                    >
                        <SubMenu
                            key="side-cnclink"
                            title={<div style={{ fontSize: '15px', fontWeight: 'bold' }}>CNC</div>}
                        >
                            {cnclink.map((e, i) => (
                                <Menu.Item
                                    style={{ fontSize: '15px' }}
                                    key={`side-cnclink-${i}`}
                                    title={`${e.api}`}
                                /* disabled={`${e.isNoDynamic}`} */
                                >
                                    {CNCbconnect[i] ? (
                                        <CheckCircleTwoTone />
                                    ) : (
                                            <CloseCircleTwoTone twoToneColor="#eb2f92"/>
                                        )}
                                    {`${e.name}`}
                                </Menu.Item>
                            ))}
                        </SubMenu>
                        <SubMenu
                            key="side-robotlink"
                            disabled={robotHidden}
                            title={<div style={{ fontSize: '15px', fontWeight: 'bold' }}>机器人</div>}
                        >
                            {robotlink.statics.map((e, i) => {
                                let isLinked = false;
                                const dynamic = robotlink.dynamic[i];
                                if (dynamic) {
                                    if (dynamic.state) {
                                        if (dynamic.state.value > 0) {
                                            isLinked = true;
                                        }
                                    }
                                }
                                return (
                                    <Menu.Item
                                        style={{ fontSize: '15px' }}
                                        key={`side-robotlink-${i}`}
                                        title={`${e.index}`}
                                    >
                                        {isLinked ? (
                                            'ON'
                                        ) : (
                                                'OFF'
                                            )}
                                        {`${e.model} ${e.name}`}
                                    </Menu.Item>
                                );
                            })}
                        </SubMenu>
                    </Menu>
                </div>
            );
        }
    }
);
