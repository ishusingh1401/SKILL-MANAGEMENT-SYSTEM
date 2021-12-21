import { message } from "antd";
import React, { Component } from "react";
import UserService from "../services/UserService";
import "../Style/SignInForm.css";
export class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  changeUserNameHandler = (event) => {
    this.setState({ username: event.target.value });
  };
  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  SignUp = () => {
    this.props.history.push("/signup");
  };
  SignIn = async (event) => {
    event.preventDefault();
    let user = {
      userName: this.state.username,
      userPassword: this.state.password,
    };
    var response = await UserService.signInUser(user);

    localStorage.setItem("user", JSON.stringify(response.data));

    if (response.data.jwtToken) {
      this.props.history.push("/home");
    }
    if (response.data.message === "Bad Credentials for User") {
      message.error("Bad Credentials for User");
      this.setState({ password: "" });
    }
  };

  render() {
    return (
      <div
        className="container"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="row justify-content-center">
          <div className="card col-md-6 shadow-lg rounded">
            <h3 className="text-center mt-3 mb-3">Sign In</h3>
            <div className="card-body">
              <form onSubmit={this.SignIn}>
                <div className="form-group my-4">
                  <label className="mb-2" style={{ fontSize: "18px" }}>User Name: </label>
                  <input
                    onChange={this.changeUserNameHandler}
                    type="text"
                    placeholder="Enter User Name"
                    name="username"
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group my-4">
                  <label className="mb-2" style={{ fontSize: "18px" }}>Password: </label>
                  <input
                    onChange={this.changePasswordHandler}
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    className="form-control"
                  ></input>
                </div>

                <div className="row justify-content-between">
                  <div className="col-lg-3 col-md-5 col-sm-12 my-2">
                    <button
                      type="submit"
                      className="btn btn-success"
                    >
                      Log In
                    </button>
                  </div>
                  <div className="col-lg-3 col-md-5 col-sm-12 my-2">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={this.SignUp}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
