import { Fragment, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUserDetails, selectUserDropDownVisibility } from "../../store/user/user.selector";
import { selectCartDropDownVisibility } from "../../store/cart/cart.selector";
import CartIcon from "../../icons/cart.icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CrownIcon from "../../icons/crown.icon";
import MenuIcon from "../../icons/menu.icon";
import SideMenu from "../../components/side-menu/side-menu.component";
import SignUpIcon from "../../icons/signup.icon";
import UserDropDown from "../../components/user-droprown/user-dropdown.component";
import UserProfileIcon from "../../icons/user-profile-icon.component";
import ProfileIcon from "../../icons/profile.icon";

const Navigation = () => {

    const [menuVisibility, setMenuVisibility] = useState(false);


    const currentUser = useSelector(selectCurrentUserDetails);
    const cartDropDownVisibility = useSelector(selectCartDropDownVisibility);
    const userDropDownVisibility = useSelector(selectUserDropDownVisibility);    

    return (
        <Fragment>
            <nav className="p-2 flex flex-row lg:justify-between bg-[#FFE5E5]">
                <MenuIcon menuVisibility={menuVisibility} setMenuVisibility={setMenuVisibility} />
                <SideMenu menuVisibility={menuVisibility} setMenuVisibility={setMenuVisibility}/>
                <div className="px-2 mx-2 w-full lg:w-fit inline-flex items-baseline">
                    <Link to="/">
                        <CrownIcon />
                    </Link>
                    <span className="px-4 text-4xl hidden md:block text-[#C21292] font-serif font-semibold">CROWN</span>
                </div>
                <div className="px-2 mx-2 flex flex-row items-center">
                    <div className="px-2 hidden lg:flex lg:flex-row">
                        {
                            !currentUser &&
                            <Link className="px-2 text-xl inline-flex items-center" to="/auth/login">
                                <ProfileIcon className="w-6 h-6" color="#756AB6"/>
                                <span className="ml-2 text-[#C21292] font-serif">Login</span>
                            </Link>
                        }
                        {
                            !currentUser &&
                            <Link className="px-2 text-xl inline-flex items-center" to="/auth/signup">
                                <SignUpIcon className="w-6 h-6" color="#756AB6" />
                                <span className="ml-2 whitespace-nowrap text-[#C21292] font-serif">Sign Up</span>
                            </Link>
                        }
                        {
                            currentUser && 
                            <div className="px-2 text-xl inline-flex items-center">
                                <span className="text-[#C21292] font-serif border-b-2">Welcome <b>{currentUser.name}</b></span>
                            </div>
                        }
                        {
                            currentUser && 
                            <div className="px-2 text-xl inline-flex items-center">
                                <UserProfileIcon />
                            </div>
                        }
                    </div>
                    <CartIcon />
                </div>
                {
                    currentUser && userDropDownVisibility && <UserDropDown />
                }
                {
                    cartDropDownVisibility && <CartDropdown />
                }
            </nav>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;