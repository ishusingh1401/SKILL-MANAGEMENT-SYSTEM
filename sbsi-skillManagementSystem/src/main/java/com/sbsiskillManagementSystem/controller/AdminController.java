package com.sbsiskillManagementSystem.controller;

import java.util.List;

import com.sbsiskillManagementSystem.entity.AdminRequestModal;
import com.sbsiskillManagementSystem.entity.SkillsEntity;
import com.sbsiskillManagementSystem.entity.UpdateTeamName;
import com.sbsiskillManagementSystem.service.AdminService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AdminController {

	Logger logger = LoggerFactory.getLogger(AdminController.class);

	@Autowired
	private AdminService adminService;

	@PostMapping({ "/adminModifySkill" })
	@PreAuthorize("hasRole('Admin')")
	public SkillsEntity adminAddSkills(@RequestBody AdminRequestModal skillName) {
		logger.info("adding skill");
		return adminService.adminAddSkills(skillName);

	}

	@DeleteMapping({ "/adminModifySkill" })
	@PreAuthorize("hasRole('Admin')")
	public List<SkillsEntity> adminDeleteSkills(@RequestBody AdminRequestModal skillName) {
		logger.info("deleting skill");
		return (List<SkillsEntity>) adminService.adminDeleteSkills(skillName);

	}

	@PutMapping({ "/updateTeamName/{userName}" })
	@PreAuthorize("hasAnyRole('Admin','HR','SeniorManager','TeamManager')")
	public Boolean updateTeamName(@PathVariable String userName, @RequestBody UpdateTeamName userTeamName) {
		logger.info("updating team name");
		return adminService.updateTeamName(userName, userTeamName);
	}
}
