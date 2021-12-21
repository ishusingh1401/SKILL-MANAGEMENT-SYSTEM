package com.sbsiskillManagementSystem.service;

import java.util.List;
import java.util.Set;

import com.sbsiskillManagementSystem.dao.ProjectsDao;
import com.sbsiskillManagementSystem.dao.SkillsEntityDao;
import com.sbsiskillManagementSystem.dao.TeamNamesDao;
import com.sbsiskillManagementSystem.dao.UserDao;
import com.sbsiskillManagementSystem.entity.Projects;
import com.sbsiskillManagementSystem.entity.Skills;
import com.sbsiskillManagementSystem.entity.SkillsEntity;
import com.sbsiskillManagementSystem.entity.TeamNames;
import com.sbsiskillManagementSystem.entity.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	Logger logger = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private UserDao userDao;

	@Autowired
	private SkillsEntityDao skillsEntityDao;

	@Autowired
	private TeamNamesDao teamNamesDao;

	@Autowired
	private ProjectsDao projectsDao;

	@Autowired
	private PasswordEncoder passEncoder;

	public User addNewUser(User user) {

		Set<Skills> userskills = user.getUserSkill();
		List<SkillsEntity> skillsEntitySkills = skillsEntityDao.findAll();
		for (Skills userskill : userskills) {
			boolean entityContainUserSkill = false;
			for (SkillsEntity skillsEntitySkill : skillsEntitySkills) {

				if (userskill.getSkillName().equalsIgnoreCase(skillsEntitySkill.getSkillName())) {
					entityContainUserSkill = true;
					break;
				}
			}
			if (!entityContainUserSkill) {
				SkillsEntity skillsEntity = new SkillsEntity();
				skillsEntity.setSkillName(userskill.getSkillName());
				skillsEntity.setSkillCategory(userskill.getSkillCategory());
				skillsEntityDao.save(skillsEntity);
			}

		}

		List<TeamNames> teamNames = teamNamesDao.findAll();
		boolean entityContainTeamName = false;

		for (TeamNames teamName : teamNames) {
			if (teamName.getTeamName().equalsIgnoreCase(user.getUserTeamName())) {
				entityContainTeamName = true;
				break;
			}
		}
		if (!entityContainTeamName) {
			TeamNames newTeamName = new TeamNames();
			newTeamName.setTeamName(user.getUserTeamName());
			teamNamesDao.save(newTeamName);
		}

		List<Projects> projects = projectsDao.findAll();
		boolean entityContainProject = false;

		for (Projects project : projects) {
			if (project.getProjectName().equalsIgnoreCase(user.getUserProjectName())) {
				entityContainProject = true;
				break;
			}
		}
		if (!entityContainProject) {
			Projects newProject = new Projects();
			newProject.setProjectName(user.getUserProjectName());
			projectsDao.save(newProject);
		}

		user.setUserPassword(getEncodedPassword(user.getUserPassword()));

		logger.debug("New User with Username: {} and role: {} successfully registered .", user.getUserName(),
				user.getUserRole());
		return userDao.save(user);

	}

	public String getEncodedPassword(String password) {
		logger.debug("Password encryption is successfully done.");
		return passEncoder.encode(password);
	}

	public Boolean checkUserName(String userName) {
		if (userDao.findById(userName).isPresent()) {
			logger.debug("UserName: {} already exists .", userName);
			return true;
		} else {
			logger.debug("UserName: {} is successfully checked . ", userName);
			return false;
		}
	}

	public List<User> getAllUsers() {
		logger.debug("Listing all the Users in the database with necessary details .");
		return userDao.findAll();
	}

	public User viewUserByuserName(String userName) {
		logger.debug("User with username: {} is successfully viewed .", userName);
		return userDao.findById(userName).get();
	}

}
