import React from 'react';
import ChildLife from './components/ChildLife';

/**
 * 父组件  为Life.js，里面有两个按钮，作用为把当前组件的count属性+1
 */
class Life extends React.Component {

  //构造器
  constructor(props){
    super(props);
    this.state = {   //组件内的变量等都通过state来存取
      count : 0,
    };
  }

  /**
   * 点击事件的第一种实现方式：
   */
  addCount = ()=>{
    this.setState({
      count : this.state.count + 1
    })
  }

  /**
   * 点击事件的第二种实现方式：
   */
  addCountBindThis(){
    this.setState({
      count : this.state.count + 1
    })
  }


  render() {
    return (
      <div>
        <p>点击按钮，count加1</p>
        <button onClick={this.addCount}>按钮1:不使用bind,箭头函数</button>
        <button onClick={this.addCountBindThis.bind(this)}>按钮2:使用bind</button>
        <p>父组件 state.count : {this.state.count}</p>
        <ChildLife parentCount = {this.state.count} parentMathe={this.addCountf}></ChildLife>

      </div>
    )

  }
}
export default Life;
