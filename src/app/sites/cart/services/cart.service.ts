import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../../../shared/model/product";
import {selectStore} from "../../../state/selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../state/state";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private readonly store$: Store<AppState>) {
  }

   getCartProducts(): Observable<Product[]> {
    return this.store$.select(selectStore)
      .pipe(map(state => state.cart.addedToCart));
  }
}
