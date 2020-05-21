export const deviceState2Img = (type, anaState) => {
  if (type === 'cnclink') {
    switch (parseInt(anaState, 10)) {
      case 0:
        return { img: 'cnc-gray.jpeg', tooltip: '离线状态' };
      // break; // 0: offline
      case 1:
        return { img: 'cnc-yellow.jpeg', tooltip: '待机状态' };
      // break; // 1: 待机
      case 2:
        return { img: 'cnc-green.jpeg', tooltip: '加工状态' };
      // break; // 2:加工
      case 3:
        return { img: 'cnc-red.jpeg', tooltip: '报警状态' };
      // break; // 3：报警
      default:
        return { img: 'cnc-gray.jpeg', tooltip: '状态异常' }; // unknown-machine.jpeg
    }
  } else if (type === 'robotlink') {
    switch (parseInt(anaState, 10)) {
      case 0:
        return { img: 'robot-gray.png', tooltip: '离线状态' };
      // break; // 0: offline
      case 1:
        return { img: 'robot-yellow.png', tooltip: '待机状态' };
      // break; // 1: 待机
      case 2:
        return { img: 'robot-red.png', tooltip: '报警状态' };
      // break; // 2:加工
      case 3:
        return { img: 'robot-green.png', tooltip: '加工状态' };
      // break; // 3：报警
      default:
        return { img: 'robot-gray.png', tooltip: '状态异常' }; // unknown-machine.jpeg
    }
  }
  return {};
};


export const deviceState2Color = (state) => {
    let color
    switch (state) {
        case 0:
        color = '#AAAAAA'
        break;
        case 1: // 1:
            color = '#FFDD55'
            break;
        case 2:
            color = '#66FF66'
            break;
        case 3:
            color = '#FF8888'
            break
        default:
            color = '#FFFFFF'
    }
    return color
}

export default {
  deviceState2Img,
};
