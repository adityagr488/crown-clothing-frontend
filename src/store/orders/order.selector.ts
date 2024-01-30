import { RootState } from "../store";

export const selectOrders = (state: RootState) => state.orders.ordersList;

export const selectOrderDetailsIsLoading = (state: RootState) => state.orders.isLoading;

export const selectOrdersError = (state: RootState)=> state.orders.error;