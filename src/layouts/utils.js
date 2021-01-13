import { isNullOrUndefined } from '@/utils/utils';
export const websocketModel = ({ websocketTest,iframe}) => {

    const {pageName} = iframe;

    const {dynamic} = websocketTest;

    const initState = {
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
    }

    // ws 还没建立、还么传值
    if (dynamic === null) {
        return {
            ...initState,
            pageName
        };
    } else {

    const {analysis,cord,time} = dynamic[0][0];
    const {absolute,relative,machine:cordMachine,remain} = cord;
    const {cut,run}= time;

    return {
        ...initState,
        absolute:absolute,
        relative:relative,
        machine:cordMachine,
        remain:remain,
        run:run,
        pageName,
    };

    }
   };

export const machineModel = ({ machine, staticModel,}) => ({
    machine: machine,
    staticModel: staticModel,
})
