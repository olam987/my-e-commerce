import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './sites/home/components/home.component';
import {FooterComponent} from './shared/footer/footer.component';
import {NavigationComponent} from './shared/navigation/navigation.component';
import {MenubarModule} from "primeng/menubar";
import {ProductComponent} from './sites/home/components/product/product.component';
import {HttpClientModule} from "@angular/common/http";
import {ButtonModule} from "primeng/button";
import {CartComponent} from './sites/cart/components/cart.component';
import {TableModule} from "primeng/table";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {BadgeModule} from "primeng/badge";
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {appReducer} from "./state/reducer";
import {Effects} from "./state/effects";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ToastModule} from 'primeng/toast';
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavigationComponent,
    ProductComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    RatingModule,
    FormsModule,
    BadgeModule,
    ToastModule,
    StoreModule.forRoot({appStore: appReducer}),
    EffectsModule.forRoot([Effects]),
    ProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
