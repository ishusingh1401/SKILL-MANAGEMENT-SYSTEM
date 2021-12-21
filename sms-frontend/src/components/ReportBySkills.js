import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import FooterComponent from "./FooterComponent";
import CustomNoRowsOverlay from "./NoRowsComp";

const { Content } = Layout;

const columns = [
  { field: "skillName", headerName: "Skill Name", width: 400 },
  { field: "users", headerName: "No. of Users", width: 400 },
  { field: "avgSkillLevel", headerName: "Average Skill Level", width: 400 },
];

const DataTable = () => {
  const [tableData, setTableData] = useState([]);

  const { jwtToken } = JSON.parse(localStorage.getItem("user"));

  let config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    fetch("http://localhost:8080/generateReportBySkills", config)
      .then((data) => data.json())
      .then((data) => {
        setTableData(data);
      });
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
              <h3 className="mb-5">
                Skill Report for all Skills present in Database
              </h3>
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

export default DataTable;
