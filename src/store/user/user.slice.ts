import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';

export interface Address{
    id?: string
    tag: string
    houseNo: string
    area: string
    city: string
    state: string
    pincode: string
    mobileNo: string
}

interface User{
    name: string
    email: string
    addresses: [Address]
}

export interface UserState {
    currentUser: User | undefined
    userDropDownVisibility: boolean
    isLoading: boolean
    error: {
        loginError: string | undefined
        signUpError: string | undefined
        addressError: string | undefined
        sessionError: string | undefined
    }
}

const UserInitialState: UserState = {
    currentUser: undefined,
    userDropDownVisibility: false,
    isLoading: false,
    error: {
        loginError: undefined,
        signUpError: undefined,
        addressError: undefined,
        sessionError: undefined
    }
}

const cookies = new Cookies();

export const signupUserAsync = createAsyncThunk(
    "user/signup",
    async (payload: { name: string, email: string, password: string }) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        switch (response.status) {
            case 400:
                const { error } = await response.json();
                throw new Error(error);
            default:
                return;
        }
    }
)

export const loginUserAsync = createAsyncThunk(
    "user/login",
    async (payload: { email: string, password: string }) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        switch (response.status) {
            case 400:
            case 401:
            case 404:
                const { error } = await response.json();
                throw new Error(error);
            case 200:
                const user = await response.json();
                cookies.set("cc_jwt_token", user.token);
                return user;
            default:
                return;
        }
    }
);

export const checkUserSessionAsync = createAsyncThunk(
    "user/checkUserSession",
    async()=>{
        const TOKEN = cookies.get("cc_jwt_token");
        if(!TOKEN){
            return undefined;
        }
        const response = await fetch(`${process.env.REACT_APP_SERVER}/user/session`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        });
        switch(response.status){
            case 404: 
            case 401:
            case 400:
                const {error} = await response.json();
                throw new Error(error);
            case 200:
                const user = await response.json();
                return user;
            default:
                return;
        }
    }
)

export const addUserAddressAsync = createAsyncThunk(
    "user/addAddress",
    async (address : Address) =>{
        const TOKEN = cookies.get("cc_jwt_token");
        const response = await fetch(`${process.env.REACT_APP_SERVER}/user/addresses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(address)
        });
        switch(response.status){
            case 201:
                const addresses = await response.json();
                return addresses;
            case 401:
                throw new Error("Session expired. Please login again to continue.");
            case 400:
                const { error } = await response.json();
                throw new Error(error);
            default:
                return;
        }
    }
);

export const updateUserAddressAsync = createAsyncThunk(
    "user/updateAddress",
    async (address: Address) =>{
        const TOKEN = cookies.get("cc_jwt_token");
        const response = await fetch(`${process.env.REACT_APP_SERVER}/user/addresses/${address.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(address)
        });
        switch(response.status){
            case 200:
                const addresses = await response.json();
                return addresses;
            case 401:
                throw new Error("Session expired. Please login again to continue.");
            case 400:
                const { error } = await response.json();
                throw new Error(error);
            default:
                return;
        }
    }
);

export const deleteUserAddressAsync = createAsyncThunk(
    "user/deleteAddress",
    async (address_id : string) =>{
        const TOKEN = cookies.get("cc_jwt_token");
        const response = await fetch(`${process.env.REACT_APP_SERVER}/user/addresses/${address_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            }
        });
        switch(response.status){
            case 200:
                const addresses = await response.json();
                return addresses;
            case 401:
                throw new Error("Session expired. Please login again to continue.");
            case 400:
                const { error } = await response.json();
                throw new Error(error);
            default:
                return;
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: UserInitialState,
    reducers: {
        setUserDropDownVisibility: (state, action: PayloadAction<boolean>) =>{
            state.userDropDownVisibility = action.payload;
        },
        setUserSessionExpirationError: (state, action)=>{
            state.error.sessionError = action.payload;
        },
        resetUserAddressError: (state)=>{
            state.error.addressError = undefined;
        },
        signOutUser: (state) => {
            cookies.remove("cc_jwt_token");
            state.currentUser = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkUserSessionAsync.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(checkUserSessionAsync.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.currentUser = action.payload;
                state.error.sessionError = undefined;
            })
            .addCase(checkUserSessionAsync.rejected,(state, action)=>{
                state.isLoading = false;
                state.currentUser = undefined;
                state.error.sessionError = action.error.message;
            })
            .addCase(signupUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signupUserAsync.fulfilled, (state) => {
                state.isLoading = false;
                state.error.signUpError = undefined;
            })
            .addCase(signupUserAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error.signUpError = action.error.message;
            })
            .addCase(loginUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
                state.error.loginError = undefined;
                state.error.sessionError = undefined;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error.loginError = action.error.message;
            })
            .addCase(addUserAddressAsync.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(addUserAddressAsync.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.currentUser!.addresses = action.payload;
                state.error.addressError = undefined;
            })
            .addCase(addUserAddressAsync.rejected, (state, action)=>{
                state.isLoading = false;
                state.error.addressError = action.error.message;
            })
            .addCase(updateUserAddressAsync.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(updateUserAddressAsync.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.currentUser!.addresses = action.payload;
            })
            .addCase(updateUserAddressAsync.rejected, (state, action)=>{
                state.isLoading = false;
                state.error.addressError = action.error.message;
            })
            .addCase(deleteUserAddressAsync.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(deleteUserAddressAsync.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.currentUser!.addresses = action.payload;
            })
            .addCase(deleteUserAddressAsync.rejected, (state, action)=>{
                state.isLoading = false;
                state.error.addressError = action.error.message;
            })
    },
});

const userReducer = userSlice.reducer;

export const { setUserSessionExpirationError, setUserDropDownVisibility, signOutUser, resetUserAddressError } = userSlice.actions;

export default userReducer;