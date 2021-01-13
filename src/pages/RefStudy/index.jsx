import *as React from 'react';
import { Button,Table,Upload } from 'antd';

class RefStudy extends React.Component{
    constructor(props){
        super(props);
        this.third = React.createRef();
    }

    componentDidMount(){
        console.log('ref is',this.third.current);
        // <input type="text">
    }

    focus =()=>{
        this.third.current.focus();
    }

    write =()=>{
        this.third.current.value = "jeremy";
    }

    render(){
        return(
            <div>
                <h2>两个独立的DOM关联</h2>
                <input type="text" ref={this.third} />
                <input type="button" value="选择上面的text input" onClick={this.focus}/>
                <input type="button" value="写入Jeremy" onClick={this.write}/>
            </div>
        )
    }
}

/**
 * 不要过度使用ref
 * 比如上面，实现“点击按钮，让输入框写入”jeremy"这个值，其实可以用 父组件 通过props 向子组件 传值来实现
 */



//功能性组件、函数组件，因为没有“实例”不能调用 ref属性，但可以哦那个组件的render函数里面ref属性：
function CustomTextInput(props) {
    // 这里必须提前顶一个textInput，只有这样才可以正常执行ref回调函数
    let textInput = null;
    function click() {
        textInput.focus();
    }
    return (
        <div>
            <input type="text" ref={input => { textInput = input; }} />
            <input type="button" value="选中这个输入框" onClick={click} />
        </div>
    );
}

export default RefStudy
//export default CustomTextInput
