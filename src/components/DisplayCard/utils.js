import { isNullOrUndefined } from '@/utils/utils';
export const machineModel = ({ machine, staticModel,program }) => {

    const { page, cnclink } = machine;

    const initState = {
        type: page.type,
        index: page.index,
        api: 'dev0',
        ip: '0',
        type: 'cnc',
        model: 'initMachine',
        name: '初始化测试设备',
        sn: 'TEST202004',
        ws: '',
        mode: 1,
        dstate: 3,
        toolno: 0,
        offsetno: 0,
        absolute: [666.6666666, 77777],
        relative: [666.6666666, 88888],
        machine: [-666.6666666, 99999.99999],
        remain: [0, 0],
        programe: 0,
        actual: 0,
        cmdspeed: [],
        actspeed: [],
        gcodeName: "O0002",
        gcodeLine: 0,
        target: 0,
        cutted: 534111,
        timeRun: 3123123,
        timeCut: 404111,
        esp: false,
        alm: true,
        gcode: null,
        mcode: null,
        feed: 100,
        rappid: 100,
        jog: 100,
        mpg: 1,
        spindle: 100,
        offline: 0,
        poweron: 0,
        idle: 998,
        cut: 0,
        almtime: 6666,
        today: 0,
        state: 3,
        description: "alarm",
        cncprogram:program.code,
    }

    // 未初始化
    if (page.type === '' || page.type !== 'cnclink') {
        return {
            ...initState
        };
    }

    const CNCMachine = machine[page.type][page.index] ? machine[page.type][page.index] : null;
    // cnclink时的返回props,还未访问3000端口时
    if (isNullOrUndefined(CNCMachine)) {
        return {
            ...initState,
        };
    }


    // cnclink还未创建ws，还未获取设备配置
    if (!CNCMachine.dynamic) {
        return {
            ...initState,
            api: CNCMachine.api ? CNCMachine.api : null,
            ip: CNCMachine.ip,
            type: CNCMachine.type,
            model: CNCMachine.mach.model,
            sn: CNCMachine.mach.sn,
            name: CNCMachine.mach.name,
        };
    }

    const {mode,state:dstate,tool,cord,speed,spindle,gcode,parts,time,event,modal,override,analysis} = CNCMachine.dynamic;
    const {toolno,offsetno} = tool;
    const {absolute,relative,machine:cordMachine,remain} = cord;
    const {programe,actual} = speed;
    const {cmdspeed,actspeed} = spindle;
    const {name:gcodeName,line:gcodeLine} = gcode;
    const {target,cutted} = parts
    const {run:timeRun,cut:timeCut} = time;
    const {esp,alm} = event;
    const {gcode:mgcode,mcode} = modal;
    const {feed,rappid,jog,mpg,spindle:overSpindle} = override;
    const {time:anaTime,part,state:anastate} = analysis;
    const {offline,poweron,idle,cut,alm:almtime} = anaTime;
    const {today} = part;
    const {state,description} = anastate;



    return {
        ...initState,
        type: page.type,
        index: page.index,
        api: CNCMachine.api ? CNCMachine.api : null,
        ip: CNCMachine.ip,
        type: CNCMachine.type,
        model: CNCMachine.mach.model,
        sn: CNCMachine.mach.sn,
        name: CNCMachine.mach.name,
        ws: CNCMachine.ws,
        mode: CNCMachine.dynamic,
        dstate: dstate,
        toolno: toolno,
        offsetno: offsetno,
        absolute: absolute,
        relative: relative,
        machine: cordMachine,
        remain: remain,
        programe: programe,
        actual: actual,
        cmdspeed: cmdspeed,
        actspeed: actspeed,
        gcodeName: gcodeName,
        gcodeLine: gcodeLine,
        target: target,
        cutted: cutted,
        timeRun: timeRun,
        timeCut: timeCut,
        esp: esp,
        alm: alm,
        gcode:mgcode,
        mcode:mcode,
        feed:feed,
        rappid:rappid,
        jog:jog,
        mpg: mpg,
        spindle:overSpindle,
        offline: offline,
        poweron: poweron,
        idle:idle,
        cut: cut,
        almtime:almtime,
        today: today,
        state: state,
        description: description,
        CNCMachine:CNCMachine,
    };
};
