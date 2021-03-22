import { Products } from 'src/app/models/products';
import { Carts } from './carts';


export interface ProductCarts {
  cart_id: string;
  quantity: number;
  products: Products[];
}

