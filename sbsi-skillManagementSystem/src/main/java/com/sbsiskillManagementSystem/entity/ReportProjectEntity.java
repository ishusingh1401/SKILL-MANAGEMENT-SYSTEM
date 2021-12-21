package com.sbsiskillManagementSystem.entity;

import java.util.List;
import java.util.Set;

public class ReportProjectEntity {
    private Set<String> teams;
    private List<InfoSkills> teamskillsReport;

    public ReportProjectEntity() {
    }

    public ReportProjectEntity(Set<String> teams, List<InfoSkills> teamskillsReport) {
        this.teams = teams;
        this.teamskillsReport = teamskillsReport;
    }

    public Set<String> getTeams() {
        return teams;
    }

    public void setTeams(Set<String> teams) {
        this.teams = teams;
    }

    public List<InfoSkills> getTeamskillsReport() {
        return teamskillsReport;
    }

    public void setTeamskillsReport(List<InfoSkills> teamskillsReport) {
        this.teamskillsReport = teamskillsReport;
    }

}
