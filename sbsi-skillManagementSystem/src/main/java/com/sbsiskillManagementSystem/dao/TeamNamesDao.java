package com.sbsiskillManagementSystem.dao;

import com.sbsiskillManagementSystem.entity.TeamNames;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TeamNamesDao extends MongoRepository<TeamNames,String> {
    
}
