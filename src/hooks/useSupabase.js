import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        console.log("Supabase: Fetching all categories...");
        const { data, error } = await supabase.from("categories").select("*");
        if (error) throw error;
        
        const sanitized = (data || []).map(cat => ({
          ...cat,
          slug: cat.slug ? cat.slug.trim() : ""
        }));
        
        console.log(`Supabase: Successfully fetched ${sanitized.length} categories`, sanitized);
        setCategories(sanitized);
      } catch (err) {
        console.error("Supabase error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return { categories, loading };
}

export function useProducts(query = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        console.log("Supabase: Fetching products with query params:", query);
        let req = supabase.from("products").select("*");

        if (query.bestseller) {
          req = req.eq("bestseller", true);
        }
        if (query.featured) {
          req = req.eq("featured", true);
        }
        if (query.category_slug) {
          req = req.eq("category_slug", query.category_slug.trim());
        }
        if (query.limit) {
          req = req.limit(query.limit);
        }

        // Always order by newest first unless specified otherwise
        req = req.order("created_at", { ascending: false });

        const { data, error } = await req;
        if (error) throw error;

        let fetchedProducts = (data || []).map(prod => ({
          ...prod,
          slug: prod.slug ? prod.slug.trim() : "",
          category_slug: prod.category_slug ? prod.category_slug.trim() : ""
        }));

        console.log(`Supabase: Fetched ${fetchedProducts.length} products`);

        // Fallback logic: If bestseller/featured requested but database yields 0 items,
        // fetch all products instead so the UI isn't empty.
        if (fetchedProducts.length === 0 && (query.bestseller || query.featured)) {
          console.warn(`Supabase: No products match bestseller=${!!query.bestseller} featured=${!!query.featured}. Falling back to general products.`);
          let fallbackReq = supabase.from("products").select("*");
          if (query.limit) {
            fallbackReq = fallbackReq.limit(query.limit);
          }
          fallbackReq = fallbackReq.order("created_at", { ascending: false });
          const { data: fallbackData, error: fallbackError } = await fallbackReq;
          if (fallbackError) throw fallbackError;

          fetchedProducts = (fallbackData || []).map(prod => ({
            ...prod,
            slug: prod.slug ? prod.slug.trim() : "",
            category_slug: prod.category_slug ? prod.category_slug.trim() : ""
          }));
          console.log(`Supabase (Fallback): Fetched ${fetchedProducts.length} general products.`);
        }

        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Supabase error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [query.bestseller, query.featured, query.category_slug, query.limit]);

  return { products, loading };
}

export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchProduct() {
      setLoading(true);
      try {
        const trimmedSlug = slug.trim();
        console.log(`Supabase: Fetching single product by slug: "${trimmedSlug}"`);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("slug", trimmedSlug)
          .single();
          
        if (error) throw error;

        const sanitized = data ? {
          ...data,
          slug: data.slug ? data.slug.trim() : "",
          category_slug: data.category_slug ? data.category_slug.trim() : ""
        } : null;

        console.log("Supabase: Fetched single product:", sanitized);
        setProduct(sanitized);
      } catch (err) {
        console.error(`Supabase error fetching product "${slug}":`, err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProduct();
  }, [slug]);

  return { product, loading };
}

export async function submitOrder(orderData) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          customer_name: orderData.name,
          phone: orderData.phone,
          email: orderData.email,
          address: orderData.address,
          product_id: orderData.product_id,
          quantity: orderData.quantity,
          status: "pending"
        }
      ])
      .select();
      
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error("Error submitting order:", err);
    return { success: false, error: err };
  }
}

export async function updateOrderStatus(orderId, status) {
  try {
    console.log(`Supabase: Updating order ${orderId} status to "${status}"...`);
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId)
      .select();

    if (error) throw error;
    console.log(`Supabase: Successfully updated order ${orderId} status to "${status}"`);
    return { success: true, data };
  } catch (err) {
    console.error(`Supabase error updating order ${orderId} status:`, err);
    return { success: false, error: err };
  }
}
