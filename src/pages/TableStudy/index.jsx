import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { history } from 'umi';
import {connect} from 'dva';
import { websocketModel } from './utils';


@connect(websocketModel)
class TableStudy extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    myclearFilters:{},
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),//注意检查所有数据的属性名必须和表格一致
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  onRefreshPage = () => {
    //访问相同路由时候，只会触发render，组件没有重新挂载
    //history.push('/tablestudy');//umi3 的路由跳转用法

    location.replace('/tablestudy') //这里通过浏览器刷新，重新载入

  }

  render() {

    const {absolute,machine,relative,run} = this.props;

    const columns = [
      {
        title: '绝对坐标',
        dataIndex: 'absolute',
        key: 'absolute',
        width: '20%',
        ...this.getColumnSearchProps('absolute'),
      },
      {
        title: '型号',
        dataIndex: 'model',
        key: 'model',
        width: '20%',
        ...this.getColumnSearchProps('model'),
      },
      {
        title: '编号',
        dataIndex: 'sn',
        key: 'sn',
        width: '30%',
        ...this.getColumnSearchProps('sn'),
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        ...this.getColumnSearchProps('state'),
      },
      {
        title: '加工件数',
        dataIndex: 'count',
        key: 'count',
      },
      {
        title: '相对坐标',
        dataIndex: 'relative',
        key: 'relative',
      },
    ];

const data2 = [
  {
    key: '1',
    name: 's1',
    model: '988TA',
    sn: 'SN12342123',
    state:'报警',
    count:'233',
    absolute:absolute,
    relative:relative,
  },
  {
    key: '2',
    name: '数控车床2',
    model: '980TD',
    sn: 'SN222555',
    state:'运行',
    count:'11233',
    absolute:absolute,
    relative:relative,
  },
  {
    key: '3',
    name: '机器人1',
    model: 'RB8',
    sn: 'SN9999999',
    state:'待机',
    count:'123123',
    absolute:absolute,
    relative:relative,
  },
  {
    key: '4',
    name: '机器人2',
    model: 'RB9',
    sn: 'SN98989898',
    state:'报警',
    count:'0',
    absolute:absolute,
    relative:relative,
  },
];



    return (
        <>
            <button onClick = {this.onRefreshPage }>刷新</button>
            <Table columns={columns} dataSource={data2} />
        </>
    )
  }
}

export default TableStudy
