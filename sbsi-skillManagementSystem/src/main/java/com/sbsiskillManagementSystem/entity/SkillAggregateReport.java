package com.sbsiskillManagementSystem.entity;

public class SkillAggregateReport {
    double avgSkillLevel;
    String skillCategory;

    public SkillAggregateReport() {
    }

    public SkillAggregateReport(double avgSkillLevel, String skillCategory) {
        this.avgSkillLevel = avgSkillLevel;
        this.skillCategory = skillCategory;
    }

    public double getAvgSkillLevel() {
        return avgSkillLevel;
    }

    public void setAvgSkillLevel(double avgSkillLevel) {
        this.avgSkillLevel = avgSkillLevel;
    }

    public String getSkillCategory() {
        return skillCategory;
    }

    public void setSkillCategory(String skillCategory) {
        this.skillCategory = skillCategory;
    }

}
