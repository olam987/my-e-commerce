import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../../../shared/model/product";
import {selectStore} from "../../../state/selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../state/state";
import {HomeService} from "../../home/services/home.service";
import {removeAllProductFromCart, removeProductFromCart} from "../../../state/actions";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private readonly store$: Store<AppState>, private homeService: HomeService) {
  }

  getCartProducts(): Observable<Product[]> {
    return this.store$.select(selectStore)
      .pipe(map(state => state.cart.products));
  }

  getAllProducts(): Observable<Product[]> {
    return this.homeService.getAllProducts();
  }

  increaseProductNumber(product: Product) {
    this.homeService.addProductToCart(product);
  }

  decreaseProductNumber(product: Product) {
    this.store$.dispatch(removeProductFromCart({product}));
  }

  removeAllProduct(product: Product) {
    this.store$.dispatch(removeAllProductFromCart({product}));
  }
}
