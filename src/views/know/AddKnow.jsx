import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Radio } from 'antd';
const styles = {
  lineHeight: '1.5',
};
class AddKnow extends Component {
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
        this.props.handleAddUserSubmit({ ...values });
        this.props.form.resetFields();
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item label={<span>First Name</span>}>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'FirstName Is Invalid!',
                  whitespace: true,
                },
              ],
            })(<Input style={styles} />)}
          </Form.Item>
          <Form.Item label={<span>Last Name</span>}>
            {getFieldDecorator('lname', {
              rules: [
                {
                  required: true,
                  message: 'LastName Is Invalid!',
                  whitespace: true,
                },
              ],
            })(<Input style={styles} />)}
          </Form.Item>
          <Form.Item label={<span>Age</span>}>
            {getFieldDecorator('age', {
              rules: [
                {
                  required: true,
                  message: 'Age Is Invalid!',
                  whitespace: true,
                },
              ],
            })(<Input style={styles} />)}
          </Form.Item>
          <Form.Item label="Gender">
            {getFieldDecorator('sex', {
              initialValue: 'MALE',
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
const RegisterUser = Form.create()(AddKnow);

export default RegisterUser;
