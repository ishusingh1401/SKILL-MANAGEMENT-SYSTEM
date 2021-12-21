package com.sbsiskillManagementSystem.service;

import java.util.*;

import com.sbsiskillManagementSystem.dao.SkillsEntityDao;
import com.sbsiskillManagementSystem.dao.UserDao;
import com.sbsiskillManagementSystem.dao.TeamNamesDao;
import com.sbsiskillManagementSystem.entity.AdminRequestModal;
import com.sbsiskillManagementSystem.entity.Skills;
import com.sbsiskillManagementSystem.entity.SkillsEntity;
import com.sbsiskillManagementSystem.entity.TeamNames;
import com.sbsiskillManagementSystem.entity.User;
import com.sbsiskillManagementSystem.entity.UpdateTeamName;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
	Logger logger = LoggerFactory.getLogger(AdminService.class);

	@Autowired
	private UserDao userDao;

	@Autowired
	private SkillsEntityDao skillsEntityDao;

	@Autowired
	private TeamNamesDao teamNamesDao;

	public SkillsEntity adminAddSkills(AdminRequestModal skillName) {

		SkillsEntity s = new SkillsEntity();
		s.setSkillName(skillName.getSkillName());
		s.setSkillCategory(skillName.getSkillCategory());
		List<SkillsEntity> skills = skillsEntityDao.findAll();
		for (SkillsEntity skill : skills) {
			if (skill.getSkillName().equalsIgnoreCase(skillName.getSkillName())) {
				logger.debug("skill name: {}, category: {} is already present", skillName.getSkillName(),
						skillName.getSkillCategory());
				return s;
			}
		}
		logger.debug("adding skill name: {}, category: {}", skillName.getSkillName(), skillName.getSkillCategory());
		return skillsEntityDao.save(s);
	}

	public List<SkillsEntity> adminDeleteSkills(AdminRequestModal skillName) {

		List<SkillsEntity> skills = skillsEntityDao.findAll();
		for (SkillsEntity skill : skills) {
			if (skill.getSkillName().equalsIgnoreCase(skillName.getSkillName())) {
				skillsEntityDao.delete(skill);
			}
		}

		List<User> users = userDao.findAll();
		for (User user : users) {
			Set<Skills> userSkills = user.getUserSkill();
			for (Skills skill : userSkills) {
				if (skill.getSkillName().equals(skillName.getSkillName())) {
					userSkills.remove(skill);
					break;
				}
			}
			user.setUserSkill(userSkills);
			userDao.save(user);
		}
		return skillsEntityDao.findAll();
	}

	public User adminViewSkills(String userName) {

		return userDao.findById(userName).get();
	}

	public Boolean updateTeamName(String userName, UpdateTeamName userTeamName) {

		Optional<User> user = userDao.findById(userName);
		if (user.isPresent()) {
			user.get().setUserTeamName(userTeamName.getUserTeamName());
			userDao.save(user.get());
			List<TeamNames> teamNames = teamNamesDao.findAll();
			boolean entityContainTeamName = false;
			for (TeamNames teamName : teamNames) {
				if (teamName.getTeamName().equalsIgnoreCase(userTeamName.getUserTeamName())) {
					entityContainTeamName = true;
					break;
				}

			}

			if (!entityContainTeamName) {

				TeamNames newteamName = new TeamNames();

				newteamName.setTeamName(userTeamName.getUserTeamName());
				logger.debug("updating team name of: {} to: {}", userName, userTeamName.getUserTeamName());
				teamNamesDao.save(newteamName);

			}

			return true;
		}

		else {
			logger.debug("{} username doesn't exist in the database", userName);
			return false;
		}
	}

}
