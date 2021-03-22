import { ConexionService } from './../../services/conexion.service';
import { Carts } from './../../models/carts';
import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {
  @Input() ActivarAni: boolean;
  @Output() desctivar = new EventEmitter;
  // @Input() carst: Carts[];
  // @ViewChild('alert', { static: false }) alert: ElementRef;
  alert: boolean = false;
  close: boolean = false;
  constructor( public Cs: ConexionService, public reder:Renderer2 ) { }

  ngOnInit(): void {
  }

  generarrOrden() {
    this.alert = !this.alert;
    setTimeout(() => {
      this.alert = false;
    }, 2000);

  }
  closeModal() {
    this.ActivarAni = false;
    // setTimeout(() => {

    this.desctivar.emit(false);
    //   this.close= false
    // }, 2000);
  }

}
