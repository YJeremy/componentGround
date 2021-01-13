import {
    Form, Input, Button, Select, Modal,
    InputNumber,
    Switch,
    message
} from 'antd';
import React from "react";
import ModalForm from './components/ModalForm'

const Demo =()=>{
  let curRow2={
    ip:'221',
    slaveid:'33'
  }
  const [visible, setVisible] = React.useState(false);
  const [curRow, setRow] = React.useState(curRow2);
  const [visible2, setVisible2] = React.useState(false);

  const onClose = ()=> {
    setVisible(false);
  }


return(
    <div>
        <Button
                onClick={() => {
                    setRow({ip:'44',slaveid:'33'})
                    setVisible(true)
                }}
            >
                Open Modal
          </Button>
            <Button
                onClick={() => {
                    setRow({ip:'44',slaveid:'55'})
                    setVisible2(true)
                }}
            >
                edit Modal
          </Button>
          <ModalForm visible={visible} setVisible={setVisible} curRow={curRow}/>
          <ModalForm visible={visible2} setVisible={setVisible2} curRow={curRow} isEdit={true} setRow={setRow}/>
    </div>
)

}
export default Demo
