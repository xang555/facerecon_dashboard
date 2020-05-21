import React, { useState } from "react";
import { Row, Col, Card, Icon, Table } from "antd";
import UnknownSearch from "./UnknownSearch";
import moment from "antd/node_modules/moment";
import { endpoint } from "../../config";

export const UnknownUser = () => {
  const [items, setItems] = useState([]);
  const image = (text) => {
    return (
      <img
        src={`${endpoint()}/access/image/${text}?token=${localStorage.getItem(
          "access_token"
        )}`}
        alt=""
        style={{ width: 100 }}
      />
    );
  };
  const columns = [
    {
      title: "Camera Name",
      dataIndex: "cameraName",
      key: "cameraName",
    },
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Date Time",
      dataIndex: "detected_time",
      key: "detected_time",
      render: (text) => moment(text).format("DD/MM/YYYY H:mm:ss"),
    },
    {
      title: "Face Image",
      dataIndex: "face_image_path",
      key: "face_image_path",
      render: (text) => image(text),
    },
    {
      title: "Full Image",
      dataIndex: "cap_full_image_path",
      key: "cap_full_image_path",
      render: (text) => image(text),
    },
  ];
  const setData = (data) => {
    const result = data.map((item, index) => {
      return {
        key: index,
        cameraName: item.cameraName,
        roomName: item.roomName,
        detected_time: item.detected_time,
        cap_full_image_path: item.cap_full_image_path,
        face_image_path: item.face_image_path,
      };
    });
    setItems(result);
  };
  return (
    <Row>
      <Col span={24}>
        <UnknownSearch setData={setData} />
      </Col>
      <Col span={24}>
        <Card
          title={
            <>
              {" "}
              <Icon type="user"></Icon> Unknown People
            </>
          }
        >
          <Table columns={columns} dataSource={items} />
        </Card>
      </Col>
    </Row>
  );
};
