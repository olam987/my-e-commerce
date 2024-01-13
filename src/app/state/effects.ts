import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  addProductToCart, addProductToCartError,
  addProductToCartSuccessfully,
  loadProducts,
  loadProductsError,
  loadProductsSuccessfully
} from "./actions";
import {catchError, delay, map, of, switchMap} from "rxjs";
import {Product} from "../shared/model/product";
import { MessageService } from 'primeng/api';

@Injectable()
export class Effects {

  constructor(private readonly http: HttpClient,
              private readonly actions$: Actions,
              private messageService: MessageService
  ) {}

  loadAllProductsAction$ = createEffect(() => this.actions$.pipe(
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

  addProductToCartAction$ = createEffect(() => this.actions$.pipe(
    ofType(addProductToCart),
    switchMap((action) => {
      return this.http.put<Product>('http://localhost:3000/products/' + action.product.id, action.product)
        .pipe(
          map((response: Product) => {
            this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Dodano do koszyka' });
            return addProductToCartSuccessfully({product: response})
          }),
          catchError((error: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Nie dodano do koszyka' });
            console.error('Add product to cart error: ', error)
            return of(addProductToCartError());
          })
        )
    })
  ));



}
