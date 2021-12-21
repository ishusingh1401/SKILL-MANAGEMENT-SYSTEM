package com.sbsiskillManagementSystem.entity;

public class Skills {

	private String skillName;
	private String skillCategory;
	private int skillLevel;

	public Skills() {
	}

	public Skills(int skillLevel, String skillName, String skillCategory) {
		this.skillName = skillName;
		this.skillCategory = skillCategory;
		this.skillLevel = skillLevel;
	}

	public int getSkillLevel() {
		return skillLevel;
	}

	public void setSkillLevel(int skillLevel) {
		this.skillLevel = skillLevel;
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
