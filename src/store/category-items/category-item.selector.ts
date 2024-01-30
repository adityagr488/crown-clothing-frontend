import { createSelector } from "reselect";
import { RootState } from "../store";

const selectCategoryItemsReducer = (state: RootState) => state.categoryItems;

export const selectCategoryItems = createSelector(
    [selectCategoryItemsReducer],
    (categoryItemsState) => categoryItemsState.categoryItems
);

export const selectCategoryItemsIsLoading = createSelector(
    [selectCategoryItemsReducer],
    (categoryItemsState) => categoryItemsState.isLoading
);

export const selectCategoryItemsError = createSelector(
    [selectCategoryItemsReducer],
    (categoryItemsState) => categoryItemsState.error
)