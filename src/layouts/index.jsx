import React from 'react';
import styles from './index.less';
import {Link} from 'umi';
import { Layout, Menu } from 'antd';
import {connect} from 'dva';
import EditBox from '@/components/EditBox';

const { Header, Content, Footer,Sider } = Layout;
const menuData = [
    {route:'/', name:'首页'},
    {route:'/yjm',name:'Jeremy\'s'},
    {route:'/dqy',name:'dqy'},
    {route:'/ddy',name:'ddy'},
]
const title = `可保存的笔记`

class WorkshopLayout extends React.PureComponent {

    state= { str: localStorage.getItem('txt') || '可保存的编辑'}

 componentDidMount() {
        const {
            dispatch,
        } = this.props;

        //初始化获取所有设备基本配置数据和创建websocket
          dispatch({
            type: 'machine/initAllMachine',
            payload:dispatch,
        });

        dispatch({
            type:'program/fetch',
            payload:dispatch,
        })
    }

    onChange = str =>{
        localStorage.setItem('txt',str)
        this.setState({str});
    }

    render(){
     const {
        location:{pathname},
        children,
    } = this.props

    return (
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

            <Sider style={{background:`#ffff`,margin:'0 50px 0 0'}}>
                    <EditBox title = {title}txt={this.state.str} onChange={this.onChange}></EditBox>
            </Sider>

            </Layout>


            <Footer style={{ textAlign: 'center' }}>基于UmiJS开发 create By Jeremy</Footer>
        </Layout>
    );

    }

}


export default connect(({machine,staticModel})=>({
    machine:machine,
    staticModel:staticModel,

}))(WorkshopLayout);
