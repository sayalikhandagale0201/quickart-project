package com.quickcart.backend.service;

import com.quickcart.backend.model.Product;
import com.quickcart.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    private final String UPLOAD_DIR = "uploads/";

    // =========================
    // ADD PRODUCT
    // =========================
    public Product addProduct(
            String name,
            String description,
            String category,
            Double price,
            Double offerPrice,
            List<MultipartFile> images) throws IOException {

        List<String> imageUrlList = new ArrayList<>();

        if (images != null) {
            for (MultipartFile file : images) {
                if (file == null || file.isEmpty())
                    continue;

                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get(UPLOAD_DIR + fileName);

                Files.createDirectories(filePath.getParent());
                Files.write(filePath, file.getBytes());

                imageUrlList.add("http://localhost:8080/uploads/" + fileName);
            }
        }

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setCategory(category);
        product.setPrice(price);
        product.setOfferPrice(offerPrice);
        product.setImageUrls(String.join(",", imageUrlList));

        return productRepository.save(product);
    }

    // =========================
    // UPDATE PRODUCT (SAME FORM)
    // =========================
    public Product updateProduct(
            Long id,
            String name,
            String description,
            String category,
            Double price,
            Double offerPrice,
            List<MultipartFile> images) throws IOException {

        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existing.setName(name);
        existing.setDescription(description);
        existing.setCategory(category);
        existing.setPrice(price);
        existing.setOfferPrice(offerPrice);

        // 👉 New images aaye to hi replace karo
        if (images != null && !images.isEmpty()) {

            List<String> imageUrlList = new ArrayList<>();

            for (MultipartFile file : images) {
                if (file == null || file.isEmpty())
                    continue;

                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get(UPLOAD_DIR + fileName);

                Files.createDirectories(filePath.getParent());
                Files.write(filePath, file.getBytes());

                imageUrlList.add("http://localhost:8080/uploads/" + fileName);
            }

            existing.setImageUrls(String.join(",", imageUrlList));
        }

        return productRepository.save(existing);
    }

    // =========================
    // GET ALL PRODUCTS
    // =========================
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // =========================
    // GET PRODUCT BY ID
    // =========================
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // =========================
    // DELETE PRODUCT
    // =========================
    public void deleteProduct(Long id) {

        Product product = getProductById(id);

        // delete images from folder
        if (product.getImageUrls() != null && !product.getImageUrls().isEmpty()) {
            for (String url : product.getImageUrls().split(",")) {
                String path = url.replace("http://localhost:8080/", "");
                File file = new File(path);
                if (file.exists())
                    file.delete();
            }
        }

        productRepository.deleteById(id);
    }

    // === search ==//
    public List<Product> searchProducts(String keyword) {
        return productRepository
                .findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(
                        keyword, keyword);
    }
}
