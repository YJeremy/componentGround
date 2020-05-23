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
import { createWS2 } from '@/utils/createWS';
import { menuData,query } from './routeData';

const { Header, Content, Footer, Sider } = Layout;
const title = `可保存的笔记`
class WorkshopLayout extends React.PureComponent {

    state = { str: localStorage.getItem('txt') || '可保存的编辑' }
    componentDidMount() {
        const {
            dispatch,
        } = this.props;

       //测试websocket 创建全局的ws,进而更新model ws,
       //初始化获取所有设备基本配置数据和创建websocket
        dispatch({
            type: 'websocketTest/websocket',
            payload:{
                dispatch:dispatch
            }
        });

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

export default connect(websocketModel)(props => (
    <Media query="(max-width:800px)">
        {isMobile => <WorkshopLayout {...props} isMobile={isMobile}></WorkshopLayout>}
    </Media>
    /*由于全局下childern每次只有一个节点（不能出现同一页面多个不同节点）；所以media直接在layout做监听，
    并传直接判读ismobile状态，由childer自己改变节点 */
)
);

/* export default function(props){
    if (props.location.pathname === '/gsk') {
        return <div>{props.children}</div>
    }

    return <WorkshopLayout/>
}
 */
