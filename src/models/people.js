import { message } from 'antd';
import { history } from 'umi';
export default {
    namespace: 'people',
    state: {
        staff: [
            {
                user:{
                    name:'guest',
                    code:'666666',
                },
                userMach:{
                    line:2,
                },
            },
            {
                user:{
                    name:'guest',
                    code:'666666',
                },
                userMach:{
                    line:2,
                },
            }
        ],
        currentStaff:undefined,
    },
    effects: {
        *login({ payload }, { call, put,select }) {

            const { password, userName } = payload;
            const staff = yield select(state =>state.people.staff);
            const isStaff = staff.find( item => item.user.name === userName && item.user.code === password );
            // [{}]
            const l = isStaff ? true : false;

            if (l) {
                // Login successfully
                message.success('登录成功！');

                yield put({
                    type:'saveCurrent',
                    payload:{currentStaff:isStaff},
                })

                history.replace('/index');
                return
            } else {

                message.success('登录失败！');
                return;
            }
        }


    },
    reducers: {
        saveCurrent(state, { payload }) {
            const {currentStaff} = payload
            return {
                ...state,
                currentStaff:currentStaff,
            }
        },

        save(state, { payload }) {
            const { password, userName } = payload;
            if (password === 'admin' && userName === 'admin') {
                // Login successfully
                message.success('登录成功！');
                history.replace('/index');
                return
            } else {
                message.success('登录失败！');
                return;
            }
        },

        islogin(state,{payload}) {
            if(state.currentStaff){
                return {...state}
            }else{
                history.replace('/user/login');
                return {...state}
            }

        },

        logout(state,{payload}) {
            return {
                ...state,
                currentStaff:undefined
            }

        }

    }
}
