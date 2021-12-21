import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Breadcrumb, Layout, message } from "antd";
import FooterComponent from "./FooterComponent";
const { Content } = Layout;

export const ReportByUser = () => {
  const api = "http://localhost:8080/";

  const [userName, setUserName] = useState("");
  const [response, setResponse] = useState("");
  const { user, jwtToken } = JSON.parse(localStorage.getItem("user"));
  let config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const generateReport = (e) => {
    axios
      .get(api + "generateReportByTeamMember/" + userName, config)
      .then((response) => {
        if (response.status === 200 && response.data === "") {
          message.error("No such user exists! Please check the username.");
        }
        setUserName("");
        return setResponse(response.data);
      });

  };
  if (
    localStorage.getItem("user") == null ||
    (JSON.parse(localStorage.user).user.userRole !== "SeniorManager" &&
      JSON.parse(localStorage.user).user.userRole !== "HR")
  ) {
    return <Redirect to="/403" />;
  } else {
    return (
      <>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 900 }}
            >
              <div className="container">
                <div className="row my-4 ">
                  <div className="card col-md-6 offset-md-3 shadow p-3 mb-5 bg-white rounded">
                    <h3 className="text-center my-4">
                      Enter User Name to Generate Report
                    </h3>
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <label>User Name: </label>
                          <input
                            onChange={(e) => setUserName(e.target.value)}
                            type="text"
                            placeholder="Enter User Name"
                            name="username"
                            value={userName}
                            className="form-control mt-2"
                          ></input>
                        </div>
                        <div align="center">
                          <button
                            className="btn btn-success mt-4"
                            type="button"
                            onClick={generateReport}
                            disabled={userName ? false : true}

                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {response == "" ? null : (
                  <div className="shadow p-3 mb-5 bg-white rounded" >
                    <div className="row my-5 mx-5">
                      <div className="card p-4">
                        <div className=" image d-flex flex-column justify-content-center align-items-center">
                          <img
                            src="https://png.pngitem.com/pimgs/s/137-1370051_avatar-generic-avatar-hd-png-download.png"
                            height="100"
                            width="100"
                            className="mb-2"
                          />
                          <div className="d-flex flex-row justify-content-center align-items-center gap-2">

                            <span className="idd1">
                              @{response.userName}
                            </span>
                            <span>
                              <i class="fa fa-copy"></i>
                            </span>
                          </div>
                          <div className="d-flex flex-row justify-content-center align-items-center gap-2">

                            <span className="idd1">
                              <b>Name: </b>{response.userFirstName}
                              {response.userLastName}
                            </span>
                            <span>
                              <i class="fa fa-copy"></i>
                            </span>
                          </div>
                          <div className="d-flex flex-row justify-content-center align-items-center gap-2">

                            <span className="idd1">
                              <b>User Role: </b>{response.userRole}
                            </span>
                            <span>
                              <i class="fa fa-copy"></i>
                            </span>
                          </div>
                          <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                            <span className="idd1">
                              <b> Project Name:</b> {response.userProjectName}
                            </span>
                            <span>
                              <i class="fa fa-copy"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row my-4 mx-5">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Skill Name</th>
                            <th scope="col">Skill Category</th>
                            <th scope="col">Skill Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          {response.userSkill.map((skill, i) => {
                            return (
                              <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{skill.skillName}</td>
                                <td>{skill.skillCategory}</td>
                                <td>{skill.skillLevel}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Content>
          <FooterComponent />
        </Layout>
      </>
    );
  }
};
