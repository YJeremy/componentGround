import React from 'react';
import Formtry, { MiniForm, MyLogin } from '@/components/FormTry';
import CSSMedia from '@/components/CSSlayout/CSSMedia';
import CssBoard from '@/components/CSSlayout/CssBoard/CssBoard';
import AntdIcons from '@/components/AntdIcons';
import CssContainer from './myComponents/CssContainer';


const conponents = [<AntdIcons/>,<CSSMedia/>,<CssBoard/>,<CssContainer/>]
const l = conponents.length

class JeremyPage extends React.Component {
    constructor(){
        super();
        this.state = {
            Component : 0,
        }
    }

    handleClick = ()=>{
        let {Component} = this.state
       if(Component>=l-1){
           Component = 0
       }else{
           Component += 1
       }

        console.log(Component)
        this.setState({
            Component:Component
        })
        //setState 方法？
    }

    render(){
        const { Component } = this.state;

        return(
            <div>
                <button onClick={this.handleClick} >click</button>
                <div>{conponents[Component]}</div>
            </div>
        )
    }
}


export default JeremyPage
