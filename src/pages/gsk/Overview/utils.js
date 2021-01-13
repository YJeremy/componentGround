import React from 'react';
import { Tooltip } from 'antd';
import { deviceState2Img } from './state2view';
import { ReloadOutlined } from '@ant-design/icons';

const Opacity = 0.3;

const mayPlaceholder = (elm, prefix = '', suffix = '') =>
    !isNullOrUndefined(elm) ? `${prefix} ${elm} ${suffix}` : '/';

const columnTitle = {
    fontWeight:'bold',
    fontSize:'1rem',
}

export function isNullOrUndefined(obj) {3
  return obj === null || obj === undefined;
}

export const columns = (onIconClick = () => { }, onImgClick = () => { }, Icon4loginState) => [
    {
        title: (
            <div>
                <span style={{ ...columnTitle }}>设备状态</span>
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
            let renderText;

            if (text.type === 'cnclink') {
                renderText = deviceState2Img('cnclink', text.state.state); // { img: '', tooltip: '' };
            } else {
                renderText = deviceState2Img('robotlink', text.state);
            }
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
                                //在系统的静态文件public 路径下获取图片
                            />
                        </a>
                    </Tooltip>
                </div>
            );
        },
    },
    {
        title: <span style={{ ...columnTitle }}>设备名称</span>,
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
            <div
                key={`overview-name-${record.index}`}
                style={{
                    opacity: record.valid ? 1 : Opacity,
                }}
            >
                {text}
            </div>
        ),
    },
    {
        title: <span style={{ ...columnTitle }}>设备型号</span>,
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
        title: <span style={{ ...columnTitle }}>设备编号</span>,
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
        title: <span style={{ ...columnTitle }}>关机时间</span>,
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
        title: <span style={{ ...columnTitle }}>待机时间</span>,
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
        title: <span style={{ ...columnTitle }}>报警时间</span>,
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
        title:<span style={{ ...columnTitle }}>加工时间</span> ,
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
        title:<span style={{ ...columnTitle }}>已加工件数</span> ,
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
