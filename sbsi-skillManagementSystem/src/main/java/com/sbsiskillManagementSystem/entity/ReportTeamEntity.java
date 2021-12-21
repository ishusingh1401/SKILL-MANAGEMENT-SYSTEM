package com.sbsiskillManagementSystem.entity;

import java.util.List;

public class ReportTeamEntity {
    private List<String> teamMembers;
    private List<InfoSkills> teamReport;

    public ReportTeamEntity(List<String> updatedUsers, List<InfoSkills> teamReport) {
        teamMembers = updatedUsers;
        this.teamReport = teamReport;
    }

    public List<String> getTeamMembers() {
        return teamMembers;
    }

    public void setTeamMembers(List<String> teamMembers) {
        this.teamMembers = teamMembers;
    }

    public List<InfoSkills> getTeamReport() {
        return teamReport;
    }

    public void setTeamReport(List<InfoSkills> teamReport) {
        this.teamReport = teamReport;
    }

}
