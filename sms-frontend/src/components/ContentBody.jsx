import React from "react";
import { Redirect } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import FooterComponent from "./FooterComponent";
const { Content } = Layout;

const ContentBody = () => {
  if (localStorage.getItem("user") == null) {
    return <Redirect to="/403" />;
  } else {
    return (
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 900 }}
          >
            Main content will be displayed here.
          </div>
        </Content>
        <FooterComponent />
      </Layout>
    );
  }
};

export default ContentBody;
