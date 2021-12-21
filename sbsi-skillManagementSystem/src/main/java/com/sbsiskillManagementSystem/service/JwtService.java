package com.sbsiskillManagementSystem.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import com.sbsiskillManagementSystem.dao.UserDao;
import com.sbsiskillManagementSystem.entity.JwtRequest;
import com.sbsiskillManagementSystem.entity.JwtResponse;
import com.sbsiskillManagementSystem.entity.User;
import com.sbsiskillManagementSystem.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class JwtService implements UserDetailsService {

    Logger logger = LoggerFactory.getLogger(UserDetailsService.class);

    @Autowired
    private UserDao userDao;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception {

        String userName = jwtRequest.getUserName();
        String userPassword = jwtRequest.getUserPassword();

        String authenticate = authenticate(userName, userPassword);
        if (authenticate.equals("user is disabled") || authenticate.equals("Bad Credentials for User")) {
            logger.info("Incorrect Credentials");
            return new JwtResponse(null, "", authenticate);
        }

        final UserDetails userDetails = loadUserByUsername(userName);
        if (userDetails == null) {
            logger.info("Incorrect Credentials");
            return new JwtResponse(null, "", "Bad Credentials for User");
        }

        String newGeneratedToken = jwtUtil.generateToken(userDetails);

        User user = userDao.findById(userName).get();
        logger.info("Credentials have successfully matched");

        return new JwtResponse(user, newGeneratedToken, "User Successfully Logged In");

    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        Optional<User> user = userDao.findById(username);

        if (user.isPresent()) {

            return new org.springframework.security.core.userdetails.User(user.get().getUserName(),
                    user.get().getUserPassword(), getAuthorities(user.get())

            );

        } else {
            return null;

        }
    }

    private Set<SimpleGrantedAuthority> getAuthorities(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getUserRole()));
        return authorities;
    }

    private String authenticate(String userName, String userPassword) throws Exception {
        String msg = "";
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, userPassword));
            msg = "authenticated";
        } catch (DisabledException e) {
            msg = "user is disabled";
            throw new Exception("user is disabled");

        } catch (BadCredentialsException e) {
            msg = "Bad Credentials for User";
            throw new Exception("Bad Credentials for User");
        } finally {
            return msg;
        }
    }

}
