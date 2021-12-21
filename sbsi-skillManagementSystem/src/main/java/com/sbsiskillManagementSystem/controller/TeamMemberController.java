package com.sbsiskillManagementSystem.controller;

import com.sbsiskillManagementSystem.entity.Skills;
import com.sbsiskillManagementSystem.entity.UpdateSkillLevel;
import com.sbsiskillManagementSystem.entity.User;
import com.sbsiskillManagementSystem.service.TeamMemberService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TeamMemberController {

    Logger logger = LoggerFactory.getLogger(TeamMemberController.class);

    @Autowired
    private TeamMemberService teamMemberService;

    @PreAuthorize("hasAnyRole('Admin','HR','SeniorManager','TeamManager', 'TeamMember')")
    @PostMapping({ "/addOwnSkill/{userName}" })
    public String addOwnSkill(@RequestBody Skills skill, @PathVariable String userName) {
        logger.info("Adding Own Skill");
        return teamMemberService.addOwnSkill(skill, userName);

    }

    @PreAuthorize("hasAnyRole('Admin','HR','SeniorManager','TeamManager', 'TeamMember')")
    @PutMapping({ "/UpdateSkillLevel/{userName}" })
    public User UpdateSkillLevel(@PathVariable String userName, @RequestBody UpdateSkillLevel skillLevel) {
        logger.info("Updating Skill Level");
        return teamMemberService.UpdateSkillLevel(userName, skillLevel);
    }

}
