package com.sbsiskillManagementSystem.controller;

import java.util.List;

import com.sbsiskillManagementSystem.entity.User;
import com.sbsiskillManagementSystem.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

	Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@PostMapping({ "/register" })
	public User addNewUser(@RequestBody User user) {
		logger.info("User with userName: {} is registered as {} .", user.getUserName(), user.getUserRole());
		return userService.addNewUser(user);
	}

	@GetMapping({ "/checkUserName/{userName}" })
	public Boolean checkUserName(@PathVariable String userName) {
		logger.info("Username : {} is checked .", userName);
		return userService.checkUserName(userName);
	}

	@GetMapping({ "/getAllUsers" })
	public List<User> getTheUsers() {
		logger.info("All Users are displayed .");
		return userService.getAllUsers();
	}

	@PreAuthorize("hasAnyRole('Admin','HR','SeniorManager','TeamManager', 'TeamMember')")
	@GetMapping({ "/viewUserByuserName/{userName}" })
	public User viewUserByuserName(@PathVariable String userName) {
		logger.info("User with Username: {} is viewed .", userName);
		return userService.viewUserByuserName(userName);
	}
}
