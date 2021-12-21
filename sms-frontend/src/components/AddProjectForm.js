import React, { Component } from "react";
import ProjectService from "../services/ProjectService";
import { Layout, Breadcrumb, message } from "antd";
import { Redirect } from "react-router-dom";
import FooterComponent from "./FooterComponent";

const { Content } = Layout;

export class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
    };
  }

  changeProjectNameHandler = (event) => {
    this.setState({ projectName: event.target.value });
  };
  saveProject = async (event) => {

    event.preventDefault();
    let project = { projectName: this.state.projectName }
    ProjectService.AddProject(project).then((res) => {
      this.setState({ projectName: "" });
      message.info(res.data)
    });

  }

  render() {
    if (
      localStorage.getItem("user") === null ||
      JSON.parse(localStorage.user).user.userRole === "Admin" ||
      JSON.parse(localStorage.user).user.userRole === "TeamMember"
    ) {
      return <Redirect to="/403" />;
    } else {
      return (
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 900 }}
            >
              <div className="container " >
                <div className="row">
                  <div className="card col-md-6 offset-md-3 shadow p-3 mb-5 bg-white rounded ">
                    <h3 className="text-center mt-3">Add Project</h3>
                    <div className="card-body ">
                      <form onSubmit={this.saveProject}>
                        <div className="form-group mb-2">
                          <label>Project Name: </label>

                          <input
                            placeholder="Project Name"
                            name="projectname"
                            className="form-control my-2"
                            value={this.state.projectName}
                            onChange={this.changeProjectNameHandler}
                          ></input>
                        </div>
                        <div className="d-flex justify-content-center my-3">
                          <button
                            className="btn btn-success"
                            type="submit"
                            disabled={this.state.projectName ? false : true}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Content>
          <FooterComponent />
        </Layout>
      );
    }
  }
}
