import React, { useState } from "react";
import { Modal, Upload, Button, Form, Spin } from "antd";
import { axiosInstant } from "../../service/axios";
const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};
const _UploadKnow = (props) => {
  const [visible, setVisible] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [cancel, setCancel] = useState(true);
  const handleCancel = () => {
    if (cancel) {
      setVisible(false);
      props.closeUpload();
    }
  };
  const setFile = (prop) => {
    setFileList([...fileList, prop]);
  };

  const onRemove = (prop) => {
    const files = fileList.filter((item) => item.uid !== prop.uid);
    setFileList(files);
  };
  const propsImage = {
    listType: "picture",
    name: "train_img",
    showUploadList: true,
    customRequest: dummyRequest,
    beforeUpload: setFile,
    onRemove: onRemove,
    disabled: disabled,
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setUploading(true);
    setDisabled(true);
    setCancel(false);
    let formData = new FormData();
    fileList.forEach((element) => {
      formData.append("train_img", element);
    });
    axiosInstant()({
      method: "post",
      url: `/know/train/upload/${props.item.kp_id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      props.closeUpload();
    });
  };
  return (
    <Modal
      width="568px"
      visible={visible}
      title="Upload Image"
      onCancel={handleCancel}
      onOk={handleSubmit}
      style={{ fontFamily: "Phetsarath OT" }}
      okButtonProps={{ disabled: disabled }}
      cancelButtonProps={{ hidden: true }}
      destroyOnClose={true}
    >
      <Spin tip="Uploading..." spinning={uploading}>
        <Form>
          <Form.Item name="train_img">
            <Upload {...propsImage}>
              <Button>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export const UploadKnow = Form.create()(_UploadKnow);
