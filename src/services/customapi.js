import request, { checkGetRequest } from '../utils/request';
import { Protocol, cnclinkAddr } from '../utils/dynamic-global';
import axios from 'axios'

const crequest = (url, option) =>
    request(url, {
        credentials: 'omit',
        ...option,
    });

export async function getListCNC() {
    return crequest(`${Protocol}${cnclinkAddr}/api/v1/workshop`);
}


export async function getOneStatic(dev) {
    return crequest(`${Protocol}${cnclinkAddr}/api/v1/${dev}/mc`);
}

export async function getCNCcode(name,dispatch) {

    const url = `http://172.22.19.45:11520/api/v1/dev1/file/${name}.CNC`

    axios.get(url, { responseType: 'blob' })
        .then(response => {
            const fileReader = new FileReader();
            fileReader.readAsText(response.data, 'gbk');
            fileReader.onload = (event) => {
                const dataList = event.target.result.split('\n')
                let ArrInArr = []
                // 一维数组 -> 二维数组
                for (let j = 0; j < dataList.length; j++) {
                    ArrInArr.push(dataList[j].split(' '))
                }

                dispatch({
                    type:'program/codeSave',
                    payload:ArrInArr,
                }
                )
            }
        })
        .catch(err => {
            console.log(err)
        })
}
