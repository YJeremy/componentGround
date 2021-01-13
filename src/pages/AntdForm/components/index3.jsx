
import { Form, Input, Button, Select,Modal } from 'antd';
import React from "react";



// 通过代码给 form 来填充值，即代码控制调用form ,
// 控制 form 的虚拟DOM， 写入一些 form.item 内容， 后面再渲染
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


const Demo = () => {
  const [form] = Form.useForm();// 从Form 组件库创建form的虚拟Dom
  const [visible, setVisible] = React.useState(false);

  const onGenderChange = value => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        return;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        return;
      case "other":
        form.setFieldsValue({ note: "Hi there!" });
        return;
    }
  };

  const onFinish = values => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  const onClose = ()=> {
    setVisible(false);
  }

  const onHandle = async ()=>{
      const fieldsValue = await form.validateFields().catch(e=>e);
      const a = fieldsValue.note
      console.info('clickONok',a)
      setVisible(false);
  }

  return (
      <div>
          <Button
            onClick= {()=>{
                setVisible(true)
            }}
          >
                Open Modal
          </Button>

          <Modal
          visible={visible} onOk={onHandle} onCancel={onClose}
          destroyOnClose
          >

         <Form {...layout}
         form={form} name="control-hooks" onFinish={onFinish}
         preserve ={false}
         >


        <Form.Item name="note" label="Note" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) => {
          return getFieldValue('gender') === 'other' ? (
            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>

          </Modal>

      </div>

  );
};

export default Demo
