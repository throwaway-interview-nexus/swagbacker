import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { BasketComponent } from './basket/basket.component';
import { MerchandiseComponent } from './merchandise/merchandise.component';
import { ProductComponent } from './product/product.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { BasketGuard } from './guards/basket.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'about', pathMatch: 'full', component: AboutComponent},
  {path: 'contact', pathMatch: 'full', component: ContactComponent},
  {path: 'login', pathMatch: 'full', component: LoginComponent},
  {path: 'basket', pathMatch: 'full', component: BasketComponent, canActivate: [BasketGuard]},
  {path: 'merchandise', pathMatch: 'full', component: MerchandiseComponent},
  {path: 'merchandise/:bytype/:type', component: MerchandiseComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
