import { Form, Input, InputNumber, Button, Row, Col } from 'antd';
import { Component, CSSProperties } from 'react';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

class InformationForm extends Component {
  onFinish = (values: any) => {
    console.log(values);
  };

  render() {
      return (
          <Row style={formContainerStyle}>
            <Col span={24} style={columnStyle}>
                <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
                <Form.Item name={['user', 'name']} label="Name" 
                    rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" 
                    rules={[{ type: 'email', required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'phone']} label="Phone" 
                    rules={[{ min: 10, max: 10, required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'steet']} label="Street" 
                    rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'zipcode']} label="Zip-code" 
                    rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'city']} label="City" 
                    rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2}}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
                </Form>
            </Col>
        </Row>
      );
    };
  }

  export default InformationForm;

  const formContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '80%',
    margin: 'auto'
}
const columnStyle: CSSProperties = {
    marginTop: '3rem',
    marginBottom: '3rem',
}