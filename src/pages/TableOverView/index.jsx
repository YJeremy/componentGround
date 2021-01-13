import React from 'react';
import { Table,Switch } from 'antd';
import { websocketModelOverView } from './utils';
import { connect } from 'dva';



const columns = [
  {
    title: 'Name (all screens)',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
    responsive: ['xs'],
  },
  {
    title: 'Age (medium screen or bigger)',
    dataIndex: 'age',
    key: 'age',
    responsive: ['md'],
  },
  {
    title: 'Address (large screen or bigger)',
    dataIndex: 'address',
    key: 'address',
    responsive: ['xl'],
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
];



/* function onChange(checked) {
  console.log(`switch to ${checked}`);
} */
/**
 *
 * 高阶函数， t 是用户参数； e是API回调自带默认参数(checked,event)
 * 本质是onChange(checked,event)(hi)(hello) 参数写入形式从左到右
 * 执行形式 onChange= hi => hello => (checked,evet) =>{} 从左边填入最右边的参数
 * 好处是，1次传1参数，下面的写法，就是返回参数的本身看起来反而更加麻烦...
 *
 * 情况2 有些API函数，已经自带参数了，自己想加入自定义的参数，只能“封装”对方的函数，因此会出现传参的类型是函数的情况
 * 所以，写成高阶函数的形式——方便修改固定的函数，方便封装函数，就是在外面“包裹”一层，在新添加的一层里来加入自己的参数与逻辑
 *
 * 再入下面例子，e 参数是API自带的参数，如果我想和新的参数hello ，则可能是 (hello,onChange(e)) =>{},
 * 改写高阶函数就： onchange = hello => e =>{},
 *
 */
const onChange = hi => hello => e=>{

  console.log(`switch to ${hi}`,hello,e);
  // switch to hi hello false

}

const Table4Screens = (props)=> {

    console.log( props )
    return (
        <React.Fragment>
            <div>
                {'hi,使用了react-media插件~'}
            </div>
            <Table columns={columns} dataSource={data} />

            <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            defaultChecked
            onChange={onChange('hi')('hello')}
            />

        </React.Fragment>
    )
}


export default connect( websocketModelOverView )(Table4Screens)
