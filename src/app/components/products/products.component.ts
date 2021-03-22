import { Messages } from './../../models/messages';

import { Component, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
// custom
import { Products } from './../../models/products';
import { ConexionService } from './../../services/conexion.service';
import { ToShareService } from 'src/app/services/to-share.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('item') item: ElementRef;
  @Output() setProducto = new EventEmitter<Products>();
  addProducto: boolean = true;
  actAlert: boolean = false;
  mesagge: Messages = {
    message: 'prueba',
    bgColor: '#21A275'
  };
  constructor(public cs: ConexionService, private toS: ToShareService, public reder: Renderer2) {
  }

  ngOnInit(): void {
  }


  closeDescription(value: any) {
    // console.log(value);
    // console.log('entro')
    // console.log(this.item)
    // this.reder.t
  }

  addShopping(index: number) {
    this.actAlert = !this.actAlert;
    setTimeout(() => {
      this.actAlert = false;
    }, 1000);
    let producto: Products;
    producto = this.cs.productos[index];
    this.addProducto = this.toS.getShopping(producto);
    // console.log(this.addProducto);
  }



}
