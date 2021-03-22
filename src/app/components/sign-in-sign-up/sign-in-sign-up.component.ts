import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
// para manejos de formularios reactivos
import { FormControl, FormGroup, Validators } from '@angular/forms';
// custom
import { Usuarios } from './../../models/usuarios';
import { ConexionService } from './../../services/conexion.service';
import { Messages } from './../../models/messages';


@Component({
  selector: 'app-sign-in-sign-up',
  templateUrl: './sign-in-sign-up.component.html',
  styleUrls: ['./sign-in-sign-up.component.scss']
})

export class SignInSignUpComponent implements OnInit {
  // @ViewChild('ingresar', { static: false }) ingresar: ElementRef;
  // @ViewChild('crearCuenta', { static: false }) crearCuenta: ElementRef;
  @Input() activateM: boolean;
  @Output() desactiveM = new EventEmitter;
  formulario: FormGroup;
  parrent = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';

  constructor(public cs: ConexionService, public render: Renderer2) {
    this.controlFormulario();
  }
  ngOnChanges() {
    // console.log(this.activateM)
  }
  ngOnInit(): void {
  }

  controlFormulario() {
    this.formulario = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    });
  }

  postForm(event: any) {
    let date = new Date();
    const newUser: Usuarios = {
      id: `${date.getFullYear()}${date.getDate()}${date.getHours()}${date.getSeconds()}${date.getMilliseconds()}`,
      email: this.formulario.value.email,
      password: this.formulario.value.password
    }
    // console.log(event)
    // console.log(this.formulario)
    if (event.submitter.id === "1") {
      this.cs.login(newUser);
      setTimeout(() => {
        this.close()
      }, 2000);
    } else if (event.submitter.id === "2") {
      this.cs.crearUsuario(newUser);
    }
    this.formulario.reset();
  }


  close() {
    this.formulario.reset()
    this.activateM = !this.activateM;
    let des: boolean = this.activateM;
    this.desactiveM.emit(des);
  }

}
