import { create } from 'zustand';
import { supabase } from '../supabaseClient';
import products from '../data/products';

/**
 * Global Zustand store for the NeuroRob app.
 *
 * Holds UI, theme, wishlist, and cart state synchronized with Supabase or LocalStorage.
 */
const useStore = create((set, get) => ({
  // Theme
  theme: 'dark',
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

  // User Session / Auth
  userId: null,
  isLoading: false,

  // Initialize the cart based on session state
  initializeCart: async (session) => {
    set({ isLoading: true });
    const user = session?.user;

    if (user) {
      set({ userId: user.id });
      const { data, error } = await supabase
        .from('cart_items')
        .select('product_id, quantity')
        .eq('user_id', user.id);

      if (!error && data) {
        // Map database cart items using local products data
        const dbCart = data
          .map((item) => {
            const product = products.find((p) => String(p.id) === String(item.product_id));
            if (product) {
              return { ...product, qty: item.quantity };
            }
            return null;
          })
          .filter(Boolean);
        set({ cart: dbCart, isLoading: false });
      } else {
        set({ cart: [], isLoading: false });
      }
    } else {
      // Guest user, load from localStorage
      const localCart = localStorage.getItem('guest_cart');
      set({
        userId: null,
        cart: localCart ? JSON.parse(localCart) : [],
        isLoading: false,
      });
    }
  },

  // Cart
  cart: [],
  addToCart: async (product) => {
    const { userId, cart } = get();
    const existing = cart.find((item) => String(item.id) === String(product.id));
    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        String(item.id) === String(product.id) ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, qty: 1 }];
    }

    if (userId) {
      const finalQty = updatedCart.find(item => String(item.id) === String(product.id)).qty;
      const { error } = await supabase
        .from('cart_items')
        .upsert(
          { user_id: userId, product_id: String(product.id), quantity: finalQty, updated_at: new Date().toISOString() },
          { onConflict: 'user_id,product_id' }
        );
      if (error) console.error('Database cart sync error:', error);
    } else {
      localStorage.setItem('guest_cart', JSON.stringify(updatedCart));
    }

    set({ cart: updatedCart });
  },

  removeFromCart: async (id) => {
    const { userId, cart } = get();
    const updatedCart = cart.filter((item) => String(item.id) !== String(id));

    if (userId) {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', String(id));
      if (error) console.error('Database cart item removal error:', error);
    } else {
      localStorage.setItem('guest_cart', JSON.stringify(updatedCart));
    }

    set({ cart: updatedCart });
  },

  clearCart: async () => {
    const { userId } = get();
    if (userId) {
      await supabase.from('cart_items').delete().eq('user_id', userId);
    } else {
      localStorage.removeItem('guest_cart');
    }
    set({ cart: [] });
  },

  // Decrease quantity action
  decreaseQuantity: async (productId) => {
    const { userId, cart } = get();
    const item = cart.find((item) => String(item.id) === String(productId));
    if (!item) return;

    if (item.qty > 1) {
      const updatedCart = cart.map((cartItem) =>
        String(cartItem.id) === String(productId) ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem
      );

      if (userId) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: item.qty - 1, updated_at: new Date().toISOString() })
          .eq('user_id', userId)
          .eq('product_id', String(productId));
        if (error) console.error('Database cart qty update error:', error);
      } else {
        localStorage.setItem('guest_cart', JSON.stringify(updatedCart));
      }
      set({ cart: updatedCart });
    } else {
      get().removeFromCart(productId);
    }
  },

  // Wishlist
  wishlist: [],
  toggleWishlist: (product) =>
    set((state) => {
      const exists = state.wishlist.some((item) => String(item.id) === String(product.id));
      return {
        wishlist: exists
          ? state.wishlist.filter((item) => String(item.id) !== String(product.id))
          : [...state.wishlist, product],
      };
    }),

  // Selectors
  getCartCount: () => get().cart.reduce((total, item) => total + item.qty, 0),
  getCartTotal: () =>
    get().cart.reduce((total, item) => total + item.price * item.qty, 0),
}));

export default useStore;
