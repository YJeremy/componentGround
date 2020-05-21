import React from 'react';
import styles from './index.less';
import { Link } from 'umi';
import { Layout, Menu } from 'antd';
import { connect } from 'dva';
import EditBox from '@/components/EditBox';
import Media from 'react-media';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import classNames from 'classnames';
import { websocketModel } from './utils';
import './all.css';


const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

const { Header, Content, Footer, Sider } = Layout;
const menuData = [
    { route: '/', name: '首页' },
    { route: '/jeremy', name: 'Jeremy\'s' },
    { route: '/mary', name: 'Mary\'s' },
    { route: '/lucy', name: 'Lucy\'s'},
    { route: '/lifetime', name: '组件生命周期与props传值'},
    { route: '/antduse', name: '带参数用箭头 X UiModal'},
    { route: '/container', name:'容器写法 X UiSpin'},
    { route: '/parentref', name:'react父子组件传值'},
    { route: '/tablestudy', name:'UiTable_搜索表格'},
    { route: '/table4screens', name:'UiTable_响应式表格'},
    { route: '/Responsegrid', name: 'UiGrid_响应式栅格'},
    { route: '/websockettest', name: 'Websocket测试_JSX写法'},
    { route: '/tableoverview', name: 'Table整体数据数组解引'},
]
const title = `可保存的笔记`

class WorkshopLayout extends React.PureComponent {

    state = { str: localStorage.getItem('txt') || '可保存的编辑' }
    componentDidMount() {
        const {
            dispatch,
        } = this.props;

       //测试websocket 创建全局的ws,进而更新model ws,
        createWS('ws://127.0.0.1:11520/ws_array/dev1', dispatch)
        //初始化获取所有设备基本配置数据和创建websocket
        /* dispatch({
            type: 'machine/initAllMachine',
            payload: dispatch,
        }); */

        /* dispatch({
            type: 'program/fetch',
            payload: dispatch,
        }) */
    }
    onChange = str => {
        localStorage.setItem('txt', str)
        this.setState({ str });
    }
    render() {
        const {
            location: { pathname },
            children,
            isMobile,
        } = this.props
        const layout = (
            <Layout>
                <Sider>
                    <div>
                        <Menu
                            theme="dark"
                            mode="vertical"
                            defaultSelectedKeys={[pathname]}
                            style={{ lineHeight: '64px' }}
                        >
                            {
                                menuData.map(menu => (
                                    <Menu.Item key={`${menu.route}`}>
                                        <Link to={menu.route}>{menu.name}</Link>
                                    </Menu.Item>
                                ))
                            }
                        </Menu>
                    </div>
                </Sider>
                <Layout>
                    <Header style={{ padding:2}}>组件练习</Header>
                    <Content style={{ padding: '0 10px 0px 50px ' }}>
                        <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                            {children}
                        </div>
                    </Content>

                <Footer style={{ textAlign: 'center' }}>基于UmiJS开发 create By Jeremy</Footer>
                </Layout>
            </Layout>
        );

        //对浏览器层面做修饰
        return(
            <React.Fragment >
                <DocumentTitle title={'组件练习'}>
                    <ContainerQuery query={query}>
                        {params =>(
                            <div className={classNames(params)}>{layout}</div>
                        )}
                    </ContainerQuery>

                </DocumentTitle>
            </React.Fragment>
        )


    }

}

const intervalCrossover = 1000;
export const createWS = (api, dispatch) => {
    const ws = new WebSocket(`${api}`);
    let now = Number(new Date());

    ws.addEventListener('open', () => {
        dispatch({
            type: 'websocketTest/wsOpen',
            payload: {
                ws,
            },
        });
    });

    const wsClose = () => {
        // 防止二次触发, 可能没用
        ws.removeEventListener('close', wsClose);
        // 出现错误/关闭, 关闭连接; 触发重渲染, 然后重连; 同时防止关闭了新的连接
        dispatch({
            type: 'websocketTest/wsClose',
            payload: {
                ws,
            },
        });
    };

    //ws.addEventListener('close', wsClose); //因为后面加了延时，会出现把第一台关闭了的情况，所以注释这里
    ws.addEventListener('error', () => {
        ws.close();
    });
    ws.addEventListener('message', ({ data }) => {
        // slow down 每1秒一次信息
        if (Number(new Date()) - now < intervalCrossover) {
            return;
        }
        now = Number(new Date());
        const wsdata = JSON.parse(data);
        // 更新数据
        dispatch({
            type: 'websocketTest/wsMsg',
            payload: {
                dynamic: wsdata,
            },
        });
    });
};


export default connect(websocketModel)(props => (
    <Media query="(max-width:800px)">
        {isMobile => <WorkshopLayout {...props} isMobile={isMobile}></WorkshopLayout>}
    </Media>
    /*由于全局下childern每次只有一个节点（不能出现同一页面多个不同节点）；所以media直接在layout做监听，
    并传直接判读ismobile状态，由childer自己改变节点 */
)
);
