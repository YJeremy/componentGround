/**
 * AntDesign UI 常用弹出框示例
 */
import React from 'react'
import { Button, Card, Modal } from 'antd'
import './ui.less'

class UiModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAddInfoVisible: false, //新增信息Modal的显示属性
            modalDivBtnVisible: false, //自定义下面的按钮Modal的显示属性
            modalBottomVisible: false, //靠上展示Modal的显示属性
            modalCenterVisible: false, //水平垂直居中展示Modal的显示属性
        }
    }

    //弹出一个弹出框用于新增信息, type 参数决定显示那种类型的弹出框
    openModalAddInfo = (type) => {
        this.setState({[type + 'Visible']:true})
    }

    //弹出一个信息提示框
    showInfo = (type) => {
        switch (type) {
            case 'confirm':
                Modal.confirm({//confirm 也是一个弹出框
                    title: 'Are you sure delete this task?',
                    //icon: <ExclamationCircleOutlined />,
                    content: 'Some descriptions',
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk() {
                        console.log('OK');
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                });
                break;
            case 'success':
                Modal.success({
                    content: 'some messages...some messages...',
                });
                break;
            case 'error':
                Modal.error({
                    title: 'This is an error message',
                    content: 'some messages...some messages...',
                });
                break;
            case 'warning':
                Modal.warning({
                    title: 'This is a warning message',
                    content: 'some messages...some messages...',
                });
                break;
            default:
                Modal.info({
                    title: 'This is a notification message',
                    content: (
                        <div>
                            <p>some messages...some messages...</p>
                            <p>some messages...some messages...</p>
                        </div>
                    ),
                    onOk() { },
                });
                break;
        }
    }

    render() {
        return (
            <div>
                <Card title="弹出新增信息页面,回调函数带参数要用箭头函数返回"> {/*有参数传递必须加()=>*/}
                    <Button type="primary" onClick={() => this.openModalAddInfo("modalAddInfo")}>新增信息</Button>
                    <Button type="primary" onClick={() => this.openModalAddInfo("modalDivBtn")}>自定义下面的按钮</Button>
                    <Button type="primary" onClick={() => this.openModalAddInfo("modalBottom")}>靠上展示</Button>
                    <Button type="primary" onClick={() => this.openModalAddInfo("modalCenter")}>水平垂直居中展示</Button>
                </Card>

                {/*title:弹出框标题  visible:是否可见  onCancel:取消按钮，右上角X号事件*/}
                <Modal title="新增信息"
                    visible={this.state.modalAddInfoVisible}
                    onCancel={() => {
                        this.setState({ modalAddInfoVisible: false })
                    }}
                >
                    <span>姓名：</span><input />
                </Modal>

                {/*okText:指定确定按钮的文本  cancelText:指定取消按钮的文本*/}
                <Modal title="自定义下面的按钮Modal"
                    visible={this.state.modalDivBtnVisible}
                    onCancel={() => {
                        this.setState({ modalDivBtnVisible: false })
                    }}
                    okText="保存"
                    cancelText="取消" >
                    <span>姓名：</span><input />
                </Modal>

                <Modal title="靠上展示Modal"
                    style={{ top: 20 }} //需要在ui.less中添加相关样式
                    visible={this.state.modalBottomVisible}
                    onCancel={() => {
                        this.setState({ modalBottomVisible: false })
                    }} >
                    <span>姓名：</span><input />
                </Modal>

                {/*wrapClassName:指定自定义样式*/}
                <Modal title="水平垂直居中展示Modal"
                    visible={this.state.modalCenterVisible}
                    wrapClassName="vertical-center-modal"
                    onCancel={() => {
                        this.setState({ modalCenterVisible: false })
                    }} >
                    <span>姓名：</span><input />
                </Modal>

                <Card title="弹出信息提示框">
                    <Button type="primary" onClick={() => this.showInfo("info")}>弹出信息框</Button>
                    <Button type="primary" onClick={() => this.showInfo("success")}>弹出成功提示框</Button>
                    <Button type="primary" onClick={() => this.showInfo("error")}>弹出错误信息框</Button>
                    <Button type="primary" onClick={() => this.showInfo("warning")}>弹出警告信息框</Button>
                    <Button type="primary" onClick={() => this.showInfo("confirm")}>弹出确认信息框</Button>
                </Card>
            </div>
        )
    }
}
export default UiModal;
