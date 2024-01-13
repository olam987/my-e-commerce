import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {AppState, ProductState} from "../../state/state";
import {selectStore} from "../../state/selectors";
import {Store} from "@ngrx/store";
import {Category} from "../model/category";
import {filterByCategory, resetFilterByCategory} from "../../state/actions";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private readonly store$: Store<AppState>) { }

  getProductAmountInCart(): Observable<number> {
    return this.store$.select(selectStore)
      .pipe(map(state => state.cart.addedToCart.reduce((total, product) => {
        return total + product.amount
      }, 0)));
  }

  getFilterByCategory(): Observable<Category | undefined> {
    return this.store$.select(selectStore)
      .pipe(map(state => state.home.filterByCategory));
  }

  filterByCategory(category: Category) {
    this.store$.dispatch(filterByCategory({category}))
  }

  resetFilterByCategory() {
    this.store$.dispatch(resetFilterByCategory())
  }
}
