package com.ordercloud.controller;

import com.ordercloud.dto.UserDto;
import com.ordercloud.entity.User;
import com.ordercloud.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public List<UserDto> list() {
        return userRepository.findAll().stream().map(u -> new UserDto(u)).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return userRepository.findById(id).map(u -> ResponseEntity.ok(new UserDto(u))).orElse(ResponseEntity.notFound().build());
    }
}
