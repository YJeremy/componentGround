import React from 'react';
import DispalyCard from '@/components/DisplayCard';
import { Typography } from 'antd';
import { connect } from 'dva';
const { Title, Paragraph, Text } = Typography;
import EditBox from '@/components/EditBox';


class Homepage extends React.Component {

    onChange = str => {
        const { dispatch } = this.props
        dispatch({
            type: 'staticModel/editTxt',
            payload: str,
        })
    }

    render() {
        const {txt} = this.props;
        return (
            <div>
                <DispalyCard></DispalyCard>
                <EditBox title={`缓存可编辑`} txt={txt} onChange = {this.onChange}></EditBox>
            </div>
        )
    }
}

export default connect(({staticModel})=>({txt:staticModel.txt}))(Homepage)
