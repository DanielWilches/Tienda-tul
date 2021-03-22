import { Products } from './models/products';
import { Component } from '@angular/core';
import { ConexionService } from './services/conexion.service';
import { compileNgModuleFromRender2 } from '@angular/compiler/src/render3/r3_module_compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tul';
  Activate: boolean = false;
  activateMenu: boolean = false;
  activateR: boolean = false;
  activateC: boolean = false;

  constructor(public cS: ConexionService) {
  }

  activateCart() {
    this.Activate = !this.Activate;
  }
  activateCartList() {
    console.log('entro')
    this.activateC = true;
    // this.cS.getCarts().subscribe(console.log  )
  }

  desactiveCart($event) {
    this.activateC = $event;
    console.log('salio')
  }
  deactivateCart($event: boolean) {
    this.Activate = $event;
  }
  desactivedM($event: boolean) {
    this.activateR = $event;
  }

  activateRegister() {
    this.activateR = !this.activateR;
    this.activateMenu = !this.activateMenu;
  }
  menu() {
    this.activateMenu = !this.activateMenu;
  }
}
