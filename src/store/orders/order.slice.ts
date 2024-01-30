import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';
import { CartItem } from "../cart/cart.slice";
import { Address } from "../user/user.slice";

export enum PaymentType {
    UPI = "UPI",
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
    NET_BANKING = "NET_BANKING",
    CASH = "CASH"
}

export interface Order {
    _id?: string
    date : Date
    items : CartItem[]
    totalItems: number
    totalAmount : number
    orderStatus? : string
    paymentType : PaymentType
    address : Address
}

export interface OrderState{
    isLoading: boolean
    ordersList: Order[]
    error: string | undefined
}

const OrdersInitialState: OrderState = {
    isLoading: false,
    ordersList: [],
    error: undefined
}

const cookies = new Cookies();

export const fetchOrdersAsync = createAsyncThunk(
    "cart/fetchOrdersAsync",
    async()=>{
        const TOKEN = cookies.get("cc_jwt_token");
        const response = await fetch(`${process.env.REACT_APP_SERVER}/user/orders`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        });
        switch(response.status){
            case 200:
                const orders = await response.json();
                return orders;
            case 401:
                const {error} = await response.json();
                throw new Error(error);
        }
    }
)

export const placeOrderAsync = createAsyncThunk(
    "cart/addItemToCart",
    async (order: Order) =>{
        const TOKEN = cookies.get("cc_jwt_token");
        const response = await fetch(`${process.env.REACT_APP_SERVER}/user/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(order)
        });
        const orders = await response.json();
        return orders;
    }
)


const ordersSlice = createSlice({
    name: "cart",
    initialState: OrdersInitialState,
    reducers: {
        resetOrderError: (state)=>{
            state.error = undefined;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchOrdersAsync.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(fetchOrdersAsync.fulfilled, (state, action: PayloadAction<Order[]>)=>{
            state.isLoading = false;
            state.ordersList = action.payload;
        })
        .addCase(fetchOrdersAsync.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(placeOrderAsync.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(placeOrderAsync.fulfilled, (state, action: PayloadAction<Order[]>)=>{
            state.isLoading = false;
            state.ordersList = action.payload;
        })
        .addCase(placeOrderAsync.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});

export const {resetOrderError} = ordersSlice.actions;

const ordersReducer = ordersSlice.reducer;

export default ordersReducer;
