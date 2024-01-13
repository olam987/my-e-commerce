import {AppState} from "./state";
import {createFeatureSelector} from "@ngrx/store";

export const selectStore = createFeatureSelector<AppState>('appStore');

