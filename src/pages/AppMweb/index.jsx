
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



    render() {
        return (
            <div>
                "hello"
            </div>
        )
    }
}
export default UiModal;
