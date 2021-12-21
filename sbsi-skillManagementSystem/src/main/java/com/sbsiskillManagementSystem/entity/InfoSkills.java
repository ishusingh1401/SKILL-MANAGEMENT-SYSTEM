package com.sbsiskillManagementSystem.entity;

public class InfoSkills {
    private String skillName;
    private int totalusers;
    private double averageskill;

    public InfoSkills() {
    }

    public InfoSkills(String skillName, int totalusers, double averageskill) {
        this.skillName = skillName;
        this.totalusers = totalusers;
        this.averageskill = averageskill;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public int getTotalusers() {
        return totalusers;
    }

    public void setTotalusers(int totalusers) {
        this.totalusers = totalusers;
    }

    public double getAverageskill() {
        return averageskill;
    }

    public void setAverageskill(double averageskill) {
        this.averageskill = averageskill;
    }

}
