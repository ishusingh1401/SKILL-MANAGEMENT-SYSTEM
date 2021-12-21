import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  TeamOutlined,
  ExperimentOutlined,
  FundProjectionScreenOutlined,
  LogoutOutlined,
  DatabaseOutlined,
  HomeOutlined
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;
const logOut = () => {
  localStorage.clear();
};
const Navbar = ({ Arg }) => {
  const [collapsed, setcollapsed] = useState(false);

  if (localStorage.getItem("user") == null) {
    return <Redirect to="/403" />;
  } else {
    let userRole = JSON.parse(localStorage.user).user.userRole;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setcollapsed(!collapsed)}
        >
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="122" icon={<HomeOutlined />}>
              <Link to="/home">Home</Link>
            </Menu.Item>
            {userRole === "SeniorManager" || userRole === "HR" ? (
              <SubMenu
                key="sub1"
                icon={<PieChartOutlined />}
                title="Skills Report"
              >
                <Menu.Item key="12">
                  <Link to="/reportAllSkills">All Skills</Link>
                </Menu.Item>
                <Menu.Item key="13">
                  <Link to="/reportSkillCategory">Skill Category</Link>
                </Menu.Item>
                <Menu.Item key="14">
                  <Link to="/reportProject">Project</Link>
                </Menu.Item>
                <Menu.Item key="15">
                  <Link to="/reportTeam">Team</Link>
                </Menu.Item>
                <Menu.Item key="16">
                  <Link to="/reportUser">User</Link>
                </Menu.Item>
              </SubMenu>
            ) : null}

            {userRole === "TeamManager" ||
              userRole === "HR" ||
              userRole === "SeniorManager" ||
              userRole === "Admin" ? (
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="1">
                  <Link to="/teamListDropdown">View Team Details</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/addTeamName">Add Member</Link>
                </Menu.Item>
                {userRole === "TeamManager" ? (
                  <Menu.Item key="3">
                    <Link to="/addSkillToTeam">Add Skill to Team</Link>
                  </Menu.Item>
                ) : null}
              </SubMenu>
            ) : null}

            {userRole === "Admin" ? (
              <SubMenu key="sub4" icon={<DatabaseOutlined />} title="Access DB">
                <Menu.Item key="6">
                  <Link to="/skillListDropdown">View Skills</Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to="/addSkills">Add Skills to DB</Link>
                </Menu.Item>
              </SubMenu>
            ) : null}

            {userRole === "TeamManager" ||
              userRole === "SeniorManager" ||
              userRole === "HR" ? (
              <SubMenu
                key="sub5"
                icon={<FundProjectionScreenOutlined />}
                title="Project"
              >
                <Menu.Item key="8">
                  <Link to="/Addproject">Add Project</Link>
                </Menu.Item>
                <Menu.Item key="9">
                  <Link to="/assignProjectName">Assign Project</Link>
                </Menu.Item>
                <Menu.Item key="10">
                  <Link to="/ViewProjectForm">View Project</Link>
                </Menu.Item>
              </SubMenu>
            ) : null}

            <SubMenu key="sub3" icon={<ExperimentOutlined />} title="Skills">
              <Menu.Item key="4">
                <Link to="/addOwnSkills"> Add Own Skills</Link>
              </Menu.Item>

              <Menu.Item key="5">
                <Link to="/UpdateSkillLevel"> Modify Skill Level</Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="11" icon={<LogoutOutlined />}>
              {
                <Link to="/" onClick={logOut}>
                  Logout
                </Link>
              }
            </Menu.Item>
          </Menu>
        </Sider>
        {/* <ContentBody /> */}
        <Arg />
      </Layout>
    );
  }
};

export default Navbar;
