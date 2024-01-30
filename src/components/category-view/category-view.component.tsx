import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/categories.selector";
import ProductCard from "../product-card/product-card.component";
import { ActionDispatch } from "../../store/store";
import { fetchCategoryItemsAsync } from "../../store/category-items/category-item.slice";
import { selectCategoryItems, selectCategoryItemsError, selectCategoryItemsIsLoading } from "../../store/category-items/category-item.selector";
import { fetchCategoriesAsync } from "../../store/categories/categories.slice";
import Spinner from "../spinner/spinner.component";

const CategoryView = () => {

    const { category } = useParams();
    const dispatch = useDispatch<ActionDispatch>();
    const categoriesIsLoading = useSelector(selectCategoriesIsLoading);
    const categoriesMap = useSelector(selectCategoriesMap);

    useEffect(() => {
        if (Object.keys(categoriesMap).length === 0) {
            dispatch(fetchCategoriesAsync());
        }
        else {
            if(!categoriesIsLoading){
                dispatch(fetchCategoryItemsAsync(categoriesMap[category!]));
            }
        }
    }, [categoriesIsLoading, category, categoriesMap, dispatch]);

    const categoryItems = useSelector(selectCategoryItems);
    const categoryItemsIsLoading = useSelector(selectCategoryItemsIsLoading);
    const categoryItemsError = useSelector(selectCategoryItemsError);

    return (
        categoryItemsIsLoading
            ?
            <Spinner/>
            :
            categoryItems.length
                ?
                <div className="p-4">
                    <h2 className="text-center pt-2 pb-3 text-3xl font-bold font-mono">{category!.toUpperCase()}</h2>
                    <div className="md:grid md:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
                        {
                            categoryItems.map((product) => {
                                return <ProductCard key={product._id} product={product} />
                            })
                        }
                    </div>
                </div>
                :
                <span>Error: {categoryItemsError}</span>
    );
}

export default CategoryView;