import { Link } from "react-router-dom";
import SignOutIcon from "../../icons/signout.icon";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../store/user/user.slice";
import ProfileIcon from "../../icons/profile.icon";
import MyOrdersIcon from "../../icons/orders.icon";
import { setCartItemsEmpty } from "../../store/cart/cart.slice";

const UserDropDown = () => {
    const dispatch = useDispatch();
    const signOut = () => {
        dispatch(signOutUser());
        dispatch(setCartItemsEmpty());
    }
    return ( 
        <div className="hidden md:block z-10 absolute right-20 top-16 rounded bg-white shadow-md border border-gray-200">
            <div className="flex flex-col">
                <Link className="py-2 px-4 text-xl inline-flex items-center hover:bg-gray-100" to="/profile">
                    <ProfileIcon className="w-6 h-6" color="#756AB6" />
                    <span className="ml-3 whitespace-nowrap text-[#C21292] font-serif">My Profile</span>
                </Link>
                <Link className="py-2 px-4 text-xl inline-flex items-center hover:bg-gray-100" to="/orders">
                    <MyOrdersIcon className="w-6 h-6" color="#756AB6" />
                    <span className="ml-3 whitespace-nowrap text-[#C21292] font-serif">My Orders</span>
                </Link>
                <Link className="py-2 px-4 text-xl inline-flex items-center hover:bg-gray-100" to="/" onClick={signOut} >
                    <SignOutIcon className="w-6 h-6" color="#756AB6" />
                    <span className="ml-3 whitespace-nowrap text-[#C21292] font-serif">Sign Out</span>
                </Link>
            </div>
        </div>
     );
}
 
export default UserDropDown;