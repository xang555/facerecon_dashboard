import React, { Component, Fragment } from "react";
import { Card, Row, Col, Table, Modal, Button, Divider, message } from "antd";
import AddUser from "./AddUser";
import { axiosInstant } from "../../service/axios";
import EditUser from "./EditUser";
const { confirm } = Modal;

class Users extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      visible: false,
      userData: null,
    };
  }
  /**
   * fetch user
   */
  fetchData = (url) => {
    axiosInstant()
      .get(url)
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((err) => {
        message.error("Fetch users Failed!");
      });
  };

  componentDidMount() {
    this.fetchData("/user");
  }

  /**
   * add user
   */
  handleAddUserSubmit = ({ username, password }) => {
    axiosInstant()
      .put("/user/add", {
        username,
        password,
      })
      .then((response) => {
        this.fetchData("/user");
      })
      .catch((error) => {
        message.error("Add user Failed!");
      });
  };

  /**
   * update user
   */
  handleUpdate = ({ user_id, level, username, password }) => {
    axiosInstant()
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
      .catch((err) => {
        message.error("Update user Failed!");
      });
  };

  /**
   * delete user
   */
  deleteUser = (item) => {
    axiosInstant()
      .delete("/user/delete", {
        data: {
          user_id: item.user_id,
        },
      })
      .then(() => {
        this.fetchData("/user");
      })
      .catch(() => {
        message.error("Delete user Failed!");
      });
  };

  /**
   * show delete dialog
   */
  showDeleteConfirm(item) {
    confirm({
      title: "Are you sure delete this User?",
      icon: "exclamation",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        this.deleteUser(item);
      },
      onCancel() {},
    });
  }

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
              <Divider type="vertical" />
              <Button type="link" onClick={(e) => this.showDeleteConfirm(item)}>
                Delete
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
