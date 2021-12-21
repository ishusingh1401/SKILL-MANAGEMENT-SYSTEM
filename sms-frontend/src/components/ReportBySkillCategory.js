import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Select, Layout, Breadcrumb } from "antd";
import { Redirect } from "react-router";
import FooterComponent from "./FooterComponent";
import CustomNoRowsOverlay from "./NoRowsComp";

const { Content } = Layout;

const { Option } = Select;

const columns = [
  { field: "skillName", headerName: "Skill Name", width: 400 },
  { field: "users", headerName: "No. of Users", width: 400 },
  { field: "avgSkillLevel", headerName: "Average Skill Level", width: 400 },
];

const DataTableSkillCategory = () => {
  const [tableData, setTableData] = useState([]);
  const [skillCategories, setSkillCategories] = useState([]);

  const { jwtToken } = JSON.parse(localStorage.getItem("user"));

  let config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const fetchSkillCategories = () => {
    fetch("http://localhost:8080/skillCategory", config)
      .then((data) => data.json())
      .then((data) => {
        setSkillCategories(data);
      });
  };

  const renderOptions = () => {
    return skillCategories.map((items) => {
      return <Option value={items}>{items.toUpperCase()}</Option>;
    });
  };

  const handleChange = (e) => {
    fetchDetails(e);
  };

  const fetchDetails = (skillCategory) => {
    fetch(
      `http://localhost:8080/generateReportBySkillsCategory/${skillCategory}`,
      config
    )
      .then((data) => data.json())
      .then((data) => {
        setTableData(data);
      });
  };

  useEffect(() => {
    fetchSkillCategories();
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
          <Breadcrumb style={{ margin: "16px 0" }}>{ }</Breadcrumb>
          <div
            className="site-layout-background" align="center"
            style={{ padding: 24, minHeight: 900 }}
          >
            <div style={{ height: 700, width: "80%", margin: 50 }}>
              <h3>Select Skill Category</h3>
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

export default DataTableSkillCategory;
