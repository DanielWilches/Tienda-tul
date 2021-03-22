import { Injectable } from '@angular/core';
// custom
import { Products } from './../models/products';
import { Carts } from './../models/carts';
import { ProductCarts } from './../models/product-carts';

@Injectable({
  providedIn: 'root'
})
export class ToShareService {
  Products: Products[] = [];
  constructor() { }

  // crear arrglo de carro de compras
  getShopping(product: Products) {
    this.Products.push(product);
    // console.log(this.Products)
    return true;
  }

}
