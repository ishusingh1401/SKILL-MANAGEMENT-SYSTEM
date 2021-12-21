import React, { Component } from 'react';
import UserService from '../services/UserService';
import { message } from "antd";

export class SignUpForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            teamname: '',
            projectname: '',
            userrole: '',
            userskill: [],
            passwordClass: "form-control form-password",
            userNameClass: "form-control",
            firstNameClass: "form-control",
            lastNameClass: "form-control",
            teamNameClass: "form-control",
            projectNameClass: "form-control",
            userRoleClass: "form-control",
            isPasswordCorrect: true,
            isUserNameCorrect: true,
            isUserNameEntered: false,
            isFirstNameEntered: false,
            isLastNameEntered: false,
            isTeamNameEntered: false,
            isProjectNameEntered: false,
            isUserRoleEntered: false,
            isPasswordEntered: false

        }
    }

    changeFirstNameHandler = (event) => {

        this.setState({ firstname: event.target.value });

    }
    changeUserNameHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    changeLastNameHandler = (event) => {
        this.setState({ lastname: event.target.value });
    }
    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    changeTeamNameHandler = (event) => {
        this.setState({ teamname: event.target.value });

    }
    changeProjectNameHandler = (event) => {
        this.setState({ projectname: event.target.value });
    }
    changeUserRoleHandler = (event) => {
        this.setState({ userrole: event.target.value });
    }
    saveUser = async (event) => {
        event.preventDefault();
        if (this.state.firstname === "") {
            this.setState({ isFirstNameEntered: false });
            this.setState({ firstNameClass: "form-control is-invalid" })
        }
        if (this.state.lastname === "") {
            this.setState({ isLastNameEntered: false });
            this.setState({ lastNameClass: "form-control is-invalid" })
        }
        if (this.state.teamname === "") {
            this.setState({ isTeamNameEntered: false });
            this.setState({ teamNameClass: "form-control is-invalid" })
        }
        if (this.state.userrole === "") {
            this.setState({ isUserRoleEntered: false });
            this.setState({ userRoleClass: "form-control is-invalid" })
        }
        if (this.state.projectname === "") {
            this.setState({ isProjectNameEntered: false });
            this.setState({ projectNameClass: "form-control is-invalid" })
        }
        if (this.state.username === "") {
            this.setState({ isUserNameEntered: false });
            this.setState({ userNameClass: "form-control is-invalid" })
        }
        if (this.state.password === "") {
            this.setState({ isPasswordEntered: false });

            this.setState({ passwordClass: "form-control is-invalid" })
        }

        if (this.state.isPasswordCorrect && this.state.isFirstNameEntered && this.state.isLastNameEntered && this.state.isUserNameEntered && this.state.isTeamNameEntered && this.state.isProjectNameEntered && this.state.isUserRoleEntered) {
            let user = { userName: this.state.username, userFirstName: this.state.firstname, userLastName: this.state.lastname, userPassword: this.state.password, userTeamName: this.state.teamname, userProjectName: this.state.projectname, userRole: this.state.userrole, userSkill: this.state.userskill }
            UserService.addUser(user).then(res => {
                message.success("This user is successfully added!")
                this.props.history.push('/');
            });
        }
        else {
            message.error("User could not be added!")
        }
    }

    checkPassword = () => {
        if (this.state.password !== "") {

            if (!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                this.setState({ passwordClass: "form-control is-invalid form-password" });
                this.setState({ isPasswordCorrect: false });
                this.setState({ isPasswordEntered: true });
            }
            else {
                this.setState({ isPasswordCorrect: true });
                this.setState({ passwordClass: "form-control" });
                this.setState({ isPasswordEntered: true });
            }

        }
        else {
            this.setState({ passwordClass: "form-control is-invalid form-password" });
        }
    }

    checkUsername = async () => {

        if (this.state.username === "") {
            this.setState({ isUserNameEntered: false });
            this.setState({ userNameClass: "form-control is-invalid" })
        }
        else {
            var userPresent = UserService.authenticateUsername(this.state.username);
            if (!(await userPresent).data) {
                this.setState({ isUserNameCorrect: true });
                this.setState({ isUserNameEntered: true });
                this.setState({ userNameClass: "form-control" })
            }
            else {
                this.setState({ isUserNameEntered: true })
                this.setState({ isUserNameCorrect: false })
                this.setState({ userNameClass: "form-control is-invalid" })
            }

        }
    }

    isFirstNameEnteredAgain = () => {
        if (this.state.firstname === "") {
            this.setState({ isFirstNameEntered: false });
            this.setState({ firstNameClass: "form-control is-invalid" })

        }
        else {
            this.setState({ isFirstNameEntered: true });
            this.setState({ firstNameClass: "form-control" })
        }
    }

    isLastNameEnteredAgain = () => {
        if (this.state.lastname === "") {
            this.setState({ isLastNameEntered: false });
            this.setState({ lastNameClass: "form-control is-invalid" })
        }
        else {
            this.setState({ isLastNameEntered: true });
            this.setState({ lastNameClass: "form-control" })
        }
    }

    isTeamNameEnteredAgain = () => {
        if (this.state.teamname === "") {
            this.setState({ isTeamNameEntered: false });
            this.setState({ teamNameClass: "form-control is-invalid" })
        }
        else {
            this.setState({ isTeamNameEntered: true });
            this.setState({ teamNameClass: "form-control" })
        }
    }

    isProjectNameEnteredAgain = () => {
        if (this.state.projectname === "") {
            this.setState({ isProjectNameEntered: false });
            this.setState({ projectNameClass: "form-control is-invalid" })
        }
        else {
            this.setState({ isProjectNameEntered: true });
            this.setState({ projectNameClass: "form-control" })
        }
    }

    isUserRoleEnteredAgain = () => {
        if (this.state.userrole === "") {
            this.setState({ isUserRoleEntered: false });
            this.setState({ userRoleClass: "form-control is-invalid" })
        }
        else {
            this.setState({ isUserRoleEntered: true });
            this.setState({ userRoleClass: "form-control" })
        }
    }
    goToSignIn = () => {
        this.props.history.push('/')
    }
    render() {
        return (
            <div className="container " style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: "translate(-50%, -50%)"
            }}>
                <div className="row justify-content-center">
                    <div className="card col-md-6 shadow-lg p-3 mb-5 rounded">
                        <h3 className="text-center mt-3 mb-3">Sign Up</h3>
                        <div className="card-body">
                            <form onSubmit={this.saveUser}>
                                <div className="form-group my-4">
                                    <label style={{ fontSize: "18px" }}>User Name: </label>
                                    <input placeholder="User Name" name="username" className={this.state.userNameClass} value={this.state.username} onChange={this.changeUserNameHandler} onBlur={this.checkUsername} />
                                    <div className={this.state.isUserNameCorrect ? "d-none" : "none"} >
                                        <small className="text-danger">
                                            <span>This username is already taken. Try something else!</span>
                                        </small>
                                    </div>

                                </div>
                                <div className="form-group my-4">
                                    <label style={{ fontSize: "18px" }}>First Name: </label>
                                    <input placeholder="First Name" name="firstname" className={this.state.firstNameClass} value={this.state.firstname} onChange={this.changeFirstNameHandler} onBlur={this.isFirstNameEnteredAgain} />

                                </div>
                                <div className="form-group my-4">
                                    <label style={{ fontSize: "18px" }}>Last Name: </label>
                                    <input placeholder="Last Name" name="lastname" className={this.state.lastNameClass} value={this.state.lastname} onChange={this.changeLastNameHandler} onBlur={this.isLastNameEnteredAgain}></input>

                                </div>
                                <div className="form-group my-4">
                                    <label style={{ fontSize: "18px" }}>Password: </label>
                                    <input type="password" placeholder="Password" name="password" className={this.state.passwordClass} value={this.state.password} onChange={this.changePasswordHandler} onBlur={this.checkPassword}></input>
                                    <div className={this.state.isPasswordCorrect ? "d-none" : "none"} >
                                        <small className="text-danger">
                                            <span>Must be at least 8 characters</span><br />
                                            <span>At least 1 special character from @#$%&</span><br />
                                            <span>At least 1 number, 1 lowercase, 1 uppercase letter</span>
                                        </small>
                                    </div>

                                </div>
                                <div className="form-group my-4">
                                    <label style={{ fontSize: "18px" }}>Team Name: </label>
                                    <input placeholder="Team Name" name="teamname" className={this.state.teamNameClass} value={this.state.teamname} onChange={this.changeTeamNameHandler} onBlur={this.isTeamNameEnteredAgain}></input>

                                </div>

                                <div className="form-group my-4">
                                    <label style={{ fontSize: "18px" }}>User Role: </label>
                                    <select name="userrole" className={this.state.userRoleClass} value={this.state.userrole} onChange={this.changeUserRoleHandler} onBlur={this.isUserRoleEnteredAgain}>
                                        <option value="">Select User Role</option>
                                        <option value="SeniorManager">Senior Manager</option>
                                        <option value="Admin">Admin</option>
                                        <option value="HR">HR</option>
                                        <option value="TeamManager">Team Manager</option>
                                        <option value="TeamMember">Team Member</option>
                                    </select>

                                </div>
                                <div className="form-group my-4">
                                    <label style={{ fontSize: "18px" }}>Project Name: </label>
                                    <input placeholder="Project Name" name="projectname" className={this.state.projectNameClass} value={this.state.projectname} onChange={this.changeProjectNameHandler} onBlur={this.isProjectNameEnteredAgain}></input>

                                </div>

                                <div className="row justify-content-between">
                                    <div className="col-lg-3 col-md-5 col-sm-12 my-2"><button type="submit" className="btn btn-success"  >Register</button></div>
                                    <div className="col-lg-3 col-md-5 col-sm-12 my-2"><button type="button" className="btn btn-success" onClick={this.goToSignIn}>Sign In</button></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
