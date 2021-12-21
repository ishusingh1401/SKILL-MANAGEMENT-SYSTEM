package com.sbsiskillManagementSystem.entity;


public class SkillCategoryAggregateReport {
   String skillName;
   double averageSkill;
   public SkillCategoryAggregateReport(String skillName, double averageSkill) {
      this.skillName = skillName;
      this.averageSkill = averageSkill;
   }
   public String getSkillName() {
      return skillName;
   }
   public void setSkillName(String skillName) {
      this.skillName = skillName;
   }
   public double getAverageSkill() {
      return averageSkill;
   }
   public void setAverageSkill(double averageSkill) {
      this.averageSkill = averageSkill;
   }
   

    
}
