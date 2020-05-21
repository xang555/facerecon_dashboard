import React, { Component, Fragment } from 'react';
import { Form, Input, Button } from 'antd';
class EditUser extends Component {
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
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  render() {
    const { userData } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item style={{ display: 'none' }}>
            {getFieldDecorator('user_id', {
              initialValue: userData.user_id,
            })(<Input type="hidden" />)}
          </Form.Item>
          <Form.Item style={{ display: 'none' }}>
            {getFieldDecorator('level', {
              initialValue: 1,
            })(<Input type="hidden" />)}
          </Form.Item>
          <Form.Item label={<span>Name</span>}>
            {getFieldDecorator('username', {
              initialValue: userData.username,
              rules: [
                {
                  required: true,
                  message: 'Name is required!',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Passsword is required!',
                },
                { min: 8, message: 'password must have at least 8 characters' },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Confirm Password is required!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Submit
          </Button>
        </Form>
      </Fragment>
    );
  }
}

export default Form.create()(EditUser);
