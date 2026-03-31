import { supabase } from './supabase';
import { Product, UserProfile, SiteConfig } from './types';

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
  }
};
