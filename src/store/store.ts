import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";
import categoriesReducer from "./categories/categories.slice";
import cartReducer from "./cart/cart.slice";
import categoryItemsReducer from "./category-items/category-item.slice";
import ordersReducer from "./orders/order.slice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoriesReducer,
        cart: cartReducer,
        categoryItems: categoryItemsReducer,
        orders: ordersReducer
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type ActionDispatch = typeof store.dispatch;