import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";
import {Product} from "../../../shared/model/product";
import {Subscription} from "rxjs";

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartProducts: Product[] = [];
  subscription = new Subscription();
  homeProducts: Product[] = [];

  constructor(private readonly cartService: CartService) {
  }

  ngOnInit(): void {
    this.subscription.add(this.cartService.getCartProducts()
      .subscribe(values => {
         this.cartProducts = values;
      }));
    this.subscription.add(this.cartService.getAllProducts()
      .subscribe(homeProducts => {
        this.homeProducts = homeProducts;
      })
    )
  }

  getAmountName(): string {
    const amount = this.getAmount();
    if (amount === 1) {
      return "jest " + amount + " produkt";
    }
    const lastDigit = amount % 10;
    if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
      return "są " + amount + " produkty";
    }
    return "jest " + amount + " produktów";
  }

  getAmount() {
    return this.cartProducts.reduce((total, product) => {
      return total + product.amount
    }, 0);
  }

  increaseProductNumber(product: Product) {
    this.cartService.increaseProductNumber(product);
  }

  decreaseProductNumber(product: Product) {
    this.cartService.decreaseProductNumber(product);
  }

  disablePlusButton(productId: number): boolean {
    return !this.homeProducts.find(product => product.id === productId && product.amount > 0);
  }

  disableMinusButton(productId: number): boolean {
    return !this.cartProducts.find(product => product.id === productId && product.amount > 0);
  }

  removeAllProduct(product: Product) {
    this.cartService.removeAllProduct(product);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
