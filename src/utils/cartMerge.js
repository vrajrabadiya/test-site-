/**
 * Merges guest local cart items into the user's database cart record on Supabase.
 * Combines quantities if items exist in both local storage and database.
 * 
 * @param {SupabaseClient} supabase - Configured Supabase JS client
 * @param {string} userId - UUID of the authenticated user
 * @param {Array} localCart - List of cart items from guest localStorage
 */
export async function mergeGuestCartWithUserCart(supabase, userId, localCart) {
  if (!localCart || localCart.length === 0) return;

  try {
    // 1. Fetch user's existing DB cart items to calculate combined quantities
    const { data: dbCart, error: fetchError } = await supabase
      .from('cart_items')
      .select('product_id, quantity')
      .eq('user_id', userId);

    if (fetchError) {
      console.error('Error fetching existing cart items for merging:', fetchError);
      return;
    }

    // Map database cart items for fast key lookups
    const dbCartMap = new Map(dbCart.map((item) => [item.product_id, item.quantity]));
    const upsertRows = [];

    // 2. Iterate local guest items, adding quantities together if overlaps exist
    for (const guestItem of localCart) {
      const dbQty = dbCartMap.get(guestItem.product_id) || 0;
      const combinedQty = dbQty + guestItem.qty;

      upsertRows.push({
        user_id: userId,
        product_id: guestItem.product_id,
        quantity: combinedQty,
        updated_at: new Date().toISOString(),
      });
    }

    // 3. Perform bulk upsert using unique constraints on (user_id, product_id)
    if (upsertRows.length > 0) {
      const { error: upsertError } = await supabase
        .from('cart_items')
        .upsert(upsertRows, { onConflict: 'user_id,product_id' });

      if (upsertError) {
        console.error('Failed to upsert merged cart items:', upsertError);
      } else {
        // Clear localStorage only after successful DB upsert is confirmed
        localStorage.removeItem('guest_cart');
      }
    }
  } catch (err) {
    console.error('Unexpected error during cart merge:', err);
  }
}
