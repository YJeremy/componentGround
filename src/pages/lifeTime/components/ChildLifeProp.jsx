import React from 'react';

/**
 * 子组件
 */
class ChildLifeProp extends React.Component{

  constructor(props){
    super(props);
    this.state={
      count : 0
    };
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

export default ChildLifeProp;
