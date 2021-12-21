import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import TeamMemberService from "../services/TeamMemberService";
import { Layout, Breadcrumb, message } from "antd";
import FooterComponent from "./FooterComponent";
const { Content } = Layout;

export default function ModifySkillLevel() {
  const [Users, setUsers] = useState([]);

  const getUserData = () => {
    return Users?.userSkill?.map((skill, key) => {
      return <option value={skill.skillName}>{skill.skillName}</option>
    })
  }
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      window.location.href = "/403";
    }
    UserService.getUser().then((res) => {
      setUsers(res.data);
    });
  }, []);


  const [skillLevel, setskillLevel] = useState("");
  const [skillName, setskillName] = useState("");

  const submitButton = async (e) => {
    e.preventDefault();
    const res = await TeamMemberService.ModifySkillLevel({ skillLevel: skillLevel, skillName: skillName });
    if (res.status === 200) {
      setskillLevel("")
      setskillName("")
      message.success("Skill Level updated successfully")
    }
    else {
      message.error("Something went wrong.")
    }
  };

  return (
    <Layout className="site-layout">
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 900 }}
        >
          <div className="container " >
            <div className="row">
              <div
                className="card col-md-6 offset-md-3 shadow p-3 mb-5 bg-white rounded"
              >
                <h3 className="text-center mt-3">Modify Skill Level</h3>
                <div
                  className="card-body"
                >
                  <form className="form-group" onSubmit={submitButton}>
                    <label for="inputEmail3">
                      Skill Name
                    </label>
                    <select
                      name="skillName"
                      className="form-control my-2 form-select"
                      placeholder="Skill Name"
                      value={skillName}
                      onChange={(e) => setskillName(e.target.value)}
                    >

                      <option value="">Select Skill Name</option>
                      {getUserData()}
                    </select>
                    <label for="inputEmail3" >
                      Skill Level
                    </label>
                    <select
                      name="skillLevel"
                      className="form-control my-2 form-select"
                      placeholder="Skill Level"
                      value={skillLevel}
                      onChange={(e) => setskillLevel(e.target.value)}
                    >
                      <option value="">Select Skill Level</option>
                      <option value="1" >1</option>
                      <option value="2" >2</option>
                      <option value="3" >3</option>
                      <option value="4" >4</option>
                      <option value="5" >5</option>
                    </select>
                    <div class="form-group" align="center">
                      <button
                        type="submit"
                        class="btn btn-success mt-3"
                        disabled={
                          skillLevel && skillName ? false : true
                        }
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content >
      <FooterComponent />
    </Layout >
  );
}
