package com.sbsiskillManagementSystem.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sbsiskillManagementSystem.entity.JwtRequest;
import com.sbsiskillManagementSystem.entity.JwtResponse;
import com.sbsiskillManagementSystem.service.JwtService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class JwtController {
    Logger logger = LoggerFactory.getLogger(JwtController.class);

    @Autowired
    private JwtService jwtService;

    @PostMapping({ "/authenticate" })
    public JwtResponse createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        logger.info("Jwt token is updated");
        return jwtService.createJwtToken(jwtRequest);
    }

}
