import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Product } from "../../components/product-card/product-card.component"

export interface CategoryItemsState {
    categoryItems: Product[],
    isLoading: boolean,
    error: string | undefined
}

const CategoryItemsInitialState: CategoryItemsState = {
    categoryItems: [],
    isLoading: false,
    error: undefined
}

export const fetchCategoryItemsAsync = createAsyncThunk(
    "categoryItems/fetchCategoryItems",
    async (categoryId: string) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/categories/${categoryId}/products`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const categoryItems = await response.json();
        return categoryItems;
    }
);

const categoryItemsSlice = createSlice({
    name: "categoryItems",
    initialState: CategoryItemsInitialState,
    reducers: {},
    extraReducers: (buiilder) => {
        buiilder
            .addCase(fetchCategoryItemsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategoryItemsAsync.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.categoryItems = action.payload
                state.isLoading = false;
                state.error = undefined;
            })
            .addCase(fetchCategoryItemsAsync.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            })
    }
});

const categoryItemsReducer = categoryItemsSlice.reducer;

export default categoryItemsReducer;
