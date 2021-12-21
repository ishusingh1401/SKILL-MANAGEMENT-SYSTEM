import { Breadcrumb, Layout, message } from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";
import TeamMemberService from "../services/TeamMemberService";
import FooterComponent from './FooterComponent'
const { Content } = Layout;


export class AddOwnSkills extends Component {
  constructor() {
    super();

    this.state = {
      skillName: "",
      skillCategory: "",
      skillLevel: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    const addNewSkill = {
      skillName: this.state.skillName,
      skillCategory: this.state.skillCategory,
      skillLevel: this.state.skillLevel,
    };

    TeamMemberService.AddOwnSkills(addNewSkill, this.props.history).then(
      (res) => {
        this.setState({ skillName: "" });
        this.setState({ skillCategory: "" });
        this.setState({ skillLevel: "" });
        message.info(res.data);
      }
    );
  }

  render() {
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
                  <h3 className="text-center mt-3">Add Own Skills</h3>
                  <div
                    className="card-body"
                  >
                    <form onSubmit={this.onSubmit} className="form-group">
                      <label for="inputEmail3" >
                        Skill Name:
                      </label>
                      <input
                        type="text"
                        className="form-control my-2"
                        placeholder="Skill Name"
                        name="skillName"
                        value={this.state.skillName}
                        onChange={this.onChange}
                      />

                      <label for="inputEmail3">
                        Skill Category:
                      </label>
                      <input
                        type="text"
                        className="form-control my-2"
                        placeholder="Skill Category"
                        name="skillCategory"
                        value={this.state.skillCategory}
                        onChange={this.onChange}
                      />

                      <label for="inputEmail3">
                        Skill Level:
                      </label>
                      <select
                        name="skillLevel"
                        className="form-control my-2 form-select"
                        placeholder="Skill Level"
                        value={this.state.skillLevel}
                        onChange={this.onChange}
                      >
                        <option value="">Select Skill Level</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>

                      <div className="form-group " align="center">

                        <button
                          type="submit"
                          className="btn btn-success mt-3"
                          disabled={
                            this.state.skillCategory &&
                              this.state.skillLevel &&
                              this.state.skillName
                              ? false
                              : true
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
        </Content>
        <FooterComponent />
      </Layout>
    );
  }
}

AddOwnSkills.propTypes = {
  addOwnSkills: PropTypes.func.isRequired,
};
