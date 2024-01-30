import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface Category {
    id: number,
    name: string,
    title: string,
    imageUrl: string,
    route: string,
}

export interface CategoriesState {
    categories: Category[],
    isLoading: boolean,
    error: string | undefined
}

const CategoriesInitialState: CategoriesState = {
    categories: [],
    isLoading: false,
    error: undefined
}

export const fetchCategoriesAsync = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const categories = await response.json();
        categories.map((category: Category) =>
            category.route = `/${category.name}`
        )
        return categories;
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState: CategoriesInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.categories = action.payload
                state.isLoading = false
                state.error = undefined
            })
            .addCase(fetchCategoriesAsync.rejected, (state, action) => {
                console.log("Categories rejected")
                state.error = action.error.message
                state.isLoading = false
            })
    }
});

const categoriesReducer = categoriesSlice.reducer;

export default categoriesReducer;