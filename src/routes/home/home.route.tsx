import { useEffect } from "react";
import CategoryItem from "../../components/category-item/category-item.component";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAsync } from "../../store/categories/categories.slice";
import { ActionDispatch } from "../../store/store";
import { selectCategories, selectCategoriesError, selectCategoriesIsLoading } from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";

const Home = () => {

  const dispatch = useDispatch<ActionDispatch>();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const categoriesIsLoading = useSelector(selectCategoriesIsLoading);
  const categories = useSelector(selectCategories);
  const error = useSelector(selectCategoriesError);

  return (
    categoriesIsLoading
      ?
      <Spinner/>
      :
      categories.length
        ?
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
          {
            categories.map((category) => {
              return <CategoryItem key={category.id} category={category} />
            })
          }
        </div>
        :
        <span>Error: {error}</span>
  );
};

export default Home;