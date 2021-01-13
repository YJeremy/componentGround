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
/*  window.addEventListener('message',function(e){
if(e.source!=window.parent) {
    return
};// 判断来源，还有 origin 属性可选具体地址

    if (Number(new Date()) - now < intervalCrossover) {
    console.log('return!')
            return;
    }
    now = Number(new Date());

console.log('message on! get:',e.data,now,currentPage)
routeButton = e.data

if(currentPage === routeButton){
    console.log('return! same notJump!',currentPage)
    return
}

currentPage = routeButton;

if(routeButton === 'headpage'){
                history.replace('/');
}

if(routeButton === 'page2'){
                history.replace('/tablestudy');
}

if(routeButton === 'page3'){
                history.replace('/lucy');
}

window.parent.postMessage('子页面发送的消息','*')
console.info('jump!')

},false); */



//window.parent.postMessage('子页面收到信息!','*')

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

    componentDidUpdate(){
        const {pageName} = this.props;
        console.log('layout updata!',pageName);
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
                    <Header style={{ padding:2 ,color:'white'}}>手机练习
                    123121 sfasfsffsafa
                    </Header>
                    <Content style={{ padding: '0 10px 0px 50px ' }}>
                        <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                            {children}
                        </div>
                    </Content>

                <Footer style={{ textAlign: 'center' }}>基于UmiJS开发 create By Jeremy</Footer>
                </Layout>
        );
        //对浏览器层面做修饰
        return(
            <React.Fragment >
                <DocumentTitle title={'手机练习'}>
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
