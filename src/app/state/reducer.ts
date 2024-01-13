import {AppState, OrderState, ProductState} from "./state";
import {Action, createReducer, on} from "@ngrx/store";
import {
  addProductToCartSuccessfully,
  filterByCategory,
  loadProductsError,
  loadProductsSuccessfully,
  resetFilterByCategory
} from "./actions";
import {cloneDeep} from 'lodash-es';

const initState: AppState = {
  home: {
    allProducts: [],
    allProductsState: ProductState.NOT_LOADED
  },
  cart: {
    addedToCart: []
  },
  order: {
    orderProducts: [],
    orderState: OrderState.NOT_ORDERED
  }
};

export const appReducer = createReducer(initState,
  on(loadProductsSuccessfully, (state: AppState, {products}) => {
    const newState: AppState = cloneDeep(state);
    newState.home.allProducts = products;
    newState.home.allProductsState = ProductState.LOADED;
    return newState;
  }),
  on(loadProductsError, (state: AppState) => {
    const newState: AppState = cloneDeep(state);
    newState.home.allProductsState = ProductState.LOAD_ERROR;
    return newState;
  }),
  on(addProductToCartSuccessfully, (state: AppState, {product}) => {
    const newState: AppState = cloneDeep(state);
    const productToCart = cloneDeep(product);
    productToCart.amount = 1;
    const cartProductIndex = newState.cart.addedToCart.findIndex(object => object.id === product.id);
    if (cartProductIndex === -1) {
      newState.cart.addedToCart.push(productToCart);
    } else {
      newState.cart.addedToCart[cartProductIndex].amount++;
    }
    const homeProductIndex = newState.home.allProducts.findIndex(object => object.id === product.id);
    if (homeProductIndex !== -1) {
      newState.home.allProducts[homeProductIndex].amount--;
    }
    return newState;
  }),
  on(filterByCategory, (state: AppState, {category}) => {
    const newState: AppState = cloneDeep(state);
    newState.home.filterByCategory = category;
    return newState;
  }),
  on(resetFilterByCategory, (state: AppState) => {
    const newState: AppState = cloneDeep(state);
    newState.home.filterByCategory = undefined;
    return newState;
  })
);
