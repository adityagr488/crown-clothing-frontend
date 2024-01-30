import { useDispatch, useSelector } from "react-redux";
import { CartItem, addToCartAsync, clearFromCartAsync, removeFromCartAsync, resetCartError } from "../../store/cart/cart.slice";
import { ActionDispatch } from "../../store/store";
import IncrementIcon from "../../icons/increment.icon";
import DecrementIcon from "../../icons/decrement.icon";
import DeleteIcon from "../../icons/delete.icon";
import PriceIcon from "../../icons/price.icon";
import { useEffect } from "react";
import { selectCartError } from "../../store/cart/cart.selector";
import { setUserSessionExpirationError } from "../../store/user/user.slice";

const CheckoutItem: React.FC<{ cartItem: CartItem }> = ({ cartItem }) => {

    const dispatch = useDispatch<ActionDispatch>();

    const cartError = useSelector(selectCartError);

    useEffect(() => {
        if (cartError) {
            dispatch(setUserSessionExpirationError(cartError));
            dispatch(resetCartError());
        }
    }, [cartError]);

    const addItemToCartHandler = () => dispatch(addToCartAsync(cartItem));


    const removeItemFromCartHandler = () => dispatch(removeFromCartAsync(cartItem));

    const clearItemFromCartHandler = () => dispatch(clearFromCartAsync(cartItem));

    const { imageUrl, name, quantity, price } = cartItem;

    return (
        <div className="grid grid-cols-4 md:grid-cols-5 my-5">
            <img src={imageUrl} alt={`${name}`} className="row-span-2 md:row-span-1 w-14 md:w-20 mx-auto" />
            <span className="flex md:justify-center md:items-center col-span-3 sm:col-span-1 md:text-xl">{name}</span>
            <div className="flex justify-center items-center">
                <button className="cursor-pointer bg-gray-200 rounded p-1 active:bg-gray-400" onClick={addItemToCartHandler}>
                    <IncrementIcon className="w-5 h-5 md:w-6 md:h-6" color="#756AB6" />
                </button>
                <span className="px-3 md:text-xl">{quantity}</span>
                <button className="cursor-pointer bg-gray-200 rounded p-1 active:bg-gray-400" onClick={removeItemFromCartHandler}>
                    <DecrementIcon className="w-5 h-5 md:w-6 md:h-6" color="#756AB6" />
                </button>
            </div>
            <span className="inline-flex justify-center items-center md:text-xl">
                <PriceIcon className="w-7 h-7" color="#756AB6" />
                {price}
            </span>
            <div className="flex justify-center items-center">
                <button className="cursor-pointer bg-gray-200 rounded p-1 active:bg-gray-400" onClick={clearItemFromCartHandler}>
                    <DeleteIcon className="w-5 h-5 md:w-6 md:h-6" color="#756AB6" />
                </button>
            </div>
        </div>
    );
}

export default CheckoutItem;