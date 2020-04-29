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
]
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
            payload: dispatch,
        });

        dispatch({
            type: 'program/fetch',
            payload: dispatch,
        })
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
                    <div className={styles.logo}>组件练习场 </div>
                    <div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
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
                </Header>
                <Layout>
                    <Content style={{ padding: '0 10px 0px 50px ' }}>
                        <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                            {children}
                        </div>
                    </Content>
                    <Sider style={{ background: `#ffff`, margin: '0 50px 0 0' }}>
                        <EditBox title={title} txt={this.state.str} onChange={this.onChange}></EditBox>
                    </Sider>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>基于UmiJS开发 create By Jeremy</Footer>
            </Layout>
        );

        //对浏览器层面做修饰
        return(
            <React.Fragment className="body">
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
