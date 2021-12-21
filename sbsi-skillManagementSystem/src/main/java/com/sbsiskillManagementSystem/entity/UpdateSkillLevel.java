package com.sbsiskillManagementSystem.entity;

public class UpdateSkillLevel {
    private int skillLevel;
    private String skillName;

    public UpdateSkillLevel() 
    {

    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public int getSkillLevel() {
        return skillLevel;
    }

    public void setSkillLevel(int skillLevel) {
        this.skillLevel = skillLevel;
    }
}
