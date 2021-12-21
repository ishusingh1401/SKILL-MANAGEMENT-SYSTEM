package com.sbsiskillManagementSystem.entity;

public class SkillReportObject {
    private String skillName;
    private int users;
    private double avgSkillLevel;

    public SkillReportObject() {
    }

    public SkillReportObject(String skillName, int users, double avgSkillLevel) {
        this.skillName = skillName;
        this.users = users;
        this.avgSkillLevel = avgSkillLevel;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public int getUsers() {
        return users;
    }

    public void setUsers(int users) {
        this.users = users;
    }

    public double getAvgSkillLevel() {
        return avgSkillLevel;
    }

    public void setAvgSkillLevel(double avgSkillLevel) {
        this.avgSkillLevel = avgSkillLevel;
    }
}
