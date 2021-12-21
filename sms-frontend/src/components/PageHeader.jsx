import React, { Component } from 'react'
import { Layout } from 'antd';

import { Redirect } from 'react-router';
import { Link } from "react-router-dom";



const { Header } = Layout;

class PageHeader extends Component {

  constructor() {

    super();

    this.state = {

      name: "",

      role: ""

    };

  }

  render() {

    if (localStorage.getItem("user") == null) {

      return <Redirect to="/403" />;

    } else {

      var newname = JSON.parse(localStorage.user).user.userFirstName;

      var newrole = JSON.parse(localStorage.user).user.userRole;




      this.name = newname.toUpperCase();

      this.role = newrole;

      return (

        <Layout className="Head" >

          <Header>

            <div className="logo">

              <div className="sub-logo">

                <Link to="/home">

                  <img

                    src="logo1.png"

                    height="40"

                    alt=""

                    loading="lazy"

                    width="110"

                  />

                </Link>

                <img style={{


                  float: "right",

                  textAlign: "center",

                  padding: "5px",


                  margin: "5px",

                  height: "55px"

                }}
                  src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-user-interface-kiranshastry-gradient-kiranshastry.png"></img>

                <p style={{

                  color: "white", fontSize: "20px", marginTop: "2px",

                  marginRight: "5px", fontFamily: "Arial", float: "right", textAlign: "center", padding: "auto"

                }}>{this.name} ({this.role})</p>

              </div>

            </div>

          </Header>

        </Layout>

      )

    }

  }
}



export default PageHeader;