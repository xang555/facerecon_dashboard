import React, { Component } from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  Col,
  Row,
  Card,
  Alert,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { axiosInstant } from "../../service/axios";
import LocalStorageService from "../../service/LocalStorageService";
import face_recon_logo_2020 from "../../assets/images/security.svg";
const { Title } = Typography;

/**
 * Login page
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /* handle button submit for login to system */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axiosInstant()
          .post("/login", values)
          .then((response) => {
            localStorage.setItem("username", values.username);
            LocalStorageService.setToken(response.data);
            this.props.history.push("/admin/monitor");
          })
          .catch((e) => {
            this.setState({ visable: true });
          });
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
          <Card title="Login">
            {this.state.visable ? (
              <Alert
                message="Username or Password not correct"
                type="error"
                closable
                afterClose={() => this.setState({ visable: false })}
              />
            ) : null}
            <Form
              onSubmit={this.handleSubmit}
              className="login-form"
              style={{ top: "50%" }}
            >
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "Please input Email!" }],
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="UserName"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input Password!" },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
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
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <div className="mg-top-10" style={{ textAlign: "center" }}>
            <Link to="/setting">App setting</Link>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(Login);
