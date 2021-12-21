import axios from "axios";
import React, { Component } from "react";
import { Layout, Breadcrumb, message } from "antd";
import { Redirect } from "react-router-dom";
import FooterComponent from "./FooterComponent";

const { Content } = Layout;
class TeamListDropdown extends Component {
  state = {
    teams: [],
    selectedTeam: "",
    validationError: "",
    users: [],
    previousTeam: "",
  };

  fetchTeamListData() {
    let teamListData = [];
    const { user, jwtToken } = JSON.parse(localStorage.getItem("user"));


    let config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    fetch("http://localhost:8080/teamName", config)
      .then((response) => {
        teamListData = response.json();
        return teamListData;
      })
      .then((data) => {
        let teamsFromApi = data.map((team) => {
          return { value: team, display: team };
        });
        this.setState({
          teams: [
            {
              value: "",
              display: "Select a Team to View Team Members: ",
            },
          ].concat(teamsFromApi),
        });
      })
      .catch((error) => {
        message.error("Something went wrong")
      });
  }

  fetchTeamMemberDetails() {
    let teamMemberDetails = [];
    const { user, jwtToken } = JSON.parse(localStorage.getItem("user"));


    let config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    axios
      .get(
        "http://localhost:8080/teamMembers/" + this.state.selectedTeam,
        config
      )
      .then((res) => {
        this.setState({
          users: res.data,
        });
      })
      .catch((e) => {
        message.error("Something went wrong")
      });
    this.state.previousTeam = this.state.selectedTeam;
    return teamMemberDetails;
  }

  componentDidMount() {
    this.fetchTeamListData();
  }

  componentDidUpdate() {
    if (
      this.state.selectedTeam !== "" &&
      this.state.previousTeam !== this.state.selectedTeam
    ) {
      this.fetchTeamMemberDetails();
    }
  }

  populateTeams(event) {
    this.setState({
      selectedTeam: event.target.value,
      validationError:
        event.target.value === "" ? "* You must select a team" : "",
    });
  }

  populateSelectOptions() {
    return this.state.teams.map((team) => (
      <option key={team.value} value={team.value}>
        {team.display}
      </option>
    ));
  }

  populateTableHeaders() {
    return (
      <tr>
        <th>S.No.</th>
        <td>User Name</td>
        <td>First Name</td>
        <td>Last Name</td>
        <td>Role</td>
        <td>Skills(Name,Level,Category)</td>
      </tr>
    );
  }

  populateSkillTable(item) {
    return (
      <table className="table table-bordered  table-striped table-dark">
        <tbody>
          {item.userSkill.map((data) => (
            <tr>
              <td>{data.skillName}</td>
              <td>{data.skillLevel}</td>
              <td>{data.skillCategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  populateTableBody() {
    return this.state.users.map((item, i) => (
      <tr key={i}>
        <th> {i + 1} </th>
        <td> {item.userName} </td>
        <td> {item.userFirstName} </td>
        <td> {item.userLastName} </td>
        <td> {item.userRole} </td>
        <td> {this.populateSkillTable(item)} </td>
      </tr>
    ));
  }

  getTeamDetailComponent() {
    return (
      <div
        className="ViewTeamList"
        align="center"
        hidden={this.state.selectedTeam === ""}
      >
        <table className="table table-bordered table-striped table-dark">
          <thead>{this.populateTableHeaders()}</thead>
          <tbody>{this.populateTableBody()}</tbody>
        </table>
      </div>
    );
  }

  getTeamListComponent() {
    return (
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
          </Breadcrumb>
          <div align="center"
            className="site-layout-background justify-content-center"
            style={{ padding: 24, minHeight: 900 }}
          >
            <div align="center" className="col-md-4 mb-5">
              <h1>
                Team List
              </h1>
              <br />
              <select className="form-select"
                value={this.state.selectedTeam}
                onChange={(e) => this.populateTeams(e)}
              >
                {this.populateSelectOptions()}
              </select>
              <div className="mt-3" style={{ color: "red", marginTop: "5px" }}>
                {this.state.validationError}
              </div>
            </div>
            {this.getTeamDetailComponent()}
          </div>
        </Content>
      </Layout>
    );
  }

  render() {
    if (
      localStorage.getItem("user") == null ||
      JSON.parse(localStorage.user).user.userRole === "TeamMember"
    ) {
      return <Redirect to="/403" />;
    } else {
      return (
        <div style={{ minHeight: "100vh", width: "-webkit-fill-available" }}>
          {this.getTeamListComponent()}
          <FooterComponent />
        </div>
      );
    }
  }
}

export default TeamListDropdown;
