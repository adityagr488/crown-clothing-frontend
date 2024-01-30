import { useDispatch, useSelector } from "react-redux";
import { ActionDispatch } from "../../store/store";
import { addToCartAsync } from "../../store/cart/cart.slice";
import { selectCurrentUserDetails } from "../../store/user/user.selector";
import { useNavigate } from "react-router-dom";
import PriceIcon from "../../icons/price.icon";

export interface Product {
    _id: number,
    imageUrl: string,
    name: string,
    price: number
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {

    const dispatch = useDispatch<ActionDispatch>();
    const currentUser = useSelector(selectCurrentUserDetails);
    const navigate = useNavigate();

    const addItem = async () => {
        if(currentUser){
            dispatch(addToCartAsync(product));
        }
        else{
            navigate("/auth/login", { state: { redirectUrl: window.location.pathname } });
        }
    }

    const { imageUrl, name, price } = product;

    return (
        <div className="mb-4 rounded-md shadow hover:shadow-lg w-fit mx-auto cursor-pointer">
            <img src={imageUrl} alt={`${name}`} className="rounded-t-md h-[400px] w-[350px] lg:h-[300px] lg:w-[250px]" />
            <div className="m-2 flex flex-row justify-between">
                <span className="text-xl">{name}</span>
                <span className="text-xl inline-flex items-center">
                    <PriceIcon className="w-7 h-7" color="#756AB6" /> 
                    {price}
                </span>
            </div>
            <div className="p-2">
                <button
                    onClick={addItem}
                    className="w-full text-white text-center bg-red-200 p-2 rounded hover:bg-red-500"
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;