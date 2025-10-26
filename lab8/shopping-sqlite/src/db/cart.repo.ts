import { CartItem } from "../models/types";
import db from "./db";

// 🔹 Lấy danh sách giỏ hàng
export async function getCart(): Promise<CartItem[]> {
  return await db.getAllAsync(`
    SELECT c.id, c.product_id, p.name, p.price, c.qty, p.stock
    FROM cart_items c
    JOIN products p ON c.product_id = p.product_id
  `);
}

// 🔹 Thêm sản phẩm vào giỏ (có kiểm tra tồn kho)
export async function addToCart(productId: string): Promise<boolean> {
  // Lấy thông tin sản phẩm
  const product = await db.getFirstAsync<{ stock: number; name: string }>(
    "SELECT stock, name FROM products WHERE product_id = ?",
    [productId]
  );

  if (!product) {
    console.warn("⚠️ Sản phẩm không tồn tại trong CSDL");
    return false;
  }

  // Kiểm tra nếu hết hàng
  if (product.stock <= 0) {
    console.warn(`⚠️ Sản phẩm "${product.name}" đã hết hàng`);
    return false;
  }

  // Lấy thông tin sản phẩm trong giỏ
  const existing = await db.getFirstAsync<{ qty: number }>(
    "SELECT qty FROM cart_items WHERE product_id = ?",
    [productId]
  );

  // Nếu đã có trong giỏ, kiểm tra tồn kho
  if (existing) {
    if (existing.qty >= product.stock) {
      console.warn(`⚠️ Vượt quá số lượng tồn kho (${product.stock})`);
      return false;
    }

    await db.runAsync(
      "UPDATE cart_items SET qty = qty + 1 WHERE product_id = ?",
      [productId]
    );
  } else {
    await db.runAsync(
      "INSERT INTO cart_items(product_id, qty) VALUES (?, 1)",
      [productId]
    );
  }

  return true;
}

// 🔹 Cập nhật số lượng sản phẩm trong giỏ (có kiểm tra tồn kho)
export async function updateQty(id: number, qty: number): Promise<boolean> {
  // Lấy thông tin sản phẩm từ giỏ và kho
  const cartItem = await db.getFirstAsync<{ product_id: string; stock: number }>(
    `
    SELECT c.product_id, p.stock
    FROM cart_items c
    JOIN products p ON c.product_id = p.product_id
    WHERE c.id = ?
    `,
    [id]
  );

  if (!cartItem) {
    console.warn("⚠️ Không tìm thấy sản phẩm trong giỏ hàng");
    return false;
  }

  // Nếu số lượng vượt quá tồn kho
  if (qty > cartItem.stock) {
    console.warn(`⚠️ Vượt quá số lượng tồn kho (${cartItem.stock})`);
    return false;
  }

  // Nếu số lượng <= 0 thì xóa khỏi giỏ
  if (qty <= 0) {
    await db.runAsync("DELETE FROM cart_items WHERE id = ?", [id]);
  } else {
    await db.runAsync("UPDATE cart_items SET qty = ? WHERE id = ?", [qty, id]);
  }

  return true;
}
