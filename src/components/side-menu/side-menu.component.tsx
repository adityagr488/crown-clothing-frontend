import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUserDetails } from "../../store/user/user.selector";
import { Link } from "react-router-dom";
import React from "react";
import SignOutIcon from "../../icons/signout.icon";
import SignUpIcon from "../../icons/signup.icon";
import { signOutUser } from "../../store/user/user.slice";
import ProfileIcon from "../../icons/profile.icon";
import OrdersIcon from "../../icons/orders.icon";
import { setCartItemsEmpty } from "../../store/cart/cart.slice";


const SideMenu: React.FC<{ menuVisibility: boolean, setMenuVisibility: React.Dispatch<React.SetStateAction<boolean>> }> = ({ menuVisibility, setMenuVisibility }) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUserDetails);
    const signOut = () => {
        setMenuVisibility(!menuVisibility);
        dispatch(signOutUser());
        dispatch(setCartItemsEmpty());
    }
    const toggleSideMenuVisibility = () => setMenuVisibility(!menuVisibility);

    return (
        <div
            className={
                (menuVisibility ? "translate-x-0" : "-translate-x-[100%]")
                + " fixed z-10 left-0 top-0 bg-[#FFE5E5] transition duration-[500ms] lg:hidden h-full w-full md:w-1/2"
            }
        >
            <div className="p-2 lg:hidden ml-2 mt-2 w-fit" onClick={toggleSideMenuVisibility}>
                {
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#756AB6" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                }
            </div>
            <div className="px-6 flex flex-col">
                {
                    !currentUser &&
                    <Link className="p-2 text-xl inline-flex items-center" to="/auth/login" onClick={toggleSideMenuVisibility}>
                        <ProfileIcon className="w-6 h-6" color="#756AB6" />
                        <span className="ml-5 w-full text-[#C21292] font-serif">Login</span>
                    </Link>
                }
                {
                    !currentUser &&
                    <Link className="p-2 text-xl inline-flex items-center" to="/auth/signup" onClick={toggleSideMenuVisibility}>
                        <SignUpIcon className="w-6 h-6" color="#756AB6" />
                        <span className="ml-5 w-full text-[#C21292] font-serif">Sign Up</span>
                    </Link>
                }
                {
                    currentUser &&
                    <div className="px-2 text-xl inline-flex items-center">
                        <span className="text-[#C21292] font-serif border-b-2">Welcome <b>{currentUser.name.split(" ")[0]}</b></span>
                    </div>
                }
                {
                    currentUser &&
                    <Link className="p-2 text-xl inline-flex items-center" to="/profile" onClick={toggleSideMenuVisibility}>
                        <ProfileIcon className="w-6 h-6" color="#756AB6" />
                        <span className="ml-5 w-full text-[#C21292] font-serif">My Profile</span>
                    </Link>
                }
                {
                    currentUser &&
                    <Link className="p-2 text-xl inline-flex items-center" to="/orders" onClick={toggleSideMenuVisibility}>
                        <OrdersIcon className="w-6 h-6" color="#756AB6" />
                        <span className="ml-5 w-full text-[#C21292] font-serif">My Orders</span>
                    </Link>
                }
                {
                    currentUser &&
                    <Link className="p-2 text-xl inline-flex items-center" to="/" onClick={signOut} >
                        <SignOutIcon className="w-6 h-6" color="#756AB6" />
                        <span className="ml-5 w-full text-[#C21292] font-serif">Sign Out</span>
                    </Link>
                }
            </div>
        </div>
    );
}

export default SideMenu;