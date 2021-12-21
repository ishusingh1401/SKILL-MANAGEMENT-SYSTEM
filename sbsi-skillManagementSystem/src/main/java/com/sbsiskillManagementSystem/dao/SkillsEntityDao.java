package com.sbsiskillManagementSystem.dao;

import com.sbsiskillManagementSystem.entity.SkillsEntity;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SkillsEntityDao extends MongoRepository<SkillsEntity, String> {

}
