package com.ordercloud.repository;

import com.ordercloud.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findBySku(String sku);

    Optional<Product> findBySkuAndActiveTrue(String sku);

    boolean existsBySku(String sku);

    Page<Product> findByActiveTrue(Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.active = true AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.sku) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.category) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Product> findActiveProductsWithSearch(@Param("search") String search, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category = :category AND p.active = true")
    Page<Product> findByCategoryAndActiveTrue(@Param("category") String category, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice AND p.active = true")
    Page<Product> findByPriceBetweenAndActiveTrue(@Param("minPrice") BigDecimal minPrice, 
                                                  @Param("maxPrice") BigDecimal maxPrice, 
                                                  Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.stock <= :threshold AND p.active = true")
    Page<Product> findLowStockProducts(@Param("threshold") Integer threshold, Pageable pageable);

    @Query("SELECT COUNT(p) FROM Product p WHERE p.active = true")
    long countActiveProducts();

    @Query("SELECT DISTINCT p.category FROM Product p WHERE p.active = true ORDER BY p.category")
    Page<String> findDistinctCategories(Pageable pageable);

    @Query("SELECT SUM(p.stock) FROM Product p WHERE p.active = true")
    Long getTotalStock();
}