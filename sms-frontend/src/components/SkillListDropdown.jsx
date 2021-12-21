import axios from "axios";
import React, { Component } from "react";
import { Layout, Breadcrumb, message } from "antd";
import FooterComponent from "./FooterComponent";
const { Content } = Layout;
class SkillListDropdown extends Component {
    state = {
        categorys: [],
        selectedCategory: "",
        validationError: "",
        skills: [],
        previousCategory: ""
    };

    fetchCategoryListData() {
        let categoryListData = [];
        const { user, jwtToken } = JSON.parse(localStorage.getItem("user"));


        let config = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        };
        fetch("http://localhost:8080/skillCategory", config)
            .then((response) => {
                categoryListData = response.json()
                return categoryListData;
            })
            .then((data) => {
                let categoryFromApi = data.map(category => {
                    return { value: category, display: category };
                });
                this.setState({
                    categorys: [
                        {
                            value: "",
                            display: "Select a Category to View Skills: ",
                        },
                    ].concat(categoryFromApi),
                });
            })
            .catch((error) => {
            });
    }

    fetchSkillsDetails() {
        let skillsDetails = [];
        const { user, jwtToken } = JSON.parse(localStorage.getItem("user"));


        let config = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        };
        axios
            .get(
                "http://localhost:8080/skillCategory/" + this.state.selectedCategory,
                config
            )
            .then((res) => {
                this.setState({
                    skills: res.data
                });
            })
            .catch((e) => {
                message.error("Something went wrong")
            });
        this.state.previousCategory = this.state.selectedCategory;
        return skillsDetails;
    }

    componentDidMount() {
        this.fetchCategoryListData();
    }

    componentDidUpdate() {
        if (
            this.state.selectedCategory !== "" &&
            this.state.previousCategory !== this.state.selectedCategory
        ) {
            this.fetchSkillsDetails();
        }
    }

    populateCategory(event) {
        this.setState({
            selectedCategory: event.target.value,
            validationError:
                event.target.value === "" ? "* You must select a Category" : "",
        });
    }

    populateSelectOptions() {
        return this.state.categorys.map((category) => (
            <option key={category.value} value={category.value}>
                {category.display}
            </option>
        ));
    }

    populateTableHeaders() {
        return (
            <tr>
                <th>S.No.</th>
                <td>Skill Name</td>
            </tr>
        );
    }


    populateTableBody() {
        return this.state.skills.map((item, i) => (
            <tr key={i}>
                <th> {i + 1} </th>
                <td> {item} </td>
            </tr>
        ));
    }

    getCategoryDetailComponent() {
        return (

            <div
                className="ViewCategoryList"
                align="center"
                hidden={this.state.selectedCategory === ""}
            >
                <table className="table table-bordered table-striped table-dark">
                    <thead>{this.populateTableHeaders()}</thead>
                    <tbody>{this.populateTableBody()}</tbody>
                </table>
            </div>

        );
    }

    getCategoryListComponent() {
        return (
            <Layout className="site-layout">
                <Content style={{ margin: "0 16px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                    </Breadcrumb>
                    <div
                        align="center"
                        className="site-layout-background justify-content-center"
                        style={{ padding: 24, minHeight: 900 }}
                    >
                        <div align="center" className="col-md-4 mb-5">
                            <h1>
                                <u>Skill-Category List</u>
                            </h1>
                            <br />
                            <select
                                className="form-select"
                                value={this.state.selectedCategory}
                                onChange={(e) => this.populateCategory(e)}
                            >
                                {this.populateSelectOptions()}
                            </select>
                            <div className="mt-3" style={{ color: "red", marginTop: "5px" }}>
                                {this.state.validationError}
                            </div>
                        </div>
                        {this.getCategoryDetailComponent()}
                    </div>
                </Content>

            </Layout>
        );
    }

    render() {
        return (
            <div style={{ minHeight: "100vh", width: "-webkit-fill-available" }}>

                {this.getCategoryListComponent()}
                <FooterComponent />
            </div>
        );
    }
}

export default SkillListDropdown;
