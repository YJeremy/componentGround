import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import AlarmList from '@/components/AlarmList';
import { isNullOrUndefined } from '@/utils/utils';
import { alarmDefaultPageSize } from '@/utils/dynamic-global';
import { isQualifiedTypeIdentifier } from '@babel/types';

export default connect(({ machine, alarm }) => {
    const { page } = machine;
    if (page.type === '' || (page.type !== 'cnclink' && page.type !== 'robotlink')) {
        return {
            ...page,
            dev: null,
            isRequested: false,
            list: null,
        };
    }
    const alarmlist = alarm[page.type][page.index];
    let list,isRequested
    if(alarmlist){
        list = alarmlist.list;
        isRequested = alarmlist.isRequested;
    }

    return {
        type: page.type,
        index:page.index,
        dev: machine[page.type][page.index].api ? machine[page.type][page.index].api : null,
        list: list ||null,
        isRequested:isRequested||null,
    };
})(
    class AlarmTable extends PureComponent {

        //表格tabl回调函数，参数page换页时传入当前表格的页码
        onPageChange = page => {
            const { type, index, dev, list, dispatch } = this.props;
            const oneLine = list[(page - 1) * alarmDefaultPageSize];
            if (isNullOrUndefined(oneLine) || isNullOrUndefined(oneLine.id)) {
                dispatch({
                    type: 'alarm/getSomeOfOneAlarms',
                    payload: {
                        type,
                        index,
                        dev,
                        page,
                    },
                });
            }
        };

        componentDidMount() {
            const { isRequested, dispatch, type, index, dev } = this.props;
            if(!isRequested){
             dispatch({
                type: 'alarm/getOneAlarms',
                payload: {
                    type,
                    index,
                    dev,
                },
            });
            }
         }

        componentDidUpdate() {
           const {isRequested, type, index, dev, list, dispatch,tablePage } = this.props;
            if(!isRequested){//若是index换页，则触发
             dispatch({
                type: 'alarm/getOneAlarms',
                payload: {
                    type,
                    index,
                    dev,
                },
            });
            }

        }


        render() {
            const { type, index, dev, isRequested, list, dispatch,isMobile } = this.props;
            if (type === '' || isNullOrUndefined(dev)) {
                return (
                    <div>
                        <Spin size="large" />
                    </div>
                );
            }

            return (
                <div
                    style={{
                        height: '100%',
                        minHeight: '100px',
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
                        <span>报警历史表</span>
                    </div>
                    <div>
                        <AlarmList
                            list={list}
                            pagination={{
                                onChange: this.onPageChange,
                                defaultPageSize: alarmDefaultPageSize,
                                defaultCurrent:1,
                                size:isMobile?'small':'default',
                                showQuickJumper:true,
                            }}
                            isMobile = {isMobile}
                        />
                    </div>
                </div>
            );
        }
    }
);
