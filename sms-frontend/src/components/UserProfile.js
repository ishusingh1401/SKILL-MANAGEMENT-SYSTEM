import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { Table } from "react-bootstrap";
import { Layout, Breadcrumb } from "antd";
import FooterComponent from "./FooterComponent";
const { Content } = Layout;

const UserProfile = () => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      window.location.href = "/403";
    }
    UserService.getUser().then((res) => {
      setUsers(res.data);
    });
  }, []);

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
            <div className="main-body">
              <nav aria-label="breadcrumb" className="main-breadcrumb"></nav>

              <div className="row gutters-sm">
                <div
                  className="col-md-4 mb-3"
                  className="shadow p-3 mb-5 bg-white rounded"
                >
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src="https://media.istockphoto.com/vectors/anonymous-gender-neutral-face-avatar-incognito-head-silhouette-stock-vector-id1305665241?k=20&m=1305665241&s=612x612&w=0&h=beLC3d9MEsHA7XmST_bd31MhnvznnkC20nh0LGuxE3Y="
                          alt="Admin"
                          className="rounded-circle"
                          width="150"
                        />
                        <div className="mt-3">
                          <h4>
                            {Users?.userFirstName} {Users?.userLastName}
                          </h4>
                          <p
                            className="text-secondary mb-1"
                            style={{ marginTop: "0em" }}
                          >
                            {Users?.userRole}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8" style={{ marginLeft: "16%" }}>
                  <div
                    className="card mb-3"
                    style={{ marginTop: "45px" }}
                    className="shadow p-3 mb-5 bg-white rounded"
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">User Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {Users?.userName}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Team Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {Users?.userTeamName}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Project Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {Users?.userProjectName}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Skills</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th>Skill Category</th>
                                <th>Skill Name</th>
                                <th>Skill Level</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Users?.userSkill?.map((data, i) => (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{data.skillCategory}</td>
                                  <td>{data.skillName}</td>
                                  <td>{data.skillLevel}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default UserProfile;
