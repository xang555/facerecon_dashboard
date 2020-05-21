import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";

import HeaderBar from "./HeaderBar";
import SideBar from "./SideBar";
import Users from "./user/userIndex";
import { UnknownUser } from "./unknown_user/UnknownUser";
import { Monitor } from "./monitor/Monitor";
import { CCTV } from "./cctv/list";
import Know from "./know/Know";
const { Content } = Layout;
class Admin extends Component {
  state = {
    user: {},
    isLoad: false,
  };
  componentDidMount() {
    this.setState({ isLoad: true });
  }
  render() {
    let style = {
      marginLeft: 200,
    };
    if (this.props.collapsed) {
      style = {
        marginLeft: 80,
      };
    }
    return (
      <>
        {this.state.isLoad && (
          <Layout style={{ minHeight: "100vh", fontFamily: "Phetsarath OT" }}>
            <SideBar />
            <Layout id="content" style={style}>
              <HeaderBar {...this.props} state={this.state.user} />
              <Content
                style={{
                  margin: 24,
                }}
              >
                <Switch>
                  <Route path="/admin/users" component={Users} />
                  <Route path="/admin/know" component={Know} />
                  <Route path="/admin/unknown" component={UnknownUser} />
                  <Route path="/admin/monitor" exact component={Monitor} />
                  <Route path="/admin/cctv" component={CCTV} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        )}
      </>
    );
  }
}
const mapStateToProp = (state) => {
  return {
    collapsed: state.collapsed,
  };
};
export default connect(mapStateToProp)(Admin);
