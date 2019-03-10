import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsService } from './services/products/products.service';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { MerchandiseComponent } from './merchandise/merchandise.component';
import { LoginComponent } from './login/login.component';
import { BasketComponent } from './basket/basket.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { GoalStatusComponent } from './goal-status/goal-status.component';
import { StoreModule } from '@ngrx/store';
import { basketReducer } from './reducers/basket.reducer';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    MerchandiseComponent,
    LoginComponent,
    BasketComponent,
    ProductComponent,
    ProductListComponent,
    GoalStatusComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({basket: basketReducer}),
  ],
  providers: [
    ProductsService,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
