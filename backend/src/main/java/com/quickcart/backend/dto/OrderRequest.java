package com.quickcart.backend.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    private Long userId;
    private Long addressId;
    private Double totalAmount;
    private String paymentMethod;
    private List<OrderItemRequest> items;
}
