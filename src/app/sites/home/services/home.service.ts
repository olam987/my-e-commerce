import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {Product} from "../../../shared/model/product";
import {Store} from "@ngrx/store";
import {AppState, ProductState} from "../../../state/state";
import {addProductToCart, loadProducts} from "../../../state/actions";
import {selectStore} from "../../../state/selectors";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private readonly store$: Store<AppState>) { }

  loadAllProducts() {
    this.store$.dispatch(loadProducts());
  }

  addProductToCart(product: Product) {
    this.store$.dispatch(addProductToCart({product}));
  }

  getAllProducts(): Observable<Product[]> {
    return this.store$.select(selectStore)
      .pipe(map(state => state.home.allProducts));
  }

  getAllProductsSate(): Observable<ProductState> {
    return this.store$.select(selectStore)
      .pipe(map(state => state.home.allProductsState));
  }
}
