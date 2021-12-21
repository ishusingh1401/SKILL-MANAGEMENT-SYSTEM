package com.sbsiskillManagementSystem.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.sbsiskillManagementSystem.dao.SkillsEntityDao;
import com.sbsiskillManagementSystem.dao.TeamNamesDao;
import com.sbsiskillManagementSystem.dao.UserDao;
import com.sbsiskillManagementSystem.entity.RefineTeamEntity;
import com.sbsiskillManagementSystem.entity.Skills;
import com.sbsiskillManagementSystem.entity.SkillsEntity;
import com.sbsiskillManagementSystem.entity.TeamNames;
import com.sbsiskillManagementSystem.entity.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamManagerService {

    Logger logger = LoggerFactory.getLogger(TeamManagerService.class);

    @Autowired
    private UserDao userDao;

    @Autowired
    private SkillsEntityDao skillsEntityDao;

    @Autowired
    private TeamNamesDao teamNamesDao;

    public List<RefineTeamEntity> showTeamMember(String userTeamName) {

        List<User> users = userDao.findAll();
        List<RefineTeamEntity> updatedUsers = new ArrayList<>();
        for (User user : users) {
            if (user.getUserTeamName().equalsIgnoreCase(userTeamName)) {
                updatedUsers.add(new RefineTeamEntity(user));
            }
        }
        logger.debug("Listing all Members of '{}' team", userTeamName);
        return updatedUsers;

    }

    public List<RefineTeamEntity> addSkills(Skills skill, String teamName) {
        List<RefineTeamEntity> updatedUsers = showTeamMember(teamName);
        for (RefineTeamEntity user : updatedUsers) {
            Set<Skills> skills = user.getUserSkill();
            boolean userAlreadyContainSkill = false;
            for (Skills s : skills) {
                if (s.getSkillName().equals(skill.getSkillName())) {
                    userAlreadyContainSkill = true;
                    break;
                }
            }
            if (!userAlreadyContainSkill) {
                User u = userDao.findById(user.getUserName()).get();
                skills.add(skill);
                u.setUserSkill(skills);
                userDao.save(u);
            }
        }
        logger.debug("Skill Name: {}, Category: {} added to SkillSet of whole '{}' team", skill.getSkillName(),
                skill.getSkillCategory(), teamName);

        SkillsEntity skillsEntity = new SkillsEntity();
        skillsEntity.setSkillName(skill.getSkillName());
        skillsEntity.setSkillCategory(skill.getSkillCategory());
        boolean skillsEntityAlreadyContainSkill = false;
        List<SkillsEntity> skills = skillsEntityDao.findAll();
        for (SkillsEntity s : skills) {
            if (skill.getSkillName().equalsIgnoreCase(s.getSkillName())) {
                skillsEntityAlreadyContainSkill = true;
                logger.debug(
                        "Skill Name: {}, is already present in 'SkillsEntity' table. Just added to the SkillSet of members of Team '{}'",
                        skill.getSkillName(), teamName);
                break;
            }

        }
        if (!skillsEntityAlreadyContainSkill) {
            skillsEntityDao.save(skillsEntity);
            logger.debug("Adding skill name: {}, category: {} to 'SkillsEntity' table as well", skill.getSkillName(),
                    skill.getSkillCategory());
        }
        return updatedUsers;
    }

    public void saveTeamName(TeamNames teamName) {
        Optional<TeamNames> teamNameInList = teamNamesDao.findAll().stream()
                .filter(t -> t.getTeamName().equalsIgnoreCase(teamName.getTeamName())).findAny();
        if (teamNameInList.isEmpty())
            teamNamesDao.save(new TeamNames(teamName.getTeamName()));
        logger.debug("Team Name: {} added to 'teamNames' table", teamName.getTeamName());
    }

    public User assignTeam(TeamNames teamName, String userName) {
        saveTeamName(teamName);
        List<User> userList = userDao.findAll();
        for (User user : userList) {
            if (user.getUserName().equalsIgnoreCase(userName)) {
                user.setUserTeamName(teamName.getTeamName());
                userDao.save(user);
                logger.debug("User '{}' assigned to a new Team '{}'", userName, teamName.getTeamName());
                return user;
            }
        }
        logger.debug("User '{}' doesn't exist", userName);
        return null;
    }

    public List<String> showTeamNamesList() {
        List<TeamNames> teams = teamNamesDao.findAll();
        List<String> updatedTeams = new ArrayList<>();
        for (TeamNames team : teams) {
            updatedTeams.add(team.getTeamName().toUpperCase());
        }
        logger.debug("Listing all Team Names from 'teamNames' table");
        return updatedTeams;
    }

    public List<String> showSkillCategoryList() {
        List<SkillsEntity> skills = skillsEntityDao.findAll();
        Set<String> skillset = new HashSet<>();
        for (SkillsEntity skill : skills) {
            skillset.add(skill.getSkillCategory().toUpperCase());
        }
        logger.debug("Listing all Skills Categories from 'skillEntity' table");
        return skillset.stream().collect(Collectors.toList());
    }

    public List<String> showSkillByCategoryList(String skillCategory) {
        List<SkillsEntity> skills = skillsEntityDao.findAll();
        List<String> updatedSkills = new ArrayList<>();
        for (SkillsEntity skill : skills) {
            if (skill.getSkillCategory().equalsIgnoreCase(skillCategory)) {
                updatedSkills.add(skill.getSkillName().toUpperCase());
            }
        }
        logger.debug("Listing all Skill Names of Skill Category: '{}' from 'skillEntity' table", skillCategory);
        return updatedSkills;
    }

}
