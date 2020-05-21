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
  const specialMachine = machine.robotlink.dynamic[page.index];
  if (isNullOrUndefined(specialMachine)) {
    return {};
  }
  // const timeStamp = getRobotLaunchState(
  //   machine.robotlink.dynamic[page.index].state.value,
  //   machine.robotlink.statics[page.index].mach.name
  // );
  return {
    machineTime: specialMachine.machineTime,
  };
})(
  class RobotGraph extends PureComponent {
    state = {
      width: window.innerWidth / 5,
    };

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
      const cut = machineTime[3];
      const idle = machineTime[1];
      const alm = machineTime[2];
      const offline = machineTime[0];

      this.chart.setOption({
        series: [
          {
            data: [
              // { value: poweron, name: '开机时间' },
              {
                value: cut,
                name: '加工时间',
                itemStyle: {
                  color: 'green',
                  borederColor: 'yellow',
                },
              }, //
              {
                value: idle,
                name: '待机时间',
                itemStyle: {
                  color: '#DAA520',
                } /* , label: { show: false } */,
              },
              { value: alm, name: '报警时间', itemStyle: { color: 'red' } }, //
              {
                value: offline,
                name: '离线时间' /* , label: { show: false } */,
                itemStyle: { color: 'gray' },
              },
            ],
          },
        ],
      });
    }

    render() {
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
