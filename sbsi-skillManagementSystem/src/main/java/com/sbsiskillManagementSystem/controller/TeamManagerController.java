package com.sbsiskillManagementSystem.controller;

import java.util.List;

import com.sbsiskillManagementSystem.dao.SkillsEntityDao;
import com.sbsiskillManagementSystem.entity.RefineTeamEntity;
import com.sbsiskillManagementSystem.entity.Skills;
import com.sbsiskillManagementSystem.entity.SkillsEntity;
import com.sbsiskillManagementSystem.service.TeamManagerService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TeamManagerController {

    Logger logger = LoggerFactory.getLogger(TeamManagerController.class);

    @Autowired
    private TeamManagerService teamManagerService;

    @Autowired
    private SkillsEntityDao skillsEntityDao;

    @PreAuthorize("hasAnyRole('Admin','TeamManager','HR','SeniorManager')")
    @GetMapping({ "/teamMembers/{teamName}" })
    public List<RefineTeamEntity> showTeamMember(@PathVariable String teamName) {
        logger.info("Listing Members by Team Name");
        return teamManagerService.showTeamMember(teamName);
    }

    @PreAuthorize("hasRole('TeamManager')")
    @PostMapping({ "/managerAddSkills/{teamName}" })
    public List<RefineTeamEntity> addSkills(@PathVariable String teamName, @RequestBody Skills skill) {
        logger.info("Manager adding Skill to their whole team");
        return teamManagerService.addSkills(skill, teamName);
    }

    @PreAuthorize("hasAnyRole('TeamManager','HR','SeniorManager')")
    @GetMapping({ "/viewAllSkills" })
    public List<SkillsEntity> viewSkills() {
        logger.info("Listing all Skills");
        return skillsEntityDao.findAll();
    }

    @PreAuthorize("hasAnyRole('Admin','TeamManager','HR','SeniorManager')")
    @GetMapping({ "/teamName" })
    public List<String> showTeamNamesList() {
        logger.info("Listing all Teams");
        return teamManagerService.showTeamNamesList();
    }

    @PreAuthorize("hasAnyRole('Admin','TeamManager','HR','SeniorManager')")
    @GetMapping({ "/skillCategory" })
    public List<String> showSkillCategoryList() {
        logger.info("Listing all Skill Category");
        return teamManagerService.showSkillCategoryList();
    }

    @PreAuthorize("hasAnyRole('Admin','TeamManager','HR','SeniorManager')")
    @GetMapping({ "/skillCategory/{skillCategory}" })
    public List<String> showSkillByCategoryList(@PathVariable String skillCategory) {
        logger.info("Listing all Skill Names by Skill Category");
        return teamManagerService.showSkillByCategoryList(skillCategory);
    }

}
