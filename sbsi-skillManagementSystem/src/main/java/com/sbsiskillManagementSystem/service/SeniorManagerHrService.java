package com.sbsiskillManagementSystem.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import com.sbsiskillManagementSystem.dao.ProjectsDao;
import com.sbsiskillManagementSystem.dao.TeamNamesDao;
import com.sbsiskillManagementSystem.dao.UserDao;
import com.sbsiskillManagementSystem.entity.InfoSkills;
import com.sbsiskillManagementSystem.entity.Projects;
import com.sbsiskillManagementSystem.entity.ReportProjectEntity;
import com.sbsiskillManagementSystem.entity.ReportSkillEntity;
import com.sbsiskillManagementSystem.entity.ReportTeamEntity;
import com.sbsiskillManagementSystem.entity.ReportTeamMemEntity;
import com.sbsiskillManagementSystem.entity.SkillReportObject;
import com.sbsiskillManagementSystem.entity.Skills;
import com.sbsiskillManagementSystem.entity.TeamNames;
import com.sbsiskillManagementSystem.entity.UpdateProjectName;
import com.sbsiskillManagementSystem.entity.User;

import org.apache.commons.math3.util.Precision;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeniorManagerHrService {

	Logger logger = LoggerFactory.getLogger(SeniorManagerHrService.class);
	private static final String HASHMAP_CREATED = "Skill report processing completed, hashmap created";
	private static final String HASHMAP_EMPTY = "Skill report processing completed, but no skills found. Generating empty report";

	@Autowired
	private UserDao userDao;

	@Autowired
	private ProjectsDao projectsDao;

	@Autowired
	private TeamNamesDao teamNamesDao;

	public List<SkillReportObject> generateReportBySkill() {

		List<User> users = userDao.findAll();
		Map<String, InfoSkills> hm = new HashMap<>();

		logger.debug("Skill report processing started");

		for (User user : users) {
			Set<Skills> skills = user.getUserSkill();
			for (Skills s : skills) {
				boolean isKeyPresent = hm.containsKey(s.getSkillName().toUpperCase());
				if (isKeyPresent) {
					InfoSkills value = hm.get(s.getSkillName().toUpperCase());
					int count = value.getTotalusers();
					Double avgSkill = value.getAverageskill() * count + s.getSkillLevel();
					count++;
					avgSkill /= count * 1.0;
					value.setAverageskill(avgSkill);
					value.setTotalusers(count);
					hm.put(s.getSkillName().toUpperCase(), value);
				} else {
					hm.put(s.getSkillName().toUpperCase(),
							new InfoSkills(s.getSkillName().toUpperCase(), 1, s.getSkillLevel()));
				}
			}

		}

		if (!hm.isEmpty())
			logger.debug(HASHMAP_CREATED);
		else
			logger.debug(HASHMAP_EMPTY);

		List<SkillReportObject> response = new ArrayList<>();

		for (Map.Entry<String, InfoSkills> entry : hm.entrySet()) {
			response.add(new SkillReportObject(entry.getKey(), entry.getValue().getTotalusers(),
					Precision.round(entry.getValue().getAverageskill(), 1)));
		}

		logger.debug("Generated report for all skills present in the DB");

		return response;

	}

	public ReportSkillEntity generateReportBySkills(String skillName) {
		List<User> users = userDao.findAll();
		Map<String, InfoSkills> hm = new HashMap<>();
		for (User user : users) {
			Set<Skills> skills = user.getUserSkill();
			for (Skills skill : skills) {
				if (skill.getSkillName().equalsIgnoreCase(skillName)) {
					boolean isKeyPresent = hm.containsKey(skill.getSkillName().toUpperCase());
					if (isKeyPresent) {
						InfoSkills value = hm.get(skill.getSkillName().toUpperCase());
						int count = value.getTotalusers();
						Double avgSkill = value.getAverageskill() * count + skill.getSkillLevel();
						count++;
						avgSkill /= count * 1.0;
						value.setAverageskill(avgSkill);
						value.setTotalusers(count);
						hm.put(skill.getSkillName().toUpperCase(), value);
					} else {
						hm.put(skill.getSkillName().toUpperCase(),
								new InfoSkills(skill.getSkillName().toUpperCase(), 1, skill.getSkillLevel()));

					}
				}
			}
		}
		return new ReportSkillEntity(hm);
	}

	public List<SkillReportObject> generateReportBySkillsCategory(String skillCategory) {
		List<User> users = userDao.findAll();
		Map<String, InfoSkills> hm = new HashMap<>();

		logger.debug("Skill report processing for skill category '{}' started", skillCategory);

		for (User user : users) {
			Set<Skills> skills = user.getUserSkill();
			for (Skills skill : skills) {
				if (skill.getSkillCategory().equalsIgnoreCase(skillCategory)) {
					boolean isKeyPresent = hm.containsKey(skill.getSkillName().toUpperCase());
					if (isKeyPresent) {
						InfoSkills value = hm.get(skill.getSkillName().toUpperCase());
						int count = value.getTotalusers();
						Double avgSkill = value.getAverageskill() * count + skill.getSkillLevel();
						count++;
						avgSkill /= count * 1.0;
						value.setAverageskill(avgSkill);
						value.setTotalusers(count);
						hm.put(skill.getSkillName().toUpperCase(), value);
					} else {
						hm.put(skill.getSkillName().toUpperCase(),
								new InfoSkills(skill.getSkillName().toUpperCase(), 1, skill.getSkillLevel()));
					}
				}
			}
		}

		if (!hm.isEmpty())
			logger.debug(HASHMAP_CREATED);
		else
			logger.debug(HASHMAP_EMPTY);

		List<SkillReportObject> response = new ArrayList<>();

		for (Map.Entry<String, InfoSkills> entry : hm.entrySet()) {
			response.add(new SkillReportObject(entry.getKey(), entry.getValue().getTotalusers(),
					Precision.round(entry.getValue().getAverageskill(), 1)));
		}

		logger.debug("Generated report for skill category: '{}'", skillCategory);

		return response;
	}

	public ReportTeamEntity generateReportByTeams(String userTeamName) {

		List<User> users = userDao.findAll();
		List<String> u = new ArrayList<>();
		Map<String, InfoSkills> hm = new HashMap<>();

		logger.debug("Skill report processing for team name '{}' started", userTeamName);

		for (User user : users) {
			if (user.getUserTeamName().equalsIgnoreCase(userTeamName)) {

				u.add(user.getUserFirstName() + " " + user.getUserLastName() + " (" + user.getUserName() + ")");
				Set<Skills> skills = user.getUserSkill();
				for (Skills s : skills) {
					boolean isKeyPresent = hm.containsKey(s.getSkillName().toUpperCase());
					if (isKeyPresent) {
						InfoSkills value = hm.get(s.getSkillName().toUpperCase());
						int count = value.getTotalusers();
						Double avgSkill = value.getAverageskill() * count + s.getSkillLevel();
						count++;
						avgSkill /= count * 1.0;
						value.setAverageskill(avgSkill);
						value.setTotalusers(count);
						hm.put(s.getSkillName().toUpperCase(), value);
					} else {
						hm.put(s.getSkillName().toUpperCase(),
								new InfoSkills(s.getSkillName().toUpperCase(), 1, s.getSkillLevel()));
					}
				}
			}
		}

		if (!hm.isEmpty())
			logger.debug(HASHMAP_CREATED);
		else
			logger.debug(HASHMAP_EMPTY);

		List<InfoSkills> infoSkillsList = new ArrayList<>();
		for (Map.Entry<String, InfoSkills> entry : hm.entrySet()) {
			infoSkillsList.add(entry.getValue());
		}

		logger.debug("Generated skill report for team: '{}'", userTeamName);

		return new ReportTeamEntity(u, infoSkillsList);
	}

	public ReportTeamMemEntity generateReportByTeamMembersName(String userName) {

		logger.debug("Skill report processing for username '{}' started", userName);

		Optional<User> user = userDao.findById(userName);

		if (user.isPresent()) {
			logger.debug("Generated skill report for username: '{}'", userName);
			return (new ReportTeamMemEntity(user.get()));
		} else {
			logger.error("Error generating report, username '{}' doesn't exist in DB", userName);
			return null;
		}
	}

	public ReportProjectEntity generateReportByProject(String userProjectName) {

		List<User> users = userDao.findAll();
		Set<String> u = new HashSet<>();
		Map<String, InfoSkills> hm = new HashMap<>();

		logger.debug("Skill report processing by project '{}' started", userProjectName);

		for (User user : users) {
			if (user.getUserProjectName().equalsIgnoreCase(userProjectName)) {
				u.add(user.getUserTeamName());
				Set<Skills> skills = user.getUserSkill();
				for (Skills s : skills) {
					boolean isKeyPresent = hm.containsKey(s.getSkillName().toUpperCase());
					if (isKeyPresent) {
						InfoSkills value = hm.get(s.getSkillName().toUpperCase());
						int count = value.getTotalusers();
						Double avgSkill = value.getAverageskill() * count + s.getSkillLevel();
						count++;
						avgSkill /= count * 1.0;
						value.setAverageskill(avgSkill);
						value.setTotalusers(count);
						hm.put(s.getSkillName().toUpperCase(), value);
					} else {
						ArrayList<Double> value = new ArrayList<>(2);
						value.add((double) 1);
						value.add((double) s.getSkillLevel());
						hm.put(s.getSkillName().toUpperCase(),
								new InfoSkills(s.getSkillName().toUpperCase(), 1, s.getSkillLevel()));
					}
				}
			}
		}

		if (!hm.isEmpty())
			logger.debug(HASHMAP_CREATED);
		else
			logger.debug(HASHMAP_EMPTY);

		List<InfoSkills> infoSkillsList = new ArrayList<>();
		for (Map.Entry<String, InfoSkills> entry : hm.entrySet()) {
			infoSkillsList.add(entry.getValue());
		}

		logger.debug("Generated skill report by project: '{}'", userProjectName);

		return new ReportProjectEntity(u, infoSkillsList);
	}

	public ReportTeamEntity generateReportByProjectByTeam(String userProjectName, String userTeamName) {

		List<User> users = userDao.findAll();
		List<String> u = new ArrayList<>();
		Map<String, InfoSkills> hm = new HashMap<>();
		for (User user : users) {
			if (user.getUserProjectName().equalsIgnoreCase(userProjectName)
					&& user.getUserTeamName().equalsIgnoreCase(userTeamName)) {
				u.add(user.getUserFirstName() + " " + user.getUserLastName() + " (" + user.getUserName() + ")");
				Set<Skills> skills = user.getUserSkill();
				for (Skills s : skills) {
					boolean isKeyPresent = hm.containsKey(s.getSkillName().toUpperCase());
					if (isKeyPresent) {
						InfoSkills value = hm.get(s.getSkillName().toUpperCase());
						int count = value.getTotalusers();
						Double avgSkill = value.getAverageskill() * count + s.getSkillLevel();
						count++;
						avgSkill /= count * 1.0;
						value.setAverageskill(avgSkill);
						value.setTotalusers(count);
						hm.put(s.getSkillName().toUpperCase(), value);
					} else {
						hm.put(s.getSkillName().toUpperCase(),
								new InfoSkills(s.getSkillName().toUpperCase(), 1, s.getSkillLevel()));
					}
				}
			}
		}

		List<InfoSkills> infoSkillsList = new ArrayList<>();
		for (Map.Entry<String, InfoSkills> entry : hm.entrySet()) {
			infoSkillsList.add(entry.getValue());
		}
		return new ReportTeamEntity(u, infoSkillsList);
	}

	public Boolean addProjectToAssign(String userName, UpdateProjectName project) {

		Optional<User> user = userDao.findById(userName);

		if (user.isPresent()) {
			logger.debug("User '{}' found in the database, process to assign project started", userName);

			user.get().setUserProjectName(project.getUserProjectName());
			userDao.save(user.get());
			List<Projects> projects = projectsDao.findAll();
			boolean entityContainProject = false;
			for (Projects p : projects) {
				if (p.getProjectName().equalsIgnoreCase(user.get().getUserProjectName())) {

					entityContainProject = true;
					break;
				}
			}
			if (!entityContainProject) {
				logger.debug("Adding project '{}' to master DB as it does not exists", project.getUserProjectName());

				Projects newProject = new Projects();
				newProject.setProjectName(project.getUserProjectName());
				projectsDao.save(newProject);
			}

			logger.debug("Project '{}' assigned to user '{}'", project.getUserProjectName(), userName);
			return true;
		}

		else {
			logger.error("Project couldn't be assigned as username '{}' does not exist in the DB", userName);
			return false;
		}
	}

	public String addProject(Projects projectName) {

		List<Projects> projL = projectsDao.findAll();

		for (Projects proj : projL) {
			if (proj.getProjectName().equalsIgnoreCase(projectName.getProjectName())) {

				logger.error("Aborting, project '{}'  already exists in DB", projectName.getProjectName());
				return "Already exists in the database";
			}
		}
		projectsDao.save(new Projects(projectName.getProjectName()));

		logger.debug("Project '{}'  added to the DB", projectName.getProjectName());
		return "Project added to the database";
	}

	public List<Projects> viewProject() {

		return projectsDao.findAll();

	}

	public String saveTeamName(TeamNames teamName) {
		Optional<TeamNames> teamNameInList = teamNamesDao.findAll().stream()
				.filter(t -> t.getTeamName().equalsIgnoreCase(teamName.getTeamName())).findAny();
		if (teamNameInList.isEmpty()) {
			teamNamesDao.save(new TeamNames(teamName.getTeamName()));
			return teamName.getTeamName() + " successfully added";
		}
		return teamName.getTeamName() + " already exists in Database";
	}

	public User assignTeam(TeamNames teamName, String userName) {
		saveTeamName(teamName);
		List<User> userList = userDao.findAll();
		for (User user : userList) {
			if (user.getUserName().equalsIgnoreCase(userName)) {
				user.setUserTeamName(teamName.getTeamName());
				userDao.save(user);
				return user;
			}
		}
		return null;
	}

}
