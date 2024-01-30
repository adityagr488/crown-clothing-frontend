import { createSelector } from "reselect";
import { RootState } from "../store";

const selectCategoriesReducer = (state: RootState) => state.categories;

export const selectCategories = createSelector(
    [selectCategoriesReducer],
    (categoriesState) => categoriesState.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((acc: { [key: string]: string }, category) => {
        const { name, id } = category;
        acc[name] = id.toString();
        return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoriesReducer],
    (categoriesState) => categoriesState.isLoading
);

export const selectCategoriesError = createSelector(
    [selectCategoriesReducer],
    (categoriesState) => categoriesState.error
)