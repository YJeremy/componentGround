export default {
  namespace: 'staticModel',

  state: {
    txt: '在此可编辑',
  },

  effects: {

  },

  reducers: {
       editTxt(state,{payload}) {
           return{
               ...state,
               txt:payload,
           }
       }

  },
};
