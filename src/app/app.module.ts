import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// paginas y componentes
import { AppComponent } from './app.component';
import { SignInSignUpComponent } from './components/sign-in-sign-up/sign-in-sign-up.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsCartsComponent } from './page/products-carts/products-carts.component';
import { AppRoutingModule } from './app-routing.module';
//modules
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { AlertComponent } from './components/alert/alert.component';
import { CartsComponent } from './components/carts/carts.component';
// clases y interfaces


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SignInSignUpComponent,
    ProductsComponent,
    ProductsCartsComponent,
    AlertComponent,
    CartsComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule,

  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
