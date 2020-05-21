import React from 'react';
import { Table } from 'antd';
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


const Table4Screens = (props)=> {

    console.log( props )
    return (
        <React.Fragment>
            <div>
                {'hi,使用了react-media插件~'}
            </div>
            <Table columns={columns} dataSource={data} />

        </React.Fragment>
    )
}


export default connect( websocketModelOverView )(Table4Screens)
