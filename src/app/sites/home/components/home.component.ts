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

    const array = [
      {
        id: '1',
        name: 'Ola',
        age: 28
      },
      {
        id: '2',
        name: 'Asia',
        age: 31
      },
      {
        id: '3',
        name: 'Arek',
        age: 31
      },
      {
        id: '4',
        name: 'Kuba',
        age: 50
      },
      {
        id: '5',
        name: 'Arek',
        age: 51
      },
      {
        id: '6',
        name: 'Ola',
        age: 59
      },
    ];

    const list = [
      {
        id: 1,
        name: "Żelazko",
        category: "AGD",
        price: 5.50,
        amount: 3
      },
      {
        id: 2,
        name: "Odkurzacz",
        category: "AGD",
        price: 155,
        amount: 5
      },
      {
        id: 3,
        name: "Krzesło",
        category: "Meble",
        price: 38,
        amount: 6
      },
      {
        id: 4,
        name: "Biurko",
        category: "Meble",
        price: 300,
        amount: 7
      },
      {
        id: 5,
        name: "Banan",
        category: "Owoce",
        price: 3,
        amount: 10
      }
    ]
    const arr = list.map(item=>{

     return list.find(item=>item.id===3)
    })
    console.log(arr)
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
