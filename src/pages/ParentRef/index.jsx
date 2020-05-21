import React,{Component} from 'react';
import Childcallback from './Childcallback'

export default class ParentRef extends Component {
    constructor(props){
        super(props)
        this.state = {
            msg:'父组件消息',
            name:'father',
            age:99

        }
    }

    callback=(childmsg,childname,childage) => {
        this.setState({
            msg:childmsg,
            name:childname,
            age:childage,
        });
    }

    render(){
        return(
            <React.Fragment>
                <p>Message: &nbsp;&nbsp;{this.state.msg}</p>
                <p>下面是子组件</p>
                <Childcallback
                    callback={this.callback}
                    age={this.state.age}
                    name={this.state.name}
                    ></Childcallback>

            </React.Fragment>
        )
    }
}
