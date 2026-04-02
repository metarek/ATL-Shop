import { supabase } from './supabase';
import { Product, UserProfile, SiteConfig, Order, OrderStatus } from './types';

export const supabaseService = {
  // Products
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    return data || [];
  },

  async saveProduct(product: Product) {
    try {
      const { error } = await supabase
        .from('products')
        .upsert(product);
      
      if (error) {
        console.error('Supabase saveProduct error:', error);
        throw error;
      }
      console.log('Product saved to Supabase successfully');
    } catch (err) {
      console.error('Failed to save product to Supabase:', err);
      throw err;
    }
  },

  async deleteProduct(id: string) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Supabase deleteProduct error:', error);
        throw error;
      }
      console.log('Product deleted from Supabase successfully');
    } catch (err) {
      console.error('Failed to delete product from Supabase:', err);
      throw err;
    }
  },

  // Users
  async getUsers(): Promise<UserProfile[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }
    return data || [];
  },

  async saveUser(user: UserProfile) {
    const { error } = await supabase
      .from('users')
      .upsert(user);
    
    if (error) console.error('Error saving user:', error);
  },

  // Site Config
  async getSiteConfig(): Promise<SiteConfig | null> {
    const { data, error } = await supabase
      .from('site_config')
      .select('*')
      .single();
    
    if (error) {
      console.error('Error fetching site config:', error);
      return null;
    }
    return data;
  },

  async saveSiteConfig(config: SiteConfig) {
    const { error } = await supabase
      .from('site_config')
      .upsert({ id: 1, ...config }); // Assuming single config row
    
    if (error) console.error('Error saving site config:', error);
  },

  // Orders
  async createOrder(order: Order) {
    console.log('Attempting to create order in Supabase:', order);
    const { error } = await supabase
      .from('orders')
      .insert(order);
    
    if (error) {
      console.error('Supabase createOrder error details:', error);
      throw error;
    }
    console.log('Order created in Supabase successfully');
  },

  async getOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('createdAt', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
    return data || [];
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });
    
    if (error) {
      console.error('Error fetching user orders:', error);
      return [];
    }
    return data || [];
  },

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    const { error } = await supabase
      .from('orders')
      .update({ status, updatedAt: new Date().toISOString() })
      .eq('id', orderId);
    
    if (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
};
