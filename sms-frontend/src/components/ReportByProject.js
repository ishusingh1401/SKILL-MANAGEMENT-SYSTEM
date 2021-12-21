import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb, Layout, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import FooterComponent from "./FooterComponent";
import CustomNoRowsOverlay from "./NoRowsComp";
const { Content } = Layout;

const { Option } = Select;

const columns = [
  { field: "skillName", headerName: "Skill Name", width: 400 },
  { field: "totalusers", headerName: "No. of Users", width: 400 },
  { field: "averageskill", headerName: "Average Skill Level", width: 400 },
];

const DataTableProject = () => {
  const [tableData, setTableData] = useState([]);
  const [projects, setProjects] = useState([]);

  const { jwtToken } = JSON.parse(localStorage.getItem("user"));

  let config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const fetchProject = () => {
    fetch("http://localhost:8080/viewProjects", config)
      .then((data) => data.json())
      .then((data) => {
        setProjects(data);
      });
  };

  const renderOptions = () => {
    return projects.map((items) => {
      return (
        <Option value={items.projectName}>
          {items.projectName.toUpperCase()}
        </Option>
      );
    });
  };

  const handleChange = (e) => {
    fetchDetails(e);
  };

  const fetchDetails = (projectName) => {
    fetch(
      `http://localhost:8080/generateReportByProject/${projectName}`,
      config
    )
      .then((data) => data.json())
      .then((data) => {
        setTableData(data.teamskillsReport);
      });
  };

  useEffect(() => {
    fetchProject();
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
            className="site-layout-background" align="center"
            style={{ padding: 24, minHeight: 900 }}
          >
            <div style={{ height: 700, width: "80%", margin: 50 }}>
              <h3>Select Projects</h3>
              <Select style={{ width: 120 }} onChange={handleChange} className="mb-4">
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

export default DataTableProject;
