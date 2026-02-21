package com.quickcart.backend.controller;

import com.quickcart.backend.dto.OrderRequest;
import com.quickcart.backend.model.*;
import com.quickcart.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

        private final OrderRepository orderRepository;
        private final UserRepository userRepository;
        private final ProductRepository productRepository;
        private final AddressRepository addressRepository;

        // ================= PLACE ORDER =================
        @PostMapping
        public Order placeOrder(@RequestBody OrderRequest request) {

                User user = userRepository.findById(request.getUserId())
                                .orElseThrow(() -> new RuntimeException("User not found"));

                Address address = addressRepository.findById(request.getAddressId())
                                .orElseThrow(() -> new RuntimeException("Address not found"));

                Order order = Order.builder()
                                .user(user)
                                .address(address)
                                .amount(request.getTotalAmount())
                                .paymentMethod(request.getPaymentMethod())
                                .status("PLACED")
                                .date(LocalDateTime.now())
                                .build();

                List<OrderItem> items = request.getItems().stream().map(itemReq -> {
                        Product product = productRepository.findById(itemReq.getProductId())
                                        .orElseThrow(() -> new RuntimeException("Product not found"));

                        return OrderItem.builder()
                                        .product(product)
                                        .quantity(itemReq.getQuantity())
                                        .order(order)
                                        .build();
                }).collect(Collectors.toList());

                order.setItems(items);

                return orderRepository.save(order);
        }

        // ================= GET MY ORDERS =================

        @GetMapping("/user/{userId}")
        public List<Order> getOrdersByUser(@PathVariable Long userId) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                return orderRepository.findByUser(user);
        }

        // ================= ADMIN : GET ALL ORDERS =================
        @GetMapping("/admin")
        public List<Order> getAllOrders() {
                return orderRepository.findAll();
        }

        // ================= ADMIN : UPDATE ORDER STATUS =================
        @PutMapping("/admin/{orderId}/status")
        public Order updateOrderStatus(
                        @PathVariable Long orderId,
                        @RequestParam String status) {
                Order order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found"));

                order.setStatus(status);
                return orderRepository.save(order);
        }

}
