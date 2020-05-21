export default [
  {
    title: '报警序号',
    key: 'alarm-list-no',
    dataIndex: 'no',
    width: '120px',
  },
  {
    title: '报警内容',
    key: 'alarm-list-content',
    dataIndex: 'content',
    width: '120px',
  },
  {
    title: '报警时间',
    key: 'alarm-list-time',
    dataIndex: 'time',
    width: '120px',
    //sorter: (a, b) =>Date.parse(a.time) - Date.parse(b.time),
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder:'descend',
  },
];
