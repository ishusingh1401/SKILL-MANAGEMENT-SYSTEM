package com.sbsiskillManagementSystem.controller;

import java.util.List;

import com.sbsiskillManagementSystem.entity.Projects;
import com.sbsiskillManagementSystem.entity.ReportProjectEntity;
import com.sbsiskillManagementSystem.entity.ReportSkillEntity;
import com.sbsiskillManagementSystem.entity.ReportTeamEntity;
import com.sbsiskillManagementSystem.entity.ReportTeamMemEntity;
import com.sbsiskillManagementSystem.entity.SkillReportObject;
import com.sbsiskillManagementSystem.entity.UpdateProjectName;
import com.sbsiskillManagementSystem.service.SeniorManagerHrService;
import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController

public class SeniorManagerHrController {

	Logger logger = LoggerFactory.getLogger(SeniorManagerHrController.class);
	private static final String ERROR_LOGGER = "Error generating report, Exception occured: {}";

	@Autowired
	private SeniorManagerHrService seniorManagerHrService;

	@PreAuthorize("hasAnyRole('HR','SeniorManager')")
	@GetMapping({ "/generateReportBySkills" })
	public List<SkillReportObject> generateReportBySkill() {
		try {
			logger.info("Generating report for all skills present in the DB");
			return seniorManagerHrService.generateReportBySkill();

		} catch (Exception e) {
			logger.error(ERROR_LOGGER, e.getMessage());
			return Collections.emptyList();
		}
	}

	@PreAuthorize("hasAnyRole('HR','SeniorManager')")
	@GetMapping({ "/generateReportBySkills/{skillName}" })
	public ReportSkillEntity generateReportBySkills(@PathVariable String skillName) {
		return seniorManagerHrService.generateReportBySkills(skillName);
	}

	@PreAuthorize("hasAnyRole('HR','SeniorManager')")
	@GetMapping({ "/generateReportBySkillsCategory/{categoryName}" })
	public List<SkillReportObject> averageSkillCategory(@PathVariable String categoryName) {
		try {
			logger.info("Generating report by skill category: {}", categoryName);
			return seniorManagerHrService.generateReportBySkillsCategory(categoryName);

		} catch (Exception e) {
			logger.error(ERROR_LOGGER, e.getMessage());
			return Collections.emptyList();
		}
	}

	@PreAuthorize("hasAnyRole('HR','SeniorManager')")
	@GetMapping({ "/generateReportByTeam/{userTeamName}" })
	public ReportTeamEntity generateReportByTeam(@PathVariable String userTeamName) {
		try {
			logger.info("Generating skills report of team: {} ", userTeamName);
			return seniorManagerHrService.generateReportByTeams(userTeamName);

		} catch (Exception e) {
			logger.error(ERROR_LOGGER, e.getMessage());
			return null;
		}
	}

	@PreAuthorize("hasAnyRole('HR','SeniorManager')")
	@GetMapping({ "/generateReportByTeamMember/{userName}" })
	public ReportTeamMemEntity generateReportByTeamMembersName(@PathVariable String userName) {
		try {
			logger.info("Generating skills report of username: {} ", userName);
			return seniorManagerHrService.generateReportByTeamMembersName(userName);

		} catch (Exception e) {
			logger.error(ERROR_LOGGER, e.getMessage());
			return null;
		}
	}

	@PreAuthorize("hasAnyRole('HR','SeniorManager')")
	@GetMapping({ "/generateReportByProject/{userProjectName}" })
	public ReportProjectEntity generateReportByProject(@PathVariable String userProjectName) {
		try {
			logger.info("Generating skills report by project : {} ", userProjectName);
			return seniorManagerHrService.generateReportByProject(userProjectName);

		} catch (Exception e) {
			logger.error(ERROR_LOGGER, e.getMessage());
			return null;
		}
	}

	@PreAuthorize("hasAnyRole('HR','SeniorManager')")
	@GetMapping({ "/generateReportByProject/{userProjectName}/{userTeamName}" })
	public ReportTeamEntity generateReportByProjectByTeam(@PathVariable String userProjectName,
			@PathVariable String userTeamName) {
		try {
			logger.info("Generating skills report by project '{}' and team name  '{}'", userProjectName, userTeamName);
			return seniorManagerHrService.generateReportByProjectByTeam(userProjectName, userTeamName);

		} catch (Exception e) {
			logger.error(ERROR_LOGGER, e.getMessage());
			return null;
		}
	}

	@PreAuthorize("hasAnyRole('HR','SeniorManager','TeamManager')")
	@PutMapping({ "/AddProjectToAssign/{userName}" })
	public Boolean addProject(@PathVariable String userName, @RequestBody UpdateProjectName projectName) {
		logger.info("Assigning project '{}' to user {}", projectName.getUserProjectName(), userName);
		return seniorManagerHrService.addProjectToAssign(userName, projectName);

	}

	@PreAuthorize("hasAnyRole('HR','SeniorManager','TeamManager')")
	@PutMapping({ "/AddProject" })
	public String addProject(@RequestBody Projects projectName) {
		logger.info("Adding project '{}' to DB", projectName.getProjectName());
		return seniorManagerHrService.addProject(projectName);
	}

	@PreAuthorize("hasAnyRole('HR','SeniorManager', 'TeamManager')")
	@GetMapping({ "/viewProjects" })
	public List<Projects> viewProject() {
		logger.info("Viewing all projects present in DB");
		return seniorManagerHrService.viewProject();

	}

}
