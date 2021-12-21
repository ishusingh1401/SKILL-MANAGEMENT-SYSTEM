package com.sbsiskillManagementSystem.service;

import com.sbsiskillManagementSystem.dao.SkillsEntityDao;
import com.sbsiskillManagementSystem.dao.UserDao;
import com.sbsiskillManagementSystem.entity.Skills;
import com.sbsiskillManagementSystem.entity.SkillsEntity;
import com.sbsiskillManagementSystem.entity.User;
import com.sbsiskillManagementSystem.entity.UpdateSkillLevel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamMemberService {
    Logger logger = LoggerFactory.getLogger(TeamMemberService.class);

    @Autowired
    private UserDao userDao;

    @Autowired
    private SkillsEntityDao skillsEntityDao;

    public String addOwnSkill(Skills skill, String userName) {

        User user = userDao.findById(userName).get();

        Set<Skills> skills = user.getUserSkill();
        for (Skills s : skills) {
            if (s.getSkillName().equals(skill.getSkillName())) {
                logger.debug("Skill Name : {} , Skill Category : {} [Already present]", s.getSkillName(),
                        skill.getSkillCategory());
                return "Skill " + skill.getSkillName()
                        + " is already present. To Update skill Level go to Modify Skill Level";
            }
        }
        logger.debug("Skill Name : {} , Skill Category : {} [Added]", skill.getSkillName(), skill.getSkillCategory());

        skills.add(skill);
        user.setUserSkill(skills);
        userDao.save(user);

        boolean skillsEntityAlreadyContainSkill = false;
        List<SkillsEntity> sE = skillsEntityDao.findAll();
        for (SkillsEntity s : sE) {
            if (skill.getSkillName().equalsIgnoreCase(s.getSkillName())) {
                skillsEntityAlreadyContainSkill = true;
                break;
            }

        }
        if (!skillsEntityAlreadyContainSkill) {
            SkillsEntity skillsEntity = new SkillsEntity();
            skillsEntity.setSkillName(skill.getSkillName());
            skillsEntity.setSkillCategory(skill.getSkillCategory());
            skillsEntityDao.save(skillsEntity);
        }

        return "Skill " + skill.getSkillName() + " added to your skill set";
    }

    public User UpdateSkillLevel(String userName, UpdateSkillLevel skillLevel) {
        User user = userDao.findById(userName).get();
        Set<Skills> skills = user.getUserSkill();
        for (Skills s : skills) {
            if (s.getSkillName().equalsIgnoreCase(skillLevel.getSkillName())) {
                s.setSkillLevel(skillLevel.getSkillLevel());
                userDao.save(user);
                break;
            }
        }
        logger.debug("Skill Name : {} , Skill Level : {} [Updated]", skillLevel.getSkillName(),
                skillLevel.getSkillLevel());
        return user;
    }

    public List<String> showSkillNameList() {
        logger.debug("Skill Name List [Displayed]");
        return skillsEntityDao.findAll().stream().map(SkillsEntity::getSkillName).collect(Collectors.toList());
    }

    public List<String> showSkillCategoryList() {
        logger.debug("Skill Category List [Displayed]");
        return skillsEntityDao.findAll().stream().map(SkillsEntity::getSkillCategory).collect(Collectors.toList());
    }
}
