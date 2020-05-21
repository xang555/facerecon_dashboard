import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Radio } from 'antd';
class EditKnow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleUpdate({ ...values });
        this.props.form.resetFields();
      }
    });
  };
  render() {
    const { userData } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item style={{ display: 'none' }}>
            {getFieldDecorator('kp_id', {
              initialValue: userData.kp_id,
            })(<Input type="hidden" />)}
          </Form.Item>
          <Form.Item label={<span>First Name</span>}>
            {getFieldDecorator('name', {
              initialValue: userData.name,
              rules: [
                {
                  required: true,
                  message: 'FirstName Is Invalid!',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={<span>Last Name</span>}>
            {getFieldDecorator('lname', {
              initialValue: userData.lname,
              rules: [
                {
                  required: true,
                  message: 'LastName Is Invalid!',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={<span>Age</span>}>
            {getFieldDecorator('age', {
              initialValue: userData.age,
              rules: [
                {
                  required: true,
                  message: 'Age Is Invalid!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Gender">
            {getFieldDecorator('sex', {
              initialValue: userData.sex,
            })(
              <Radio.Group>
                <Radio value="m">Male</Radio>
                <Radio value="f">Female</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            ບັນທຶກ
          </Button>
        </Form>
      </Fragment>
    );
  }
}

export default Form.create()(EditKnow);
