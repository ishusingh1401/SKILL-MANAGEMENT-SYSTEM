import React, { Component } from 'react';
import { Layout } from "antd";
const { Footer } = Layout;


class FooterComponent extends Component {
    render() {
        return (
            <div>
                <Footer style={{ textAlign: "center", padding: 24 }}>
                    Skills Management System ©2021 Created by Squads 3-4
                </Footer>
            </div>
        );
    }
}

export default FooterComponent;