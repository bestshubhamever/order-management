package com.ordercloud.dto;

import java.math.BigDecimal;

public class DashboardStatsDto {

    private long totalOrders;
    private BigDecimal totalRevenue;
    private long pendingOrders;
    private long totalCustomers;
    private double monthlyGrowth;
    private BigDecimal avgOrderValue;

    // Constructors
    public DashboardStatsDto() {}

    public DashboardStatsDto(long totalOrders, BigDecimal totalRevenue, long pendingOrders, 
                            long totalCustomers, double monthlyGrowth, BigDecimal avgOrderValue) {
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
        this.pendingOrders = pendingOrders;
        this.totalCustomers = totalCustomers;
        this.monthlyGrowth = monthlyGrowth;
        this.avgOrderValue = avgOrderValue;
    }

    // Getters and Setters
    public long getTotalOrders() { return totalOrders; }
    public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }

    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; }

    public long getPendingOrders() { return pendingOrders; }
    public void setPendingOrders(long pendingOrders) { this.pendingOrders = pendingOrders; }

    public long getTotalCustomers() { return totalCustomers; }
    public void setTotalCustomers(long totalCustomers) { this.totalCustomers = totalCustomers; }

    public double getMonthlyGrowth() { return monthlyGrowth; }
    public void setMonthlyGrowth(double monthlyGrowth) { this.monthlyGrowth = monthlyGrowth; }

    public BigDecimal getAvgOrderValue() { return avgOrderValue; }
    public void setAvgOrderValue(BigDecimal avgOrderValue) { this.avgOrderValue = avgOrderValue; }

    @Override
    public String toString() {
        return "DashboardStatsDto{" +
                "totalOrders=" + totalOrders +
                ", totalRevenue=" + totalRevenue +
                ", pendingOrders=" + pendingOrders +
                ", totalCustomers=" + totalCustomers +
                ", monthlyGrowth=" + monthlyGrowth +
                ", avgOrderValue=" + avgOrderValue +
                '}';
    }
}