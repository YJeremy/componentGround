
import React from "react";

class Childcallback extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'Andy',
            age:31,
            msg:"来自子类的消息"
        }
    }

    change=()=>{
        this.props.callback(this.state.msg,this.state.name,this.state.age);
    }

    render(){
        return(
            <div>
                <p>在子组件显示父组件传来的值</p>
                <div>{this.props.name}</div>
                <div>{this.props.age}</div>
                <button onClick={this.change}>点击后把子组件的值传给父组件</button>
            </div>
        )
    }
}

export default Childcallback;
