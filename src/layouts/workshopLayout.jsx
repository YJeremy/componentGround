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
import './all.css';
import { query,menuWorkshop } from './routeData';

const { Header, Content, Footer, Sider } = Layout;

const title = `可保存的笔记`

class WorkshopLayout extends React.PureComponent {

    state = { str: localStorage.getItem('txt') || '可保存的编辑' }
    componentDidMount() {
        const {
            dispatch,
        } = this.props;

        //初始化获取所有设备基本配置数据和创建websocket
        dispatch({
            type: 'machine/initAllMachine',
            payload: {dispatch:dispatch},
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
                <Header>
                    <a className={styles.logo}>车间管理系统 </a>
                    <div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[pathname]}
                            style={{ lineHeight: '64px',overflow:'scroll' }}

                        >
                            {
                                menuWorkshop.map(menu => (
                                    <Menu.Item key={`${menu.route}`}>
                                        <Link to={menu.route}>{menu.name}</Link>
                                    </Menu.Item>
                                ))
                            }
                        </Menu>
                    </div>
                </Header>
                    <Content style={{ paddingTop: '2px ',marginBottom:'24px' }}>
                        <div style={{ background: '#fff', minHeight: 580 }}>
                            {children}
                        </div>
                    </Content>

            </Layout>
        );

        //对浏览器层面做修饰
        return(
            <React.Fragment >
                <DocumentTitle title={'车间管理系统'}>
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


export default connect(({ machine, staticModel }) => ({
    machine: machine,
    staticModel: staticModel,
}))(props => (
    <Media query="(max-width:800px)">
        {isMobile => <WorkshopLayout {...props} isMobile={isMobile}></WorkshopLayout>}
    </Media>
    /*由于全局下childern每次只有一个节点（不能出现同一页面多个不同节点）；所以media直接在layout做监听，
    并传直接判读ismobile状态，由childer自己改变节点 */
)
);
