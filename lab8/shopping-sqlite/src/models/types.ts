export type Product = {
    product_id: string;
    name: string;
    price: number;
    stock: number;
  };
  
  export type CartItem = {
    id: number;
    product_id: string;
    name: string;
    price: number;
    qty: number;
    stock: number;
  };
  