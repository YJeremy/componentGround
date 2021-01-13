import {
    Form, Input, Button, Select, Modal,
    InputNumber,
    Switch,
    message
} from 'antd';
import React from "react";

const SelectOption = Select.Option;
const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const ModalForm = (props) => {
    const [form] = Form.useForm();// 从Form 组件库创建form的虚拟Dom
    const {visible,setVisible,curRow,isEdit,confirmAddRow } = props
    const onClose = () => {
        setVisible(false);
    }
    const styles = {
        formLayout: {
            labelCol: { span: 7 },
            wrapperCol: { span: 13 },
        },
    };
    const onHandle = async () => {
        const v = await form.validateFields().catch(e => e);
        const curRow = {
            mach: {
                line: v.machline,
                model: v.machmodel,
                name: v.machname,
                sn: v.machsn,
            },
            comm: {
                ip: v.ip,
                modbus_port: v.modbus_port,
                slaveid: v.slaveid,
            },
            optional: {
                file_protocol: v.fileproto,
            },
            process: {
                finish: v.processfinish,
            },
            type:v.type,
        }
        if(! v.errorFields){
        confirmAddRow || ''
        setVisible(false);
        }
    }
    const deitForm = (curRow) =>{
    form.setFieldsValue({
      machline: curRow.mach? curRow.mach.line:'',
      machmodel: curRow.mach? curRow.mach.model:'',
      machname: curRow.mach? curRow.mach.name:'',
      machsn: curRow.mach? curRow.mach.sn:'',
      ip: curRow.com? curRow.com.ip:'',
      slaveid: curRow.com? curRow.com.slaveid:'',
      modbus_port: curRow.com? curRow.com.modbus_port:'',
      fileproto: curRow.optional ? curRow.optional.file_protocol :'',
      processfinish: curRow.process? curRow.process.finish:'',
      type:curRow.type,
    });
    }
     isEdit && deitForm(curRow)
    return (
            <Modal
                visible={visible} onOk={onHandle} onCancel={onClose}
                destroyOnClose={true}
                //forceRender={true}
            >
                <Form
                    form={form} name="control-hooks"
                    preserve={false}
                    initialValues={
                        {
                            ip:curRow ? curRow.ip : '',
                            slaveid:curRow? curRow.slaveid:'',
                        }
                    }
                >
                    <Form.Item
                        label="设备类型"
                        {...styles.formLayout}
                        name='type'
                        rules={[{ required: true, message: '请选择设备类型' }]}
                    >
                        <Select placeholder="请选择" >
                            <SelectOption value="cnc">机床 CNC</SelectOption>
                            <SelectOption value="robot">机器人</SelectOption>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="IP 地址" {...styles.formLayout}
                        name='ip'
                        rules={[{ required: true, message: '请输入ip地址' }]}
                    >
                        <Input
                            placeholder="x.x.x.x"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Modbus Port" {...styles.formLayout}
                        name='modbus_port'
                        rules={[{ required: true, message: '请输入 modbus 端口' }]}
                    >
                        <InputNumber
                            placeholder=""
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Slave ID"
                        {...styles.formLayout}
                        name='slaveid'
                        rules={[
                            { required: true, message: '请输入数字Slave ID' },
                        ]}
                    >
                        <InputNumber
                            placeholder=""
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="设备名称(可选填)"
                        {...styles.formLayout}
                        name="machname"
                        rules={[
                            { required: false, message: '请输入mach name！' },
                        ]}
                    >
                        <Input placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label="设备型号(可选填)"
                        {...styles.formLayout}
                        name="machmodel"
                        rules={[{ required: false, message: '请输入mach model！' }]}
                    >
                        <Input placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label="设备编号"
                        {...styles.formLayout}
                        name="machsn"
                        rules={[{ required: true, message: '请输入设备编号' }]}
                    >
                        <Input placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label="产线编号(可选填)"
                        {...styles.formLayout}
                        name="machline"
                        rules={[{ required: false, message: '请输入mach line！' }]}
                    >
                        <Input placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label="文件协议"
                        {...styles.formLayout}
                        name="fileproto"
                        rules={[
                            {
                                required: false,
                                message: '请输入文件协议: 默认协议/FTP 文件协议 (25i 设备请选择 ftp 协议)',
                            },
                        ]}
                    >
                        <Select
                        //placeholder="请输入文件协议: 默认协议/FTP 文件协议 (25i 设备请选择 ftp 协议)"
                        >
                            <SelectOption value="gskrm">默认协议</SelectOption>
                            <SelectOption value="ftp">FTP 文件协议</SelectOption>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="成品输出(可选填)"
                        name="processfinish"
                        rules={[{ required: false, message: '请输入成品选项！' }]}
                    >
                        <Switch
                            checkedChildren="开"
                            unCheckedChildren="关"
                        />
                    </Form.Item>
                </Form>
            </Modal>
    );
};

export default ModalForm
