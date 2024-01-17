import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeService} from "../services/home.service";
import {Product} from "../../../shared/model/product";
import {Subscription} from "rxjs";
import {ProductState} from "../../../state/state";
import {Category} from "../../../shared/model/category";
import {SharedService} from "../../../shared/services/shared.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  products!: Product[];
  subscription = new Subscription();
  productState!: ProductState;
  ProductState = ProductState;

  constructor(private readonly homeService: HomeService, private readonly sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.homeService.loadAllProducts();
    this.subscription.add(this.homeService.getAllProducts()
      .subscribe(values => {
        this.products = values;
      }));
    this.subscription.add(this.homeService.getAllProductsSate()
      .subscribe(value => {
        this.productState = value;
      }));
    this.subscription.add(this.sharedService.getFilterByCategory()
      .subscribe(value => {
        this.products = this.products.filter(product => {
          if (!!value) {
            return product.category === value
          }
          return product;
        });
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
