package com.quickcart.backend.repository;

import java.util.List;

import com.quickcart.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(
            String name,
            String category);
}
