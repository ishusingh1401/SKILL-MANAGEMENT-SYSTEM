import React, { Component } from "react";
import AssignProjectService from "../services/AssignProjectService";
import { Layout, Breadcrumb, message } from "antd";
import { Redirect } from 'react-router-dom';
import FooterComponent from "./FooterComponent";
const { Content } = Layout;
export default class UpdateProjectUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userProjectName: "",
    };
    this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
    this.changeUserProjectNameHandler = this.changeUserProjectNameHandler.bind(this);
    this.addMember = this.addMember.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  addMember = (e) => {
    e.preventDefault();
    let projectMember = {
      userProjectName: this.state.userProjectName
    };
    AssignProjectService.UpdateProjectName(this.state.userName, projectMember).then(
      (res) => {

        if (res.data === true) {
          message.success("Project Name of " + this.state.userName + " updated");
        }
        else {
          message.error("Username doesn't exist in database!")
        }
        this.setState({ userName: "" });
        this.setState({ userProjectName: "" });
      }
    );
  };

  cancel() {
    message.error("Update Cancelled");
  }
  changeUserNameHandler = (event) => {
    this.setState({ userName: event.target.value });
  };

  changeUserProjectNameHandler = (event) => {
    this.setState({ userProjectName: event.target.value });
  };

  render() {
    if (localStorage.getItem('user') === " " || JSON.parse(localStorage.user).user.userRole === "Admin" ||
      JSON.parse(localStorage.user).user.userRole === "TeamMember") {
      return <Redirect to='/403' />
    }
    else {
      return (
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 900 }}
            >
              <div className="container" style={{ marginTop: "50px" }}>

                <div className="row">
                  <div className="card col-md-6 offset-md-3 shadow p-3 mb-5 bg-white rounded">
                    <h3 className="text-center">Update Project Form</h3>
                    <div className="card-body">
                      <form onSubmit={this.addMember}>
                        <div className="form-group mb-3">
                          <label className="mb-2">User Name:</label>
                          <input
                            placeholder="User Name"
                            name="userName"
                            className="form-control"
                            value={this.state.userName}
                            onChange={this.changeUserNameHandler}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="mb-2">New Project Name:</label>
                          <input
                            placeholder="Project Name"
                            name=" userProjectName"
                            className="form-control"
                            value={this.state.userProjectName}
                            onChange={this.changeUserProjectNameHandler}
                          />
                        </div>
                        <div
                          style={{ textAlign: "center", marginTop: "10px" }}
                        >
                          <button
                            className="btn btn-success"
                            type="submit"
                            disabled={this.state.userName && this.state.userProjectName ? false : true}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={this.cancel}
                            style={{ marginLeft: "10px" }}
                          >
                            Cancel
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




