package com.sbsiskillManagementSystem.entity;

import java.util.Set;

public class ReportTeamMemEntity {
    private String userName;
    private String userFirstName;
    private String userLastName;
    private String userProjectName;
    private String userRole;
    private Set<Skills> userSkill;

    public ReportTeamMemEntity(User user) {

        this.userName = user.getUserName();
        this.userFirstName = user.getUserFirstName();
        this.userLastName = user.getUserLastName();
        this.userProjectName = user.getUserProjectName();
        this.userRole = user.getUserRole();
        this.userSkill = user.getUserSkill();

    }

    public ReportTeamMemEntity() {
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserFirstName() {
        return userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public String getUserLastName() {
        return userLastName;
    }

    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }

    public String getUserProjectName() {
        return userProjectName;
    }

    public void setUserProjectName(String userProjectName) {
        this.userProjectName = userProjectName;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public Set<Skills> getUserSkill() {
        return userSkill;
    }

    public void setUserSkill(Set<Skills> userSkill) {
        this.userSkill = userSkill;
    }

}
