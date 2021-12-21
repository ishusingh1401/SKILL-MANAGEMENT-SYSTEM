package com.sbsiskillManagementSystem.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "SkillsEntity")
public class SkillsEntity {

    @Id
    private String skillId;
    private String skillName;
    private String skillCategory;

    public SkillsEntity() {
    }

    public SkillsEntity(String skillId, String skillName, String skillCategory) {
        this.skillId = skillId;
        this.skillName = skillName;
        this.skillCategory = skillCategory;
    }

    public String getSkillId() {
        return skillId;
    }

    public void setSkillId(String skillId) {
        this.skillId = skillId;
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
