import React, { useState, useEffect } from "react";
import { Modal, List, Avatar, Button } from "antd";
import { axiosInstant } from "../../service/axios";
export const ImageDetail = (props) => {
  const [visible, setVisible] = useState(true);
  const [images, setImages] = useState([]);
  const item = props.item;
  const id = props.item.kp_id;
  const changeImage = (value) => {
    const blob = new Blob([value.data]);
    const base64 = URL.createObjectURL(blob);
    // return `data:;base64,${base64}`;
    return base64;
  };
  useEffect(() => {
    axiosInstant()
      .get(`/know/train/img/${id}`)
      .then((res) => {
        const images = res.data.images;
        return images;
      })
      .then((images) => {
        const fetchImage = images.map((image) =>
          axiosInstant().get(`/know/train/img/${item.kp_id}/${image}`, {
            responseType: "arraybuffer",
          })
        );
        Promise.all(fetchImage).then((values) => {
          const result = values.map((value) => {
            const url = value.config.url;
            const name = images.find((image) => url.includes(image));
            return {
              image: changeImage(value),
              name,
            };
          });
          setImages(result);
        });
      })
      .catch((error) => {});
  }, [id, item]);
  const handleCancel = () => {
    setVisible(false);
    props.closeImageDetail();
  };
  const deleteImage = (name) => {
    axiosInstant()
      .delete(`/know/train/img/${item.kp_id}/${name}`)
      .then((res) => {
        const newImages = images.filter((image) => name !== image.name);
        setImages(newImages);
      });
  };
  return (
    <Modal
      width="568px"
      visible={visible}
      title="Upload Image"
      onCancel={handleCancel}
      style={{ fontFamily: "Phetsarath OT" }}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      destroyOnClose={true}
    >
      <List
        itemLayout="horizontal"
        dataSource={images}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="link"
                icon="delete"
                key="list-loadmore-edit"
                onClick={(e) => deleteImage(item.name)}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar shape="square" size={64} src={item.image} />}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};
