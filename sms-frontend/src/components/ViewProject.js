import React, { Component } from "react";

import ViewProjectForm from "../services/ViewProjectForm";
import { Breadcrumb, Layout } from "antd";
import FooterComponent from "./FooterComponent";
const { Content } = Layout;

export class ViewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Projects: [],
    };
  }

  componentDidMount() {
    ViewProjectForm.ViewProject().then((res) => {
      this.setState({ Projects: res.data });
    });
  }
  render() {
    return (
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 900 }}
          >
            <div className="card col-md-8 m-auto">
              <div className="text-center">
                <h1>Project List</h1>
              </div>
              <table className="table table-bordered  table-striped table-dark ">
                <thead>
                  <tr>
                    <th>S.no </th>
                    <th>Project Name</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.Projects.map((Project, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>

                      <td>{Project.projectName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Content>
        <FooterComponent />
      </Layout>
    );
  }
}
