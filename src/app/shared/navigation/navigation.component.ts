import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {SharedService} from "../services/shared.service";
import {Subscription} from "rxjs";
import {Category} from "../model/category";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  items?: MenuItem[];
  productAmountInCart!: number;
  subscription!: Subscription;

  constructor(private readonly sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: 'home',
        command: () => this.resetFilterByCategory()
      },
      {
        label: 'Categories',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Elektronika',
            icon: 'pi pi-fw pi-camera',
            command: () => this.filterByCategory(Category.ELECTRONICS)
          },
          {
            label: 'AGD',
            icon: 'pi pi-fw pi-home',
            command: () => this.filterByCategory(Category.AGD)
          },
          {
            label: 'Odzież',
            icon: 'pi pi-fw pi-shopping-bag',
            command: () => this.filterByCategory(Category.CLOTHES)
          },
          {
            label: 'Buty',
            icon: 'pi pi-fw pi-external-link',
            command: () => this.filterByCategory(Category.SHOES)
          }
        ]
      },
    ];
    this.subscription = this.sharedService.getProductAmountInCart()
      .subscribe(amount => {
        this.productAmountInCart = amount;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private filterByCategory(category: Category) {
    this.sharedService.filterByCategory(category)
  }

  private resetFilterByCategory() {
    this.sharedService.resetFilterByCategory();
  }
}
