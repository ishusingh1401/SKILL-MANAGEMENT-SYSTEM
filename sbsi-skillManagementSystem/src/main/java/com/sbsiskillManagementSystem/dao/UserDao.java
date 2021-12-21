package com.sbsiskillManagementSystem.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.sbsiskillManagementSystem.entity.User;

@Repository
public interface UserDao extends MongoRepository<User, String> {

}
