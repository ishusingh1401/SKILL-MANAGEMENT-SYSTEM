package com.sbsiskillManagementSystem.entity;

import org.springframework.data.annotation.Id;

public class TeamNames {

    @Id
    private String id;
    private String teamName;

    public TeamNames() {
    }

    public TeamNames(String teamName) {
        this.teamName = teamName;
    }

    public TeamNames(String id, String teamName) {
        this.id = id;
        this.teamName = teamName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

}
