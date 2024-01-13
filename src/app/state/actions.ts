import {createAction, props} from "@ngrx/store";
import {Product} from "../shared/model/product";
import {Category} from "../shared/model/category";

export const loadProducts = createAction('Load all products');

export const loadProductsSuccessfully = createAction('Load all products successfully', props<{
  products: Product[];
}>());

export const filterByCategory = createAction('Filter product by given category', props<{
  category: Category;
}>());

export const resetFilterByCategory = createAction('Reset filter by category');

export const loadProductsError = createAction('Load all products error');

export const addProductToCart = createAction('Add product to cart', props<{
  product: Product;
}>());

export const addProductToCartSuccessfully = createAction('Add product to cart successfully', props<{
  product: Product;
}>());

export const addProductToCartError = createAction('Add product to cart error');

