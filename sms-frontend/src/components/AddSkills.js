import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSkill } from "../actions/skillActions";
import { Layout, Breadcrumb, message } from "antd";
import { Redirect } from "react-router-dom";
import FooterComponent from "./FooterComponent";
const { Content } = Layout;

export class AddSkills extends Component {
  constructor() {
    super();

    this.state = {
      skillName: "",
      skillCategory: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newSkill = {
      skillName: this.state.skillName,
      skillCategory: this.state.skillCategory,
    };
    this.props.createSkill(newSkill, this.props.history).then((res) => {
      this.setState({ skillName: "" });
      this.setState({ skillCategory: "" });
      if (res.data.skillId == null) {
        message.error("Skill is already present");
      } else {
        message.success("Skill added successfully");
      }
    });
  }

  render() {
    if (localStorage.getItem('user') == null || JSON.parse(localStorage.user).user.userRole !== "Admin") {
      return <Redirect to='/403' />
    }
    else {
      return (
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 900 }}
            >
              <div className="container " >
                <div className="row">
                  <div
                    className="card col-md-6 offset-md-3 shadow p-3 mb-5 bg-white rounded"
                  >
                    <h3 className="text-center mt-3">Add Skills</h3>
                    <div
                      class="card-body"
                    >
                      <form onSubmit={this.onSubmit} className="form-group">
                        <label
                          for="inputEmail3"
                        >
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
                        <label
                          for="inputEmail3"
                        >
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
                        <div class="form-group" align="center">
                          <button
                            type="submit"
                            className="btn btn-success mt-3"
                            disabled={!this.state.skillCategory || !this.state.skillName}
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
}

AddSkills.propTypes = {
  createSkill: PropTypes.func.isRequired,
};

export default connect(null, { createSkill })(AddSkills);
