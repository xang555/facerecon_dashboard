import React, { Component, Fragment } from "react";
import { Card, Row, Col, Table, Modal, Button } from "antd";
import AddUser from "./AddUser";
import { axiosInstant } from "../../service/axios";
import EditUser from "./EditUser";
class Users extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      visible: false,
      userData: null,
    };
  }
  fetchData = (url) => {
    axiosInstant
      .get(url)
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((err) => {
        // TODO: fixxx
      });
  };
  componentDidMount() {
    this.fetchData("/user");
  }
  handleAddUserSubmit = ({ username, password }) => {
    axiosInstant
      .put("/user/add", {
        username,
        password,
      })
      .then((response) => {
        this.fetchData("/user");
      })
      .catch((error) => {});
  };
  handleUpdate = ({ user_id, level, username, password }) => {
    axiosInstant
      .patch(`/user/update`, {
        username,
        password,
        user_id,
        level,
      })
      .then((response) => {
        this.fetchData("/user");
        this.setState({ visible: false });
      })
      .catch((err) => {});
  };
  showModal = (e, userData) => {
    e.preventDefault();
    this.setState({
      visible: true,
      userData: userData,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Action",
        dataIndex: "setting",
        key: "setting",
        render: (item) => {
          return (
            <span>
              <Button type="link" onClick={(e) => this.showModal(e, item)}>
                Edit
              </Button>
            </span>
          );
        },
      },
    ];
    return (
      <Fragment>
        <div className="gutter-example">
          <Row gutter={24}>
            <Col className="gutter-row" md={12} style={{ marginBottom: 20 }}>
              <Card title="User List" bordered={false}>
                <Table
                  columns={columns}
                  dataSource={this.state.items.map((item, index) => {
                    return {
                      key: index,
                      username: item.username,
                      setting: item,
                    };
                  })}
                />
              </Card>
            </Col>
            <Col className="gutter-row" md={12}>
              <Card title="Add User" bordered={false}>
                <AddUser handleAddUserSubmit={this.handleAddUserSubmit} />
              </Card>
            </Col>
          </Row>
        </div>
        {this.showModal && (
          <Modal
            width="568px"
            visible={this.state.visible}
            title="Edit"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ fontFamily: "Phetsarath OT" }}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            destroyOnClose={true}
          >
            <EditUser
              handleUpdate={this.handleUpdate}
              userData={this.state.userData}
            />
          </Modal>
        )}
      </Fragment>
    );
  }
}
export default Users;
