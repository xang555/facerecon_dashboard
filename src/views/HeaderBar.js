import React, { Component } from "react";
import { Layout, Avatar, Menu, Dropdown, Icon, Button } from "antd";
import "../assets/css/custom.css";
const { Header } = Layout;
class HeaderBar extends Component {
  logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push("/login");
  };
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Button type="link" onClick={this.logout}>
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    );
    return (
      <Header style={{ background: "#fff", padding: 0 }}>
        <div className="profile">
          <Avatar size="large" icon="user" style={{ marginRight: "10px" }} />
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="link">
              Welcome {`${localStorage.getItem("username")}`}
              <Icon type="down" />
            </Button>
          </Dropdown>
        </div>
      </Header>
    );
  }
}
export default HeaderBar;
