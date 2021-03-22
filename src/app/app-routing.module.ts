import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsCartsComponent } from './page/products-carts/products-carts.component';
// AppComponent



const routes: Routes = [
  { path: 'product-carts', component: ProductsCartsComponent },
  // par
  { path: '**', pathMatch: 'full', redirectTo: 'app' }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
