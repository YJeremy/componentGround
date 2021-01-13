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
import { history } from 'umi';

const { Header, Content, Footer, Sider } = Layout;
const title = `可保存的笔记`
let routeButton = '';
const intervalCrossover = 500; //防抖
let now = Number(new Date());
let currentPage = '';//当前页点击页，重复无效
//本页面作为 iframe 传递参数测试

// alldata 与 olddata 作为全局变量，可以影响到组件内的dispatch 和 windows对象下的值 ； 本质上还是jsx的 DOM渲染？
let alldata
let olddata

window.addEventListener('message',function(e){
if(e.source!=window.parent) {
    return
};// 判断来源，还有 origin 属性可选具体地址

    if (Number(new Date()) - now < intervalCrossover) {
    //console.log('return!')
            return;
    }
    now = Number(new Date());
    alldata = e.data

//console.log('message on! get:',e.data,now,currentPage)
routeButton = e.data

if(currentPage === routeButton){
    //console.log('return! same notJump!',currentPage)
    return
}

currentPage = routeButton;

if(routeButton === 'headpage'){
                history.replace('/lifetime');
}

if(routeButton === 'page2'){
                history.replace('/tablestudy');
}

if(routeButton === 'page3'){
                history.replace('/lucy');
}

//window.parent.postMessage('子页面发送的消息','*')


},false);


/**
 * 模式设计下的 工厂模式？写法？ 先实现，后模式化；
 */

//window.parent.postMessage('子页面收到信息!','*')

// 子页面点击导航时候提交信息，对象外的方法！,post对象过去，也自动转为字符串！
const itemOnclick = e =>{
        //console.log('is click',e)
        /* window.parent.postMessage({
            message:'hi,来自子页的index的layout页',
            id:e
        },'*'); */
    }

const post2PageMsg = e =>{
    window.parent.postMessage({
            message:e,
            type:'page'
        },'*');
}

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

    componentDidUpdate(preProps){
        const {pageName,dispatch} = this.props;
        const {pageName:prepaegName} = preProps;
        if(pageName !== prepaegName){
          post2PageMsg(pageName)
        }
        console.log('layout didupdate!')

        if(alldata !== olddata){
        olddata = alldata
         dispatch({
            type: 'iframe/parentPost',
            payload:{
                alldata,
            }

        });
        }

        //console.log('更新，子传送的值是：',pageName);
        /**
         * 页面切换，挂载触发一次 更新（值不变，DOM变，必触发）
         * 页面挂载完成后，页面再触发函数值改变，再更新一次 （值变，很快触发）
         */
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
                            style={{ lineHeight: '64px',height:'1000px', overflow:'scroll'}}

                        >
                            {
                                menuData.map(menu => (
                                    <Menu.Item key={`${menu.route}`}>
                                        <Link to={menu.route} onClick={()=>itemOnclick(menu.name)}>{menu.name}</Link>
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
