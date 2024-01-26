import {AppState, OrderState, ProductState} from "./state";
import {createReducer, on} from "@ngrx/store";
import {
  addProductToCart,
  filterByCategory,
  loadProductsError,
  loadProductsSuccessfully,
  removeAllProductFromCart,
  removeProductFromCart,
  resetFilterByCategory
} from "./actions";
import {cloneDeep} from 'lodash-es';

const initState: AppState = {
  home: {
    allProducts: [],
    allProductsState: ProductState.NOT_LOADED
  },
  cart: {
    products: [],
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
  on(addProductToCart, (state: AppState, {product}) => {
    const newState: AppState = cloneDeep(state);
    const cartProductIndex = newState.cart.products.findIndex(object => object.id === product.id);
    if (cartProductIndex === -1) {
      const productToCart = cloneDeep(product);
      productToCart.amount = 1;
      newState.cart.products.push(productToCart);
    } else {
      newState.cart.products[cartProductIndex].amount++;
    }
    const homeProductIndex = newState.home.allProducts.findIndex(object => object.id === product.id);
    if (homeProductIndex !== -1) {
      newState.home.allProducts[homeProductIndex].amount--;
    }
    return newState;
  }),
  on(removeProductFromCart, (state: AppState, {product}) => {
    const newState: AppState = cloneDeep(state);
    const cartProductIndex = newState.cart.products.findIndex(object => object.id === product.id);
    newState.cart.products[cartProductIndex].amount--;
    const homeProductIndex = newState.home.allProducts.findIndex(object => object.id === product.id);
    if (homeProductIndex !== -1) {
      newState.home.allProducts[homeProductIndex].amount++;
    }
    return newState;
  }),
  on(removeAllProductFromCart, (state: AppState, {product}) => {
    const newState: AppState = cloneDeep(state);
    const cartProductIndex = newState.cart.products.findIndex(object => object.id === product.id);
    const amount = newState.cart.products[cartProductIndex].amount;
    newState.cart.products = newState.cart.products.filter(object => object.id !== product.id);
    const homeProductIndex = newState.home.allProducts.findIndex(object => object.id === product.id);
    if (homeProductIndex !== -1) {
      newState.home.allProducts[homeProductIndex].amount += amount;
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
