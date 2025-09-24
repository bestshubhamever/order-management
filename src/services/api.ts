import { Order, Customer, Product, DashboardStats } from '../types';

class ApiService {
  private baseUrl: string;
  
  constructor() {
    // In production, this would point to your Spring Boot backend
    this.baseUrl = '/api/v1';
  }

  private getHeaders(): Record<string, string> {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // Mock API responses for demo - replace with actual fetch calls
    const mockData = await this.getMockData<T>(endpoint, options);
    return mockData;
  }

  private async getMockData<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const method = options?.method || 'GET';
    
    // Mock data based on endpoint and method
    if (endpoint.includes('/orders')) {
      return this.getMockOrders() as T;
    } else if (endpoint.includes('/customers')) {
      return this.getMockCustomers() as T;
    } else if (endpoint.includes('/products')) {
      return this.getMockProducts() as T;
    } else if (endpoint.includes('/dashboard/stats')) {
      return this.getMockDashboardStats() as T;
    }
    
    return {} as T;
  }

  private getMockOrders(): Order[] {
    return [
      {
        id: '1',
        customerId: '1',
        customer: {
          id: '1',
          name: 'Alice Johnson',
          email: 'alice@example.com',
          phone: '+1234567890',
          address: '123 Main St',
          city: 'New York',
          country: 'USA',
          createdAt: '2024-01-15T10:30:00Z',
        },
        items: [
          {
            id: '1',
            productId: '1',
            product: {
              id: '1',
              name: 'Laptop Pro',
              description: 'High-performance laptop',
              price: 1299.99,
              category: 'Electronics',
              stock: 50,
              sku: 'LPT-001',
              createdAt: '2024-01-10T08:00:00Z',
            },
            quantity: 1,
            unitPrice: 1299.99,
            totalPrice: 1299.99,
          }
        ],
        status: 'processing',
        totalAmount: 1299.99,
        orderDate: '2024-01-20T14:30:00Z',
        notes: 'Priority delivery requested',
      },
      {
        id: '2',
        customerId: '2',
        customer: {
          id: '2',
          name: 'Bob Smith',
          email: 'bob@example.com',
          phone: '+1987654321',
          address: '456 Oak Ave',
          city: 'Los Angeles',
          country: 'USA',
          createdAt: '2024-01-12T09:15:00Z',
        },
        items: [
          {
            id: '2',
            productId: '2',
            product: {
              id: '2',
              name: 'Wireless Headphones',
              description: 'Premium noise-canceling headphones',
              price: 199.99,
              category: 'Electronics',
              stock: 100,
              sku: 'WH-001',
              createdAt: '2024-01-08T12:00:00Z',
            },
            quantity: 2,
            unitPrice: 199.99,
            totalPrice: 399.98,
          }
        ],
        status: 'shipped',
        totalAmount: 399.98,
        orderDate: '2024-01-18T11:45:00Z',
        shippedDate: '2024-01-19T16:20:00Z',
      },
    ];
  }

  private getMockCustomers(): Customer[] {
    return [
      {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '+1234567890',
        address: '123 Main St',
        city: 'New York',
        country: 'USA',
        createdAt: '2024-01-15T10:30:00Z',
      },
      {
        id: '2',
        name: 'Bob Smith',
        email: 'bob@example.com',
        phone: '+1987654321',
        address: '456 Oak Ave',
        city: 'Los Angeles',
        country: 'USA',
        createdAt: '2024-01-12T09:15:00Z',
      },
    ];
  }

  private getMockProducts(): Product[] {
    return [
      {
        id: '1',
        name: 'Laptop Pro',
        description: 'High-performance laptop',
        price: 1299.99,
        category: 'Electronics',
        stock: 50,
        sku: 'LPT-001',
        createdAt: '2024-01-10T08:00:00Z',
      },
      {
        id: '2',
        name: 'Wireless Headphones',
        description: 'Premium noise-canceling headphones',
        price: 199.99,
        category: 'Electronics',
        stock: 100,
        sku: 'WH-001',
        createdAt: '2024-01-08T12:00:00Z',
      },
    ];
  }

  private getMockDashboardStats(): DashboardStats {
    return {
      totalOrders: 1247,
      totalRevenue: 234567.89,
      pendingOrders: 23,
      totalCustomers: 456,
      monthlyGrowth: 12.5,
      avgOrderValue: 187.45,
    };
  }

  // API Methods
  async getOrders(): Promise<Order[]> {
    return this.request<Order[]>('/orders');
  }

  async getOrder(id: string): Promise<Order> {
    return this.request<Order>(`/orders/${id}`);
  }

  async createOrder(order: Partial<Order>): Promise<Order> {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async updateOrder(id: string, order: Partial<Order>): Promise<Order> {
    return this.request<Order>(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(order),
    });
  }

  async deleteOrder(id: string): Promise<void> {
    await this.request<void>(`/orders/${id}`, { method: 'DELETE' });
  }

  async getCustomers(): Promise<Customer[]> {
    return this.request<Customer[]>('/customers');
  }

  async getProducts(): Promise<Product[]> {
    return this.request<Product[]>('/products');
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return this.request<DashboardStats>('/dashboard/stats');
  }
}

export const apiService = new ApiService();