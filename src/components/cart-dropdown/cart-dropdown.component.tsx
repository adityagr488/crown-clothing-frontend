import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";

import CartItem from "../cart-item-view/cart-item-view.component";
import { setCartVisibility } from "../../store/cart/cart.slice";
import { selectCurrentUserDetails } from "../../store/user/user.selector";

const CartDropdown = () => {

    const user = useSelector(selectCurrentUserDetails);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const checkOutHandler = () => {
        dispatch(setCartVisibility(false));
        navigate("/checkout");
    }

    return (
        <div className="z-10 absolute right-4 top-16 rounded bg-white shadow-md border border-gray-600">
            <div className="my-2 px-2 w-[250px] h-[200px] overflow-y-auto">
                {
                    user && cartItems.length
                        ?
                        cartItems.map((item) => <CartItem key={item._id} product={item} />)
                        :
                        <div className="text-center mt-2 md:text-lg">Your cart is empty!</div>
                }
            </div>
            <div className="m-2">
                <button className="w-full py-2 bg-red-200 hover:bg-red-400 active:bg-red-600 rounded" onClick={checkOutHandler}>Checkout</button>
            </div>
        </div>
    );
}

export default CartDropdown;