import React from 'react';
import DispalyCard from '@/components/DisplayCard';
import { Typography } from 'antd';
import { connect } from 'dva';
import EditBox from '@/components/EditBox';

const { Title, Paragraph, Text } = Typography;
const title = '缓存可编辑';

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
                <EditBox title={title} txt={txt} onChange = {this.onChange}></EditBox>
            </div>
        )
    }
}

export default connect(({staticModel})=>({txt:staticModel.txt}))(Homepage)
