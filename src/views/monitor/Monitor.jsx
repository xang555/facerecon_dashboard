import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Divider, Icon } from "antd";
import { axiosInstant } from "../../service/axios";
import { endpoint } from "../../config";
import "../../assets/css/custom.css";
export const Monitor = () => {
  const [cameras, setCameras] = useState([]);
  const [openLoading, setOpenLoading] = useState(false);
  const [stopLoading, setStopLoading] = useState(false);
  const [restartLoading, setRestartLoading] = useState(false);
  const [imageHash, setImageHash] = useState(Date.now());
  const fetch = (url) => {
    axiosInstant()
      .get(url)
      .then(({ data }) => {
        setCameras(data);
      });
  };
  useEffect(() => {
    fetch(`/camera/lists`);
  }, []);
  const cameraAction = (action, camera_id) => {
    switch (action) {
      case "start":
        setOpenLoading(true);
        break;
      case "stop":
        setStopLoading(true);
        break;
      case "restart":
        setRestartLoading(true);
        break;
      default:
        break;
    }
    axiosInstant()
      .post(`/monitor/camera/${action}/${camera_id}`)
      .then((res) => {
        setImageHash(Date.now());
        setOpenLoading(false);
        setStopLoading(false);
        setRestartLoading(false);
      })
      .catch((error) => {
        console.log("error");
      });
  };
  return (
    <Row>
      <Col span={24}>
        <Card title="Monitor">
          <Row>
            {cameras.map((camera) => {
              return (
                <Col
                  key={camera.camera_id}
                  span={12}
                  style={{ border: "3px solid green", minHeight: "300px" }}
                  className="image-container"
                >
                  <img
                    src={`${endpoint()}/monitor/feed_video/${
                      camera.camera_id
                    }?token=${localStorage.getItem(
                      "access_token"
                    )}&${imageHash}`}
                    style={{ width: "100%" }}
                    alt=""
                  />
                  <div className="overlay-image">
                    <div className="setting">
                      <div>
                        <h4 style={{ color: "green", fontWeight: "bold" }}>
                          {camera.roomName}
                        </h4>
                      </div>
                      <div>
                        <Button
                          type="primary"
                          onClick={(e) =>
                            cameraAction("start", camera.camera_id)
                          }
                        >
                          {openLoading && (
                            <Icon type="loading" theme="outlined" />
                          )}
                          Open
                        </Button>
                        <Divider type="vatical" />
                        <Button
                          type="warning"
                          onClick={(e) =>
                            cameraAction("restart", camera.camera_id)
                          }
                        >
                          {restartLoading && (
                            <Icon type="loading" theme="outlined" />
                          )}
                          Restart
                        </Button>
                        <Divider type="vatical" />
                        <Button
                          type="danger"
                          onClick={(e) =>
                            cameraAction("stop", camera.camera_id)
                          }
                        >
                          {stopLoading && (
                            <Icon type="loading" theme="outlined" />
                          )}
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
