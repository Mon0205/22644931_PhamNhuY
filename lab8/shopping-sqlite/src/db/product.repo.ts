import db from "../db/db";
import { Product } from "../models/types";

export async function getAllProducts(): Promise<Product[]> {
  return await db.getAllAsync("SELECT * FROM products");
}
export async function findProductsByName(name: string): Promise<Product[]> {
  const query = `
    SELECT * FROM products
    WHERE LOWER(name) LIKE LOWER(?)
  `;
  const params = [`%${name}%`];
  return await db.getAllAsync(query, params);
}
