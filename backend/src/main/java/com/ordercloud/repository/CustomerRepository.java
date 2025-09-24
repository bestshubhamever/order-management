package com.ordercloud.repository;

import com.ordercloud.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT c FROM Customer c WHERE " +
           "LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.email) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.city) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.country) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Customer> findWithSearch(@Param("search") String search, Pageable pageable);

    @Query("SELECT c FROM Customer c WHERE c.country = :country")
    Page<Customer> findByCountry(@Param("country") String country, Pageable pageable);

    @Query("SELECT c FROM Customer c WHERE c.city = :city")
    Page<Customer> findByCity(@Param("city") String city, Pageable pageable);

    @Query("SELECT COUNT(c) FROM Customer c")
    long countAllCustomers();

    @Query("SELECT DISTINCT c.country FROM Customer c ORDER BY c.country")
    Page<String> findDistinctCountries(Pageable pageable);

    @Query("SELECT DISTINCT c.city FROM Customer c WHERE c.country = :country ORDER BY c.city")
    Page<String> findDistinctCitiesByCountry(@Param("country") String country, Pageable pageable);
}