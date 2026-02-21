
package com.quickcart.backend.controller;

import com.quickcart.backend.model.Product;
import com.quickcart.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;

    // ✅ ADD PRODUCT (multipart/form-data)
    @PostMapping
    public ResponseEntity<Product> addProduct(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String category,
            @RequestParam Double price,
            @RequestParam Double offerPrice,
            @RequestParam(required = false) List<MultipartFile> images) throws IOException {

        Product product = productService.addProduct(
                name, description, category, price, offerPrice, images);

        return ResponseEntity.ok(product);
    }

    // ✅ GET ALL PRODUCTS
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // ✅ GET PRODUCT BY ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // ✅ UPDATE PRODUCT (SAME AS ADD — multipart/form-data)
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String category,
            @RequestParam Double price,
            @RequestParam Double offerPrice,
            @RequestParam(required = false) List<MultipartFile> images) throws IOException {

        Product updatedProduct = productService.updateProduct(
                id, name, description, category, price, offerPrice, images);

        return ResponseEntity.ok(updatedProduct);
    }

    // ✅ DELETE PRODUCT
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String q) {
        return productService.searchProducts(q);
    }

}
