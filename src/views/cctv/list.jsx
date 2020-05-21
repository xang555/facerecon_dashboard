import React, { useEffect } from "react";
import { Row, Col, Card, Icon, Table, Button, Divider, Modal } from "antd";
import { useState } from "react";
import { AddCamera } from "./add";
import { EditCamera } from "./edit";
import { axiosInstant } from "../../service/axios";
const { confirm } = Modal;

export const CCTV = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [item, setItem] = useState({});
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = (url) => {
    axiosInstant
      .get(url)
      .then((res) => {
        setItems(res.data);
        setIsLoading(true);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    fetchData("/camera/lists");
  }, []);
  const handleInsert = () => {
    closeModal(false);
    fetchData("/camera/lists");
  };
  const closeModal = (action) => {
    setEditModal(action);
    setAddModal(action);
  };
  function showDeleteConfirm(item) {
    confirm({
      title: "Are you sure delete this Camera?",
      icon: "exclamation",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axiosInstant
          .delete("/camera/delete", {
            data: {
              camera_id: item.camera_id,
            },
          })
          .then(() => {
            fetchData("/camera/lists");
          });
      },
      onCancel() {},
    });
  }
  const columns = [
    {
      title: "Camera Code",
      dataIndex: "cameraCode",
      key: "cameraCode",
    },
    {
      title: "Name",
      dataIndex: "cameraName",
      key: "cameraName",
    },
    {
      title: "Room",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Port",
      dataIndex: "port",
      key: "port",
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
              onClick={() => {
                setEditModal(true);
                setItem(item);
              }}
            >
              Edit
            </Button>
            <Divider type="vertical"></Divider>
            <Button type="link" onClick={() => showDeleteConfirm(item)}>
              Delete
            </Button>
          </span>
        );
      },
    },
  ];
  return (
    <>
      <Row>
        <Col span={24}>
          <Card
            title={
              <>
                {" "}
                <Icon type="user"></Icon> Camera
              </>
            }
            extra={
              <Button
                onClick={() => {
                  setAddModal(true);
                }}
              >
                Add Camera
              </Button>
            }
          >
            {isLoading && (
              <Table
                columns={columns}
                dataSource={items.map((item, index) => {
                  return {
                    key: index,
                    cameraCode: item.cameraCode,
                    cameraName: item.cameraName,
                    roomName: item.roomName,
                    username: item.username,
                    ip: item.ip,
                    port: item.port,
                    setting: item,
                  };
                })}
              />
            )}
          </Card>
        </Col>
      </Row>
      {addModal && (
        <AddCamera closeModal={closeModal} handleInsert={handleInsert} />
      )}
      {editModal && (
        <EditCamera
          closeModal={closeModal}
          handleInsert={handleInsert}
          item={item}
        />
      )}
    </>
  );
};
