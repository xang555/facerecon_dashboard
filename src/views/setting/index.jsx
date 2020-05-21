import React, { Component } from "react";
import {
  Form,
  notification,
  Input,
  Button,
  Col,
  Row,
  Card,
  Typography,
} from "antd";
import LocalStorageService from "../../service/LocalStorageService";
import face_recon_logo_2020 from "../../assets/images/security.svg";
import { ApiOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Title } = Typography;

/**
 * App setting page
 */
class AppSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /* handle button submit for login to system */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        LocalStorageService.setApiUrl(values.api_url);
        setTimeout(() => {
          notification.success({
            message: "App Setting",
            description: "Save Setting Success!",
          });
        }, 1000);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row style={{ fontFamily: "Phetsarath OT" }}>
        <Col
          md={{ span: 12, offset: 5 }}
          sm={{ span: 12, offset: 5 }}
          lg={{ span: 7, offset: 9 }}
          xl={{ span: 6, offset: 9 }}
        >
          <div
            className="mg-top-20 mg-bottom-20"
            style={{ width: "100%", textAlign: "center" }}
          >
            <img src={face_recon_logo_2020} alt="" width="150px" />
            <div className="mg-top-10">
              <Title level={2}>FaceRecon dashboard</Title>
            </div>
          </div>
          <Card title="App Setting">
            <Form
              onSubmit={this.handleSubmit}
              className="login-form"
              style={{ top: "50%" }}
            >
              <Form.Item>
                {getFieldDecorator("api_url", {
                  rules: [{ required: true, message: "Please input Api Url!" }],
                })(
                  <Input
                    prefix={
                      <ApiOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="API URL http://localhost:8080"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <div className="mg-top-10" style={{ textAlign: "center" }}>
            <Link to="/login">Sign In</Link>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(AppSetting);
