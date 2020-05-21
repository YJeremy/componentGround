import React from 'react';

/**
 * 子组件
 */
class ChildLife extends React.Component{

  constructor(props){
    super(props);
    this.state={
      count : 0
    };
  }

  /** 生命周期们 **/

  UNSAFE_componentWillMount() {  //组件在初始化之前会调用这个方法
    console.log("componentWillMount()  ->  组件在初始化之前会调用这个方法");
  }

  componentDidMount() { //组件渲染完成之后会调用这个方法
    console.log("componentDidMount()  ->  组件渲染完成之后会调用这个方法");
  }

  UNSAFE_componentWillReceiveProps(newProps) { //父组件的传递东西过来时会调用这个方法
    console.log("componentWillReceiveProps()  ->  父组件的传递东西过来时会调用这个方法");
    console.log(newProps.parentCount)
  }



  render() {
    return(
      <div>
        <p>子组件：后台打印渲染生命周期</p>
        <p>子组件props接受：{this.props.parentCount}</p>
      </div>
    )
  }

}

export default ChildLife;
