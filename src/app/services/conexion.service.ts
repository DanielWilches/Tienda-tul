import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// custom
import { Usuarios } from 'src/app/models/usuarios';
import { Carts } from './../models/carts';
import { ProductCarts } from './../models/product-carts';
import { Products } from './../models/products';
import { Messages } from './../models/messages';
// import { ChildActivationEnd } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private usuarioCollection: AngularFirestoreCollection<Usuarios>;
  private cartsColletion: AngularFirestoreCollection<Carts>;
  private product_cartsCollection: AngularFirestoreCollection<ProductCarts>;
  private products: AngularFirestoreCollection<any>;
  productos: Products[] = [];
  message: Messages = {
    message: '',
    bgColor: ''
  };
  actMessages: boolean;
  infoSessionUser: userInfo[] = [
    {
      operationType: localStorage.getItem('operationType'),
      email: localStorage.getItem('EmailUsuario'),
      startSession: localStorage.getItem('startSession')
    }
  ];
  $actUSU: boolean = true;
  cartsItmes: Carts[] = [];
  constructor(private Afs: AngularFirestore, public auth: AngularFireAuth) {
    this.usuarioCollection = Afs.collection<Usuarios>('usuarios');
    this.products = Afs.collection<Products[]>('products');
    this.product_cartsCollection = Afs.collection<ProductCarts>('product_cart');
    this.cartsColletion = Afs.collection<Carts>('carts');
    this.getProducts();
    setTimeout(() => {
      this.getCarts();
    }, 3000);
  }


  crearUsuario(usuario: Usuarios): any {
    this.auth.createUserWithEmailAndPassword(usuario.email, usuario.password).then(resul => {
      this.newColletionUser(usuario)
      this.inMessage();
      return this.message = {
        message: 'se creo un nuevo usuario, por favor inicie sesion con su usuario ',
        bgColor: '#28A745'
      }

    }).catch(err => {
      this.inMessage();
      return this.message = {
        message: err.message,
        bgColor: '#DC3545'
      }
    })
  }

  newColletionUser(Usuario: Usuarios) {
    this.usuarioCollection.add(Usuario).then(resul => {
      console.log(resul)
    }).catch(err => console.log)
  }

  login(user: Usuarios): any {
    this.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(resul => {
        // console.log(resul)
        this.message = {
          message: `El estado de la cuenta es ${resul.operationType}`,
          bgColor: '#28A745'
        }
        this.inMessage();
        this.addLocalStorage(resul);
        return this.message;
      })
      .catch(err => {
        this.message = {
          message: err.message,
          bgColor: '#DC3545'
        }
        this.inMessage();
        return this.message;
      })
  }


  logout() {
    this.auth.signOut().then(resul => {
      this.message = {
        message: `se cerro session`,
        bgColor: '#28A745'
      }
      localStorage.clear();
      this.infoSessionUser = [
        {
          operationType: localStorage.getItem('operationType'),
          email: localStorage.getItem('EmailUsuario'),
          startSession: localStorage.getItem('startSession')
        }
      ];
      this.$actUSU = true;
      this.inMessage();
    }).catch(err => {
      this.message = {
        message: err.message,
        bgColor: '#DC3545'
      }
      this.inMessage();
    });
  }

  getProducts(): any {
    this.products.get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.productos.push(doc.data());
        // console.log(this.productos)
        return this.productos;
      })
    }).catch(err => console.log);
  }

  createOrder(order: ProductCarts) {
    this.product_cartsCollection.add(order).then(resul => {
      this.message = {
        message: `Se creo tu orden exitosamente`,
        bgColor: '#28A745'
      }
      this.inMessage();
    }).catch(err => {
      this.message = {
        message: err.message,
        bgColor: '#DC3545'
      }
      this.inMessage();
    })
  }

  createCart(Carts: Carts) {
    this.cartsColletion.add(Carts).then(resul => {
      this.message = {
        message: `Se creo su carro exitosamente `,
        bgColor: '#28A745'
      }
      this.inMessage();
    }).catch(err => {

      this.message = {
        message: err.message,
        bgColor: '#DC3545'
      }
      this.inMessage();
    })
  }

  inMessage() {
    this.actMessages = true;
    setTimeout(() => {
      this.actMessages = !this.actMessages;
    }, 2000);
  }

  addLocalStorage(resul: any) {
    localStorage.setItem('operationType', resul.operationType);
    localStorage.setItem('EmailUsuario', resul.user.email);
    localStorage.setItem('startSession', 'true')
    this.$actUSU = false;
    this.infoSessionUser.push(
      {
        operationType: localStorage.getItem('operationType'),
        email: localStorage.getItem('EmailUsuario'),
        startSession: localStorage.getItem('startSession')
      }
    )
    // console.log(this.infoSessionUser)
  }

  getIDUser(): Observable<Usuarios[]> {
    let email = localStorage.getItem('EmailUsuario');
    return this.Afs.collection<Usuarios>('usuarios', ref => ref.where('email', "==", email)).valueChanges();
  }
  getCarts() {
    this.getIDUser().subscribe(resul => {
      resul.forEach((e, i) => {
        this.Afs.collection<Carts>('carts', ref => ref.where('id_user', '==', e.id)).valueChanges().subscribe(resul => {
          this.cartsItmes = [...resul];
          console.log(this.cartsItmes)

        })
      })
    })
  }

  updateCart() {
    // this.carts
  }




}
interface userInfo {
  operationType: string;
  email: string;
  startSession: string;
}
