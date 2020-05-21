import { isNullOrUndefined } from '@/utils/utils';

import { createWS } from '@/utils/createWS';

import { cnclinkAddr } from '@/utils/dynamic-global';
// state

import { QuestionCircleOutlined,StopOutlined,ExclamationCircleOutlined,PauseCircleOutlined } from '@ant-design/icons';

export const tooltip = [
  // 复位
  {
    placement: 'bottomLeft',
    title: '复位 状态',
  },
  // 停止
  {
    placement: 'bottomLeft',
    title: '停止 状态',
  },
  // 运行
  {
    placement: 'bottomLeft',
    title: '运行 状态',
  },
  // 暂停
  {
    placement: 'bottomLeft',
    title: '暂停 状态',
  },
];

export const icon = [
<QuestionCircleOutlined theme='filled' style={{color:'#008866'}}/>,
<StopOutlined theme='filled' style={{color:'#f00000'}}/>,
<ExclamationCircleOutlined theme='filled' style={{color:'#008866'}}/>,
<PauseCircleOutlined theme='filled' style={{color:'#333333'}}/>,
  // 复位
  {


    theme: 'filled',
    type: 'question-circle',
    style: {
      color: '#008866',
    },
  },
  // 停止
  {
    theme: 'filled',
    type: 'stop',
    style: {
      color: '#f00000',
    },
  },
  // 运行
  {
    theme: 'filled',
    type: 'exclamation-circle',
    style: {
      color: '#008866',
    },
  },
  // 暂停
  {
    theme: 'filled',
    type: 'pause-circle',
    style: {
      color: '#333333',
    },
  },
];

// mode
export const modeText = [
  {
    text: '编辑',
    style: {},
  },
  {
    text: '自动',
    style: {},
  },
  {
    text: 'MDI',
    style: {},
  },
  {
    text: 'DNC',
    style: {},
  },
  {
    text: '手动',
    style: {},
  },
  {
    text: '手轮',
    style: {},
  },
  {
    text: '回参考点',
    style: {},
  },
];

export const graphOptionBak = {
  title: {
    // text: '工作情况统计图',
    left: 'center',
    textStyle: { fontSize: 27 },
    x: 'center',
    y: 25,
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
  },
  legend: {
    x: 20,
    y: 700,
    textStyle: { fontSize: 20 },
    data: ['开机时间', '加工时间', '待机时间', '报警时间', '离线时间'],
  },
  // color: ['#B5C334', '#00FF00', '#008B8B', 'red', '#BF3EFF', '#7A378B', '#458B00', '#00EE00', '#00BFFF', '#008B8B'],
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: {
        show: true,
        type: ['pie', 'funnel'],
      },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  calculable: false,
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['30%', '55%'],
      label: {
        normal: {
          formatter: '{b|{b}：}{c}  {per|{d}%}  ',
          fontSize: 20,
          // color: 'white',
          borderRadius: 4,
          rich: {
            a: {
              // color: '#999',
              lineHeight: 22,
              align: 'center',
            },
            hr: {
              // borderColor: '#aaa',
              width: '100%',
              borderWidth: 0.5,
              height: 0,
            },
            b: {
              fontSize: 20,
              lineHeight: 33,
            },
            per: {
              // color: '#eee',
              fontSize: 20,
              backgroundColor: '#334455',
              padding: [2, 4],
              borderRadius: 2,
            },
          },
        },
      },
      data: [],
    },
  ],
};

export const graphOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
  },
  series: [
    {
      type: 'pie',
      radius: ['30%', '55%'],
      label: {
        normal: {
          formatter: '{b|{b}: }{c}',
          // color: 'white',
          borderRadius: 4,
          rich: {
            a: {
              lineHeight: 22,
              align: 'center',
            },
            hr: {
              width: '100%',
              borderWidth: 0.5,
              height: 0,
            },
            b: {
              lineHeight: 33,
            },
            per: {
              backgroundColor: '#334455',
              padding: [2, 4],
              borderRadius: 2,
            },
          },
        },
      },
    },
  ],
};

export function getXYZWPR(index) {
  switch (index) {
    case 0:
      return 'X';
    case 1:
      return 'Y';
    case 2:
      return 'Z';
    case 3:
      return 'P';
    case 4:
      return 'W';
    case 5:
      return 'R';
    case 6:
      return 'J7轴';
    case 7:
      return 'J8轴';
    default:
      return '';
  }
}

export function getSpdrate(index) {
  switch (index) {
    case 0:
      return '微动';
    case 1:
      return '低速';
    case 2:
      return '中速';
    case 3:
      return '高速';
    case 4:
      return '超高速';
    default:
      return '';
  }
}

export const machineModel = ({ machine, /* alarm, */ staticModel }) => {

  const { page } = machine;

  const initState = {
      type:page.type,
      index:page.index,
      machine:null,
      staticModel:null,
      dev:null,
      absoluteAxes:null,
      cncName:null,
      cncModel:null,
      cncSn:null,
      mode:null,
      runTime:null,
      cutTime:null,
      dailyCutTime:null,
      anaState:null,
      override:null,
      absoluteCord:null,
  }


  // 未初始化
  if (page.type === '' || (page.type !== 'cnclink' && page.type !== 'robotlink')) {
    return {
        ...initState
    };
  }

  let specialMachine;
  let specialStatic;

   if (page.type === 'robotlink') {
    specialMachine = machine.robotlink.dynamic[page.index];
    const { ws } = machine.robotlink;
    const statics = machine.robotlink.statics[page.index];
    if (specialMachine) {
      return {
        page,
        machine: specialMachine,
        ws,
        statics,
        type:page.type,
      };
    } else {
      return {
        page,
        machine: null,
        ws,
        statics,
        type:page.type,
      };
    }
  }

  const CNCMachine = machine[page.type][page.index]? machine[page.type][page.index]:null;
  // cnclink时的返回props,还未访问3000端口时
  if (isNullOrUndefined(CNCMachine)) {
    return {
        ...initState,
    };
  }

  const CNCModel = staticModel[page.type][page.index]?staticModel[page.type][page.index]:null;
   // 还未获取设备配置
  if (isNullOrUndefined(CNCModel)){
    return {
        ...initState,
    machine:CNCMachine,
    dev: CNCMachine.api ? CNCMachine.api : null,
    };
  }
// cnclink还未创建ws，还未获取设备配置
  if (!CNCMachine.dynamic){
    return {
        ...initState,
        dev: CNCMachine.api ? CNCMachine.api : null,
        machine:CNCMachine,
        staticModel:CNCModel,
        absoluteAxes:CNCModel.axes.names.absolute,
        absoluteCord:CNCModel.axes.names.absolute,
        cncName:CNCMachine.mach.name,
        cncModel:CNCMachine.mach.model,
        cncSn:CNCMachine.mach.sn,
    };
  }

  return {
    ...initState,
    dev: CNCMachine.api ? CNCMachine.api : null,
    machine: CNCMachine,
    staticModel: CNCModel,
    absoluteAxes:CNCModel.axes.names.absolute,
    absoluteCord:CNCModel.axes.names.absolute,

    cncName:CNCMachine.mach.name,
    cncModel:CNCMachine.mach.model,
    cncSn:CNCMachine.mach.sn,
    mode:CNCMachine.dynamic.mode,
    cutTime:CNCMachine.dynamic.time.cut,
    runTime:CNCMachine.dynamic.time.run,
    dailyCutTime:CNCMachine.dynamic.analysis.time.cut,
    anaState:CNCMachine.dynamic.analysis.state,
    override:CNCMachine.dynamic.override,
  };
};

export default {
  icon,
  tooltip,
  modeText,
  graphOption,
  getXYZWPR,
  getSpdrate,
};
