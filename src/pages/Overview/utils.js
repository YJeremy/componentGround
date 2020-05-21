import React from 'react';
import { Tooltip } from 'antd';
import { deviceState2Img,deviceState2Color } from '@/utils/machine';
import { ReloadOutlined } from '@ant-design/icons';
import { isNullOrUndefined } from '@/utils/utils';

const Opacity = 0.3;

const mayPlaceholder = (elm, prefix = '', suffix = '') =>
    !isNullOrUndefined(elm) ? `${prefix} ${elm} ${suffix}` : '/';

const titleStyle = {
    fontWeight:'bold',
    fontSize:'1rem',
}

export const columns = (onIconClick = () => { }, onImgClick = () => { }, Icon4loginState) => [
    {
        title: (
            <div>
                <span style={{ ...titleStyle }}>设备状态</span>
                <ReloadOutlined
                    style={{ marginLeft: '5px', color: '#1890FF',fontSize:'20px' }}
                    title="重新加载"
                    onClick={onIconClick}
                />
            </div>
        ),
        dataIndex: 'typeAndstate',
        key: 'typeAndstate',
        render: (text, record) => {
            // 带图像的状态
            let renderText = deviceState2Img(text.type, text.state); // { img: '', tooltip: '' };
            return (
                <div
                    key={`overview-state-${record.index}`}
                    style={{
                        opacity: record.valid ? 1 : Opacity,
                        width: '100%',
                        height: 100,
                        borderRadius: 12,
                    }}
                >
                    <Tooltip placement="rightTop" title={renderText.tooltip}>
                        <a>
                            <img
                                alt="网络连接异常"
                                onClick={() => onImgClick(record.type, record.index)}
                                style={{ fontSize: '8px', width: '100px', height: '100%' }}
                                src={`/img/${renderText.img}`}
                            />
                        </a>
                    </Tooltip>
                </div>
            );
        },
    },
    {
        title: <span style={{ ...titleStyle }}>设备名称</span>,
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {

            return(
            <div
                key={`overview-name-${record.index}`}
                style={{
                    opacity: record.valid ? 1 : Opacity,
                }}
            >
                {text}
            </div>

            )
        }
    },
    {
        title: <span style={{ ...titleStyle }}>设备型号</span>,
        dataIndex: 'model',
        key: 'model',
        render: (text, record) => (
            <div
                key={`overview-model-${record.index}`}
                style={{
                    opacity: record.valid ? 1 : Opacity,
                }}
            >
                {text}
            </div>
        ),
    },
    {
        title: <span style={{ ...titleStyle }}>设备编号</span>,
        dataIndex: 'sn',
        key: 'sn',
        render: (text, record) => (
            <div
                key={`overview-sn-${record.index}`}
                style={{
                    opacity: record.valid ? 1 : Opacity,
                }}
            >
                {text}
            </div>
        ),
        responsive:['md'],
    },
    {
        title: <span style={{ ...titleStyle }}>关机时间</span>,
        dataIndex: 'timeOffline',
        key: 'timeOffline',
        render: (text, record) => (
            <div
                key={`overview-timeOffline-${record.index}`}
                style={{
                    opacity: record.valid ? 1 : Opacity,
                }}
            >
                {mayPlaceholder(text, '', 's')}
            </div>
        ),
    },
    {
        title: <span style={{ ...titleStyle }}>待机时间</span>,
        dataIndex: 'timeIdle',
        key: 'timeIdle',
        render: (text, record) => (
            <div
                key={`overview-timeIdle-${record.index}`}
                style={{
                    opacity: record.valid ? 1 : Opacity,
                }}
            >
                {mayPlaceholder(text, '', 's')}
            </div>
        ),
    },
    {
        title: <span style={{ ...titleStyle }}>报警时间</span>,
        dataIndex: 'timeAlm',
        key: 'timeAlm',
        render: (text, record) => (
            <div
                key={`overview-timeAlm-${record.index}`}
                style={{
                    opacity: record.valid ? 1 : Opacity,
                }}
            >
                {mayPlaceholder(text, '', 's')}
            </div>
        ),
    },
    {
        title:<span style={{ ...titleStyle }}>加工时间</span> ,
        dataIndex: 'timeCut',
        key: 'timeCut',
        render: (text, record) => (
            <div
                key={`overview-timeCut-${record.index}`}
                style={{
                    opacity: record.valid ? 1 : Opacity,
                }}
            >
                {mayPlaceholder(text, '', 's')}
            </div>
        ),
    },
    {
        title:<span style={{ ...titleStyle }}>已加工件数</span> ,
        dataIndex: 'cutted',
        key: 'cutted',
        render: (text, record) => {
            return (
                <div
                    key={`overview-cutted-${record.index}`}
                    style={{
                        opacity: record.valid ? 1 : Opacity,
                    }}
                >
                    {mayPlaceholder(text)}
                </div>

            )
        },
    },
];

export const fillCNCDynamic = {
    // type: undefined,
    // index: undefined,
    analysis: {
        state: 100,
        time: {
            offline: undefined,
            idle: undefined,
            alm: undefined,
            cut: undefined,
        },
    },
    parts: {
        cutted: undefined,
    },
};

export const fillRBDynamic = {
    // type: undefined,
    // index: undefined,
    analysis: {
        state: 100,
        time: {
            offline: undefined,
            idle: undefined,
            alm: undefined,
            cut: undefined,
        },
    },
    parts: {
        cutted: undefined,
    },
};

// type: "cnclink"/"robotlink",
// valid: <bool>,
// state: elm.analysis.state.state,
// sn: elm.mach.sn,
// model: elm.mach.model,
// name: elm.mach.name,
// timeOffline: elm.analysis.time.offline,
// timeIdle: elm.analysis.time.idle,
// timeAlm: elm.analysis.time.alm,
// timeCut: elm.analysis.time.cut,
// cutted: elm.parts.cutted,

// <TouchIcon
//   style={{ marginLeft: '5px' }}
//   type="reload"
//   title={'重新加载'}
//   onClick={onIconClick}
// />
