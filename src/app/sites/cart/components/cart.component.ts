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

  products: Product[] = [];
  subscription!: Subscription;

  constructor(private readonly cartService: CartService) {
  }

  ngOnInit(): void {
    this.subscription = this.cartService.getCartProducts()
      .subscribe(values => {
        this.products = values;
      });
  }

  getAmountName(): string {
    const amount = this.getAmount();
    if (amount === 1) {
      return "produkt";
    }
    const lastDigit = amount % 10;
    if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
      return "produkty";
    }
    return "produktów";
  }

  getAmount() {
    return this.products.reduce((total, product) => {
      return total + product.amount
    }, 0);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
