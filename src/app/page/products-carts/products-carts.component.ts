import { Observable } from 'rxjs';
import { Usuarios } from './../../models/usuarios';

import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
//  custom
import { Carts } from './../../models/carts';
import { ConexionService } from './../../services/conexion.service';
import { ToShareService } from 'src/app/services/to-share.service';
import { ProductCarts } from './../../models/product-carts';
import { Products } from 'src/app/models/products';




@Component({
  selector: 'app-products-carts',
  templateUrl: './products-carts.component.html',
  styleUrls: ['./products-carts.component.scss']
})
export class ProductsCartsComponent implements OnInit {
  products: Products[];
  product_cart: ProductCarts;
  cart: Carts;
  alertActivated: boolean = false;
  @Input() cartActivate: boolean;
  @Output() desctivete = new EventEmitter;
  @ViewChild('alert ') alert: ElementRef;
  message: string;
  constructor(public ToS: ToShareService, private Cs: ConexionService, public reder: Renderer2) {
    this.products = this.ToS.Products;
  }
  ngOnChanges() {
    //entra en false antes de dar click en carro de compras
    // console.log('cart list activa', this.cartActivate);
    // cambia true despues del click
  }
  ngOnInit(): void {
  }

  outModal() {
    this.cartActivate = !this.cartActivate;
    let closeModal: boolean = this.cartActivate;
    // console.log('input despues de cerrar modal', closeModal)
    this.desctivete.emit(closeModal)
  }
  addProductCarts(listShopping: Products[]) {
    // console.log(listShopping);
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
  }



  setOrden(state: boolean, type: string) {

    this.Cs.getIDUser().subscribe(resul => {
      resul.forEach(e => {
        this.logicOrder(state , type, e.id)
      });
    });
  }

  logicOrder(state: boolean, type: string, idUser:string) {
    if (this.products.length === 0) {
      this.alertActivated = true;
      this.message = 'No tiene ningún producto agregado';
      this.reder.setStyle(this.alert.nativeElement, 'background', '#DC3545');
    } else {
      this.alertActivated = true;
      let id: string = this.createID()
      this.cart = {
        id: id,
        status: state,
        id_user: idUser
      }
      this.product_cart = {
        cart_id: id,
        products: this.products,
        quantity: this.products.length
      }
      this.Cs.createOrder(this.product_cart);
      this.Cs.createCart(this.cart);
      setTimeout(() => {
        this.clearList()
        this.outModal()
      }, 2000);
      this.message = `su order fue${type}`;
      this.reder.setStyle(this.alert.nativeElement, 'background', '#28A745');
    }
    setTimeout(() => {
      this.alertActivated = !this.alertActivated;
    }, 1000);
  }


  clearList() {
    this.products = [];
    this.ToS.Products = [];
    this.products = this.ToS.Products;
  }


  createID(): string {
    let date = new Date();
    let id = `${date.getFullYear()}${date.getDate()}${date.getHours()}${date.getSeconds()}${date.getMilliseconds()}`;
    return id;
  }


}
