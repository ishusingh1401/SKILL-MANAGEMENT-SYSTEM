package com.sbsiskillManagementSystem.entity;

public class AdminRequestModal {

    private String skillName;
    private String skillCategory;

    public AdminRequestModal() {
    }

    public AdminRequestModal(String skillName, String skillCategory) {
        this.skillName = skillName;
        this.skillCategory = skillCategory;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public String getSkillCategory() {
        return skillCategory;
    }

    public void setSkillCategory(String skillCategory) {
        this.skillCategory = skillCategory;
    }

}
