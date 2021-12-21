import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import PageHeader from "./components/PageHeader";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SignUpForm } from "./components/SignUpForm";
import { SignInForm } from "./components/SignInForm";
import { DisplayUsers } from "./components/DisplayUsers";
import AddSkills from "./components/AddSkills";
import UserProfile from "./components/UserProfile";
import TeamListDropdown from "./components/TeamListDropdown.jsx";
import { Provider } from "react-redux";
import store from "./store";
import TeamMemberForm from "./components/TeamMemberForm.jsx";
import Error404 from "./components/Error404";
import Error500 from "./components/Error500";
import Error403 from "./components/Error403";
import { AddProject } from "./components/AddProjectForm";
import SkillListDropdown from "./components/SkillListDropdown.jsx";
import ModifySkillLevel from "./components/ModifySkillLevel.jsx";
import { AddOwnSkills } from "./components/AddOwnSkills";
import UpdateProjectUserForm from "./components/UpdateProjectUserForm";
import { ViewProject } from "./components/ViewProject";
import DataTable from './components/ReportBySkills';
import DataTableSkillCategory from './components/ReportBySkillCategory';
import DataTableProject from './components/ReportByProject';
import DataTableTeam from './components/ReportByTeams';
import { ReportByUser } from "./components/ReportByUser";
import { AddSkillToTeam } from "./components/AddSkillToTeam";


function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={SignInForm}></Route>
            <Route path="/signup" component={SignUpForm}></Route>
            <Route path="/display" component={DisplayUsers}></Route>
            <Route path="/500" component={Error500}></Route>
            <Route path="/403" component={Error403}></Route>
            <Route path="/401" component={Error403}></Route>

            <Route path="/teamListDropdown">
              <PageHeader />
              <Navbar Arg={TeamListDropdown} />
            </Route>
            <Route path="/reportAllSkills">
              <PageHeader />
              <Navbar Arg={DataTable} />
            </Route>
            <Route path="/reportSkillCategory">
              <PageHeader />
              <Navbar Arg={DataTableSkillCategory} />
            </Route>
            <Route path="/reportProject">
              <PageHeader />
              <Navbar Arg={DataTableProject} />
            </Route>
            <Route path="/reportTeam">
              <PageHeader />
              <Navbar Arg={DataTableTeam} />
            </Route>
            <Route path="/reportUser">
              <PageHeader />
              <Navbar Arg={ReportByUser} />
            </Route>
            <Route path="/addTeamName">
              <PageHeader />
              <Navbar Arg={TeamMemberForm} />
            </Route>
            <Route path="/home">
              <PageHeader />
              <Navbar Arg={UserProfile} />
            </Route>
            <Route path="/skillListDropdown">
              <PageHeader />
              <Navbar Arg={SkillListDropdown} />
            </Route>
            <Route path="/addSkills">
              <PageHeader />
              <Navbar Arg={AddSkills} />
            </Route>
            <Route path="/addSkillToTeam">
              <PageHeader />
              <Navbar Arg={AddSkillToTeam} />
            </Route>
            <Route path="/Addproject">
              <PageHeader />
              <Navbar Arg={AddProject} />
            </Route>
            {/* <Route path="/ViewProjectForm">
              <PageHeader />
              <Navbar Arg={ViewProject} />
            </Route> */}
            <Route path="/addOwnSkills">
              <PageHeader />
              <Navbar Arg={AddOwnSkills} />
            </Route>
            <Route path="/UpdateSkillLevel">
              <PageHeader />
              <Navbar Arg={ModifySkillLevel} />
            </Route>
            <Route path="/ViewProjectForm">
              <PageHeader />
              <Navbar Arg={ViewProject} />
            </Route>
            <Route path="/assignProjectName">
              <PageHeader />
              <Navbar Arg={UpdateProjectUserForm} />
            </Route>
            <Route path="/**" component={Error404}></Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}
export default App;
