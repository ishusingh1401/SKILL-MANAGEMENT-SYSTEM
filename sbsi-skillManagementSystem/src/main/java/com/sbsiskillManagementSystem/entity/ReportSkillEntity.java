package com.sbsiskillManagementSystem.entity;

import java.util.Map;

public class ReportSkillEntity {

    private Map<String, InfoSkills> skillsReport;
    

    public ReportSkillEntity() {
    }

    public ReportSkillEntity(Map<String, InfoSkills> skillsReport) {
        this.skillsReport = skillsReport;
    }

    public Map<String, InfoSkills> getSkillsReport() {
        return skillsReport;
    }

    public void setSkillsReport(Map<String, InfoSkills> skillsReport) {
        this.skillsReport = skillsReport;
    }
    
	
 
}

