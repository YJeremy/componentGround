import React from 'react';
import { Typography } from 'antd';
import { connect } from 'dva';

const { Paragraph, Text } = Typography;

const editBox = ({title,txt,onChange}) => {

        return (
            <div>
                <h1>{title?title:``}</h1>
                <Paragraph editable={{onChange:onChange}} >
                {txt}
                </Paragraph>
            </div>
        )
}

export default editBox
