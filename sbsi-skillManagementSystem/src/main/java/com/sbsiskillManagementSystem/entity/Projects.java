package com.sbsiskillManagementSystem.entity;

import org.springframework.data.annotation.Id;

public class Projects {

    @Id
    private String id;
    private String projectName;

    public Projects() {
    }

    public Projects(String projectName) {
        this.projectName = projectName;
    }

    public Projects(String id, String projectName) {
        this.id = id;
        this.projectName = projectName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

}
