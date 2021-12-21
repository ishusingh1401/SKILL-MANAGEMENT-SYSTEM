import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Redirect } from "react-router";
import { Select, Breadcrumb, Layout } from "antd";
import FooterComponent from "./FooterComponent";
import CustomNoRowsOverlay from "./NoRowsComp";
const { Content } = Layout;

const { Option } = Select;

const columns = [
  { field: "skillName", headerName: "Skill Name", width: 400 },
  { field: "totalusers", headerName: "No. of Users", width: 400 },
  { field: "averageskill", headerName: "Average Skill Level", width: 400 },
];

const DataTableTeam = () => {
  const [tableData, setTableData] = useState([]);
  const [teams, setTeams] = useState([]);

  const { jwtToken } = JSON.parse(localStorage.getItem("user"));

  let config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const fetchTeams = () => {
    fetch("http://localhost:8080/teamName", config)
      .then((data) => data.json())
      .then((data) => {
        setTeams(data);
      });
  };

  const renderOptions = () => {
    return teams.map((items) => {
      return <Option value={items}>{items.toUpperCase()}</Option>;
    });
  };

  const handleChange = (e) => {
    fetchDetails(e);
  };

  const fetchDetails = (teamName) => {
    fetch(`http://localhost:8080/generateReportByTeam/${teamName}`, config)
      .then((data) => data.json())
      .then((data) => {
        setTableData(data.teamReport);
      });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  if (
    localStorage.getItem("user") == null ||
    (JSON.parse(localStorage.user).user.userRole !== "SeniorManager" &&
      JSON.parse(localStorage.user).user.userRole !== "HR")
  ) {
    return <Redirect to="/403" />;
  } else {
    return (
      <Layout className="site-layout" align="center">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div
            className="site-layout-background"
            align="center"
            style={{ padding: 24, minHeight: 900 }}
          >
            <div style={{ height: 700, width: "80%", margin: 50 }}>
              <h3>Select Team</h3>
              <Select
                style={{ width: 120 }}
                onChange={handleChange}
                className="mb-4"
              >
                {renderOptions()}
              </Select>
              <DataGrid
                getRowId={(r) => r.skillName}
                rows={tableData}
                columns={columns}
                pageSize={10}
                className="shadow p-3 mb-5 bg-white rounded"
                components={{
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
                autoHeight={true}
              />
            </div>
          </div>
        </Content>
        <FooterComponent />
      </Layout>
    );
  }
};

export default DataTableTeam;
