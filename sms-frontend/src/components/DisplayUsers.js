import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import UserService from '../services/UserService';

export class DisplayUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Users: []
        }
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            this.setState({ Users: res.data });
        });
    }
    render() {
        if (localStorage.getItem('user') == null) {
            return <Redirect to='/403' />
        }
        else {
            return (
                <div>
                    <div>
                        <h3>Employee List</h3>
                    </div>
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Employee UserName</th>
                                <th>Employee FirstName</th>
                                <th>Employee LastName</th>
                                <th>Employee Password</th>
                                <th>Employee TeamName</th>
                                <th>Employee ProjectName</th>
                                <th>Employee UserRole</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Users.map(
                                    user =>
                                        <tr key={user.userId}>
                                            <td>{user.userName}</td>
                                            <td>{user.userFirstName}</td>
                                            <td>{user.userLastName}</td>
                                            <td>{user.userPassword}</td>
                                            <td>{user.userTeamName}</td>
                                            <td>{user.userProjectName}</td>
                                            <td>{user.userRole}</td>
                                        </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            );
        }
    }
}