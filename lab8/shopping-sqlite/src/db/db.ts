import { Directory } from "expo-file-system";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabaseSync("shopping.db");

// Khởi tạo CSDL
export async function initDB() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products(
      product_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL CHECK(price >= 0),
      stock INTEGER NOT NULL CHECK(stock >= 0)
    );

    CREATE TABLE IF NOT EXISTS cart_items(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL,
      qty INTEGER NOT NULL CHECK(qty > 0),
      UNIQUE(product_id),
      FOREIGN KEY(product_id) REFERENCES products(product_id)
    );
  `);
}

// Thêm dữ liệu mẫu nếu chưa có
export async function seedProducts() {
  const result = await db.getAllAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM products`
  );

  if (result[0]?.count === 0) {
    const sample = [
      { id: "p1", name: "Áo thun", price: 120000, stock: 10 },
      { id: "p2", name: "Quần jeans", price: 300000, stock: 5 },
      { id: "p3", name: "Giày sneaker", price: 800000, stock: 3 },
    ];

    for (const p of sample) {
      await db.runAsync(
        `INSERT INTO products (product_id, name, price, stock) VALUES (?, ?, ?, ?)`,
        [p.id, p.name, p.price, p.stock]
      );
    }

    console.log("Đã thêm 10 sản phẩm mẫu vào CSDL!");
  }
}

export default db;
