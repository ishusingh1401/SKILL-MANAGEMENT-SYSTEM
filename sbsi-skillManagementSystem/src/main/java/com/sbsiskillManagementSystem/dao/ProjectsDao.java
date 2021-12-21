package com.sbsiskillManagementSystem.dao;

import com.sbsiskillManagementSystem.entity.Projects;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjectsDao extends MongoRepository<Projects, String> {

}
