import React, { PureComponent } from 'react';
import { connect } from 'dva';
import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/china';
import { isNullOrUndefined } from '@/utils/utils';

import { graphOption } from '@/components/MachineState/utils';

export default connect(({ machine }) => {
  const { page } = machine;
  if (page.type === '') {
    return {};
  }
  const specialMachine = machine[page.type][page.index];
  if (isNullOrUndefined(specialMachine)) {
    return {};
  }
  const { dynamic } = specialMachine;
  if (isNullOrUndefined(dynamic)) {
    return {};
  }
  const { time } = dynamic.analysis;
  return {
    machineTime: { ...time },
  };
})(
  class CNCGraph extends PureComponent {
      constructor(props){
    super(props);
    this.graph = null;
    this.state = {
      width: window.innerWidth / 5,
    };
    }


    componentDidMount() {
      const chart = echarts.init(this.graph);
      chart.setOption(graphOption);
      chart.hideLoading();
      this.chart = chart;
      window.addEventListener('resize', () => {
        this.chart.resize();
      });
    }

    componentDidUpdate() {
      const { machineTime } = this.props;
      if (isNullOrUndefined(machineTime)) {
        return;
      }
      const { poweron, cut, idle, alm, offline } = machineTime;
      this.chart.setOption({
        series: [
          {
            data: [
              // { value: poweron, name: '开机时间' },
              { value: cut, name: '加工时间', itemStyle: { color: 'green' } }, //
              {
                value: idle,
                name: '待机时间',
                itemStyle: { color: '#DAA520' } /* , label: { show: false } */,
              },
              { value: alm, name: '报警时间', itemStyle: {
                   color: 'red',
                } }, //
              {
                value: offline,
                name: '离线时间',
                itemStyle: { color: 'gray' } /* , label: { show: false } */,
              },
            ],
          },
        ],
      });
    }

    render() {
      const { width } = this.state;
      return (
        <div
          style={{ width: '100%', height: 240 }}
          ref={ref => {
            this.graph = ref;
          }}
        />
      );
    }
  }
);
