import React from "react";
import { Modal } from "antd";
import { useState } from "react";
import { Form, Input, Button } from "antd";
import { axiosInstant } from "../../service/axios";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};
const _EditCamera = (props) => {
  const [visible, setVisible] = useState(true);
  const handleCancel = (e) => {
    setVisible(false);
    props.closeModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const data = { camera_id: props.item.camera_id, ...values };
        axiosInstant()
          .patch("/camera/update", data)
          .then((res) => {
            props.form.resetFields();
            props.handleInsert();
          });
      }
    });
  };
  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Modal
        title="Edit Camera"
        visible={visible}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={handleCancel}
        style={{ top: 20 }}
      >
        <Form {...layout} onSubmit={handleSubmit}>
          <Form.Item label={<span>Camera Code</span>}>
            {getFieldDecorator("camera_code", {
              initialValue: props.item.cameraCode,
              rules: [
                {
                  required: true,
                  message: "Camera code is invalid!",
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={<span>Camera Name</span>}>
            {getFieldDecorator("camera_name", {
              initialValue: props.item.cameraName,
              rules: [
                {
                  required: true,
                  message: "Camera Name is invalid!",
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={<span>Room name</span>}>
            {getFieldDecorator("room_name", {
              initialValue: props.item.roomName,
              rules: [
                {
                  required: true,
                  message: "Room name is invalid!",
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={<span>Username</span>}>
            {getFieldDecorator("user_name", {
              initialValue: props.item.username,
              rules: [
                {
                  required: true,
                  message: "Username is invalid!",
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={<span>Password</span>}>
            {getFieldDecorator("password", {
              initialValue: props.item.password,
              rules: [
                {
                  required: true,
                  message: "Password is invalid!",
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={<span>IP</span>}>
            {getFieldDecorator("ip", {
              initialValue: props.item.ip,
              rules: [
                {
                  required: true,
                  message: "IP is invalid!",
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={<span>Port</span>}>
            {getFieldDecorator("port", {
              initialValue: props.item.port,
              rules: [
                {
                  required: true,
                  message: "Port is invalid!",
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export const EditCamera = Form.create()(_EditCamera);
