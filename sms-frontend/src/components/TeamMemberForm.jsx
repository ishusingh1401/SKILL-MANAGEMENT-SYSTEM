import React, { Component } from "react";
import TeamMemberService from "../services/TeamMemberService";
import { Layout, Breadcrumb, message } from "antd";
import { Redirect } from "react-router-dom";
import FooterComponent from "./FooterComponent";

const { Content } = Layout;

export default class TeamMemberForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userTeamName: "",
    };
    this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
    this.changeUserTeamNameHandler = this.changeUserTeamNameHandler.bind(this);
    this.addMember = this.addMember.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  addMember = (e) => {
    e.preventDefault();
    let teamMember = {
      userTeamName: this.state.userTeamName,
    };
    TeamMemberService.UpdateTeamName(this.state.userName, teamMember).then(
      (res) => {
        if (res.data === true) {
          message.success("Team Name of " + this.state.userName + " updated");
        }
        else {
          message.error("Username doesn't exist in the database!")
        }
        this.setState({ userName: "" });
        this.setState({ userTeamName: "" });
      }
    );


  };
  cancel() {
    message.error("Update Cancelled");
  }
  changeUserNameHandler = (event) => {
    this.setState({ userName: event.target.value });
  };

  changeUserTeamNameHandler = (event) => {
    this.setState({ userTeamName: event.target.value });
  };

  render() {
    if (
      localStorage.getItem("user") == null ||
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
              <div className="container" style={{ marginTop: "50px" }}>
                <div className="row">
                  <div className="card col-md-6 offset-md-3 shadow rounded pt-3">
                    <h3 className="text-center">Team Member Form</h3>
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
                          <label className="mb-2">Team Name:</label>
                          <input
                            placeholder="Team Name"
                            name="userTeamName"
                            className="form-control"
                            value={this.state.userTeamName}
                            onChange={this.changeUserTeamNameHandler}
                          />
                        </div>
                        <div className="mt-4"
                          style={{ textAlign: "center" }}
                        >
                          <button
                            className="btn btn-success"
                            type="submit"
                            disabled={
                              this.state.userName && this.state.userTeamName
                                ? false
                                : true
                            }
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
