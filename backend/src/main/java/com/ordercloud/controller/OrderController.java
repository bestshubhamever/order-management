package com.ordercloud.controller;

import com.ordercloud.entity.*;
import com.ordercloud.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductRepository productRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        // Basic validation and association
        if (order.getItems() == null || order.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body("Order must have at least one item");
        }
        // Set relationships and compute totals
        double total = 0.0;
        for (OrderItem item : order.getItems()) {
            if (item.getProduct() != null && item.getProduct().getId() != null) {
                productRepository.findById(item.getProduct().getId()).ifPresent(prod -> {
                    item.setProduct(prod);
                    item.setUnitPrice(prod.getPrice());
                    item.setSubtotal(prod.getPrice() * item.getQuantity());
                });
            }
            total += item.getSubtotal();
        }
        order.setTotalAmount(total);
        Order saved = orderRepository.save(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return orderRepository.findById(id).map(o -> ResponseEntity.ok(o)).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Order> list() {
        return orderRepository.findAll();
    }
}
