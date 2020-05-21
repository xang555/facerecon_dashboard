import React, { Component, Fragment } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Modal,
  Button,
  Divider,
  notification,
} from "antd";
import AddKnow from "./AddKnow";
import { axiosInstant } from "../../service/axios";
import EditKnow from "./EditKnow";
import { UploadKnow } from "./UploadKnow";
import { ImageDetail } from "./ImageDetail";
const { confirm } = Modal;
class Know extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      visible: false,
      userData: null,
      showUpload: false,
      showImageDetail: false,
      item: {},
    };
  }
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message,
    });
  };
  showConfirm = () => {
    confirm({
      title: "Do you want to deploy your data?",
      content: "When clicked the OK button, this dialog will be  process",
      onOk: () => {
        return axiosInstant
          .post(`/know/train/run`)
          .then((res) => {
            this.openNotificationWithIcon(
              "success",
              "Train Model Successfully"
            );
          })
          .catch((error) => {
            this.openNotificationWithIcon("error", "Can not deploy data");
          });
      },
      onCancel() {},
    });
  };
  closeUpload = (type) => {
    this.setState({ showUpload: false });
  };
  closeImageDetail = (type) => {
    this.setState({ showImageDetail: false });
  };
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
    this.fetchData("/know/all");
  }
  handleAddUserSubmit = ({ name, lname, sex, age }) => {
    axiosInstant
      .put("/know/add", {
        name,
        lname,
        sex,
        age,
      })
      .then((response) => {
        this.fetchData("/know/all");
      })
      .catch((error) => {});
  };
  handleUpdate = ({ kp_id, name, lname, sex, age }) => {
    axiosInstant
      .patch(`/know/update`, {
        kp_id,
        name,
        lname,
        sex,
        age,
      })
      .then((response) => {
        this.fetchData("/know/all");
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
  deleteItem = (item) => {
    axiosInstant
      .delete("/know/delete", {
        data: {
          kp_id: item.kp_id,
        },
      })
      .then(() => {
        this.fetchData("/know/all");
      });
  };
  showDeleteConfirm(item) {
    confirm({
      title: "Are you sure delete this Know User?",
      icon: "exclamation",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        this.deleteItem(item);
      },
      onCancel() {},
    });
  }
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
        render: (val) => <span>{val === "m" ? "Male" : "Female"}</span>,
      },
      {
        title: "Images",
        dataIndex: "images",
        key: "images",
        render: (item) => {
          return (
            <span>
              <Button
                type="link"
                onClick={(e) => this.setState({ item, showImageDetail: true })}
              >
                Images
              </Button>
            </span>
          );
        },
      },
      {
        title: "Setting",
        dataIndex: "setting",
        key: "setting",
        render: (item) => {
          return (
            <span>
              <Button
                type="link"
                onClick={(e) => this.setState({ item, showUpload: true })}
              >
                Upload
              </Button>
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
            <Col className="gutter-row" md={14} style={{ marginBottom: 20 }}>
              <Card
                title="Know People"
                bordered={false}
                extra={
                  <>
                    {" "}
                    <Button
                      type="primary"
                      icon="save"
                      onClick={(e) => this.showConfirm()}
                    >
                      Deploy
                    </Button>{" "}
                  </>
                }
              >
                <Table
                  columns={columns}
                  dataSource={this.state.items.map((item, index) => {
                    return {
                      key: index,
                      name: `${item.name} ${item.lname}`,
                      age: item.age,
                      gender: item.sex,
                      images: item,
                      setting: item,
                    };
                  })}
                />
              </Card>
            </Col>
            <Col className="gutter-row" md={10}>
              <Card title="Add Know People" bordered={false}>
                <AddKnow handleAddUserSubmit={this.handleAddUserSubmit} />
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
            <EditKnow
              handleUpdate={this.handleUpdate}
              userData={this.state.userData}
            />
          </Modal>
        )}
        {this.state.showUpload && (
          <UploadKnow item={this.state.item} closeUpload={this.closeUpload} />
        )}
        {this.state.showImageDetail && (
          <ImageDetail
            item={this.state.item}
            closeImageDetail={this.closeImageDetail}
          />
        )}
      </Fragment>
    );
  }
}
export default Know;
