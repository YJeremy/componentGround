import React from 'react';
import { Table } from 'antd';
import Media from 'react-media';



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

const Table4Screens = ()=> {
    return (
        <React.Fragment>
            <Media query="(max-width: 768px)">
            <div>
                {'hi,使用了react-media插件~'}
            </div>
            </Media>

             <Media query="(min-width: 769px)">
            <Table columns={columns} dataSource={data} />
            </Media>

        </React.Fragment>
    )
}


export default Table4Screens
