import React from 'react';
import { Dispatch, AnyAction, Link, connect } from 'umi';

class Lucy extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'iframe/isPage',
            payload: {
                pageName: 'LucyPage',
            }
        })
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'people/islogin',
        })
    }
    onClick = () => {
        console.log('hi')
        const { dispatch } = this.props;
        dispatch({
            type: 'people/logout',
        })
    }


    render() {
        const { currentStaff } = this.props
        if (!currentStaff) {
            return <div></div>
        }

        return (
            <div>i
            进入页面！
                <button onClick={this.onClick}> 退出登录</button>
            </div>
        )
    }

}


export default connect(
    ({ people, iframe }) => {
        return {
            people: people,
            pageName: iframe.pageName
        }
    }
)(Lucy)
