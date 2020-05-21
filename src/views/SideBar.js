import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, Icon } from "antd";
import logo from "../assets/images/security.svg";
import { SafetyOutlined, WarningOutlined } from "@ant-design/icons";

const { Sider } = Layout;
class SideBar extends Component {
  onCollapse = (collapsed) => {
    this.props.setCollapsed(collapsed);
  };
  render() {
    const { collapsed } = this.props;
    return (
      <Fragment>
        <Sider
          style={{
            overflowX: "hidden",
            overflowY: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
          collapsible={false}
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          breakpoint={"xl"}
        >
          <div className="logo pd-top-10 pd-left-15">
            <Link to="/admin/monitor">
              <img src={logo} style={{ height: "32px" }} alt="" />
              <span>FACE RECON</span>
            </Link>
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="3">
              <Link to="/admin/monitor">
                <Icon type="desktop"></Icon>
                <span>Monitor</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="8">
              <Link to="/admin/cctv">
                <Icon type="camera"></Icon>
                <span>Camera</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="6">
              <Link to="/admin/know">
                <SafetyOutlined />
                <span>Known People</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="5">
              <Link to="/admin/unknown">
                <WarningOutlined />
                <span>Unknown People</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="7">
              <Link to="/admin/users">
                <Icon type="user"></Icon>
                <span>User</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </Fragment>
    );
  }
}
const mapStateToProp = (state) => {
  return {
    collapsed: state.collapsed,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCollapsed: (collapsed) => {
      dispatch({
        type: "setCollapsed",
        payload: collapsed,
      });
    },
  };
};
export default connect(mapStateToProp, mapDispatchToProps)(SideBar);
