import {Product} from "../shared/model/product";
import {Category} from "../shared/model/category";

export interface AppState {
  home: Home;
  cart: Cart;
  order: Order;
}

interface Home {
  allProducts: Product[];
  allProductsState: ProductState;
  filterByCategory?: Category;
}

interface Cart {
  products: Product[];
}

interface Order {
  orderProducts: Product[];
  orderState: OrderState;
}

export enum ProductState {
  NOT_LOADED = 'NOT_LOADED',
  LOADED = 'LOADED',
  LOAD_ERROR = 'LOAD_ERROR'
}

export enum OrderState {
  NOT_ORDERED = 'NOT_ORDERED',
  ORDERED = 'ORDERED',
  ORDER_ERROR = 'ORDER_ERROR'
}
