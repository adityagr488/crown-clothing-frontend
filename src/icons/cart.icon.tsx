import { useSelector, useDispatch } from "react-redux";
import { selectCartDropDownVisibility, selectTotalCartItems } from "../store/cart/cart.selector";
import { setCartVisibility } from "../store/cart/cart.slice";
import { ActionDispatch } from "../store/store";
import { selectCurrentUserDetails } from "../store/user/user.selector";

const CartIcon = () => {

    const dispatch = useDispatch<ActionDispatch>();
    const user = useSelector(selectCurrentUserDetails);
    const cartDropDownVisibility = useSelector(selectCartDropDownVisibility);
    const totalCartItems = useSelector(selectTotalCartItems);

    const toggleCartDropDownVisibility = () => {
        dispatch(setCartVisibility(!cartDropDownVisibility));
    }

    return (
        <div onClick={toggleCartDropDownVisibility} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#756AB6" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span 
                className={(user && totalCartItems > 9 ? "ml-3" : "ml-4") + " absolute top-6 font-semibold text-center text-[#756AB6]"}>
                {user ? totalCartItems : 0}
            </span>
        </div>
    );
}

export default CartIcon;