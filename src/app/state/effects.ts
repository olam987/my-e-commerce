import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  addProductToCart,
  loadProducts,
  loadProductsError,
  loadProductsSuccessfully, removeAllProductFromCart,
  removeProductFromCart
} from "./actions";
import {catchError, delay, map, of, switchMap, tap} from "rxjs";
import {Product} from "../shared/model/product";
import {MessageService} from 'primeng/api';

@Injectable()
export class Effects {

  constructor(private readonly http: HttpClient,
              private readonly actions$: Actions,
              private messageService: MessageService
  ) {}

  loadAllProductsEffect$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    delay(2000),
    switchMap(() => {
      return this.http.get<Product[]>('http://localhost:3000/products')
        .pipe(
          map((response: Product[]) => {
            return loadProductsSuccessfully({products: response})
          }),
          catchError((error: HttpErrorResponse) => {
            console.error('Load products error: ', error)
            return of(loadProductsError());
          })
        )
    })
  ));

  addProductToCartEffect$ = createEffect(() => this.actions$.pipe(
    ofType(addProductToCart),
    tap(() => {
      this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Dodano produkt do koszyka' });
    })
  ), {dispatch: false});

  removeProductFromCartEffect$ = createEffect(() => this.actions$.pipe(
    ofType(removeProductFromCart, removeAllProductFromCart),
    tap(() => {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Usunięto produkt z koszyka' });
    })
  ), {dispatch: false});
}
