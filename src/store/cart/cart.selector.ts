import { RootState } from "../store";
import { CartItem } from "./cart.slice";

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const selectCartDropDownVisibility = (state: RootState) => state.cart.cartVisibility;

export const selectCartdetailsIsLoading = (state: RootState) => state.cart.isLoading;

export const selectCartError = (state: RootState) => state.cart.error;

export const selectTotalCartItems = (state: RootState) => state.cart.cartItems.reduce((total, cartItem: CartItem) => total + cartItem.quantity, 0);

export const selectTotalCartAmount = (state: RootState) => state.cart.cartItems.reduce((total, cartItem: CartItem) => total + cartItem.quantity * cartItem.price, 0);