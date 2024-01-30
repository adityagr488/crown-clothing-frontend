import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCartItems, selectTotalCartAmount, selectTotalCartItems } from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { selectCurrentUserDetails, selectUserDetailsIsLoading } from "../../store/user/user.selector";
import PriceIcon from "../../icons/price.icon";
import { selectOrderDetailsIsLoading } from "../../store/orders/order.selector";
import Spinner from "../../components/spinner/spinner.component";


const Checkout = () => {

    const navigate = useNavigate();
    const user = useSelector(selectCurrentUserDetails);
    const cartItems = useSelector(selectCartItems);
    const totalCartAmount = useSelector(selectTotalCartAmount);
    const totalCartItems = useSelector(selectTotalCartItems);
    const isUserDetailsLoading = useSelector(selectUserDetailsIsLoading);
    const isOrderDetailsLoading = useSelector(selectOrderDetailsIsLoading);

    const paymentHandler = () => {
        navigate("/payment");
    }

    return (
        <>
            {
                !isUserDetailsLoading && user ?
                    cartItems.length ?
                        <Fragment>
                            <div className="py-5 xl:w-2/3 xl:mx-auto">
                                <div className="hidden md:grid md:grid-cols-5 my-3">
                                    <span className="text-lg text-center p-2 font-bold">Product</span>
                                    <span className="text-lg text-center p-2 font-bold">Name</span>
                                    <span className="text-lg text-center p-2 font-bold">Quantity</span>
                                    <span className="text-lg text-center p-2 font-bold">Price</span>
                                </div>
                                {
                                    cartItems.map((cartItem) => (<CheckoutItem key={cartItem._id} cartItem={cartItem} />))
                                }
                                <hr />
                                <div className="mt-4 grid grid-cols-4 md:grid-cols-5">
                                    <span className="md:text-xl font-bold md:col-start-2 flex justify-center items-center">Total</span>
                                    <span className="md:text-xl flex justify-center items-center">{totalCartItems}</span>
                                    <span className="md:text-xl flex justify-center items-center">
                                        <PriceIcon className="w-7 h-7" color="#756AB6" />
                                        {totalCartAmount}
                                    </span>
                                </div>
                            </div>
                            <div className="m-5 md:mx-auto md:w-2/3 lg:w-1/2 xl:w-1/4">
                                <div className="my-2">
                                    <button
                                        className="rounded text-white w-full p-2 bg-blue-700 hover:bg-blue-500 active:bg-blue-900"
                                        disabled={isOrderDetailsLoading}
                                        onClick={paymentHandler}
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </Fragment>
                        :
                        <div className="mx-2 my-4 text-center md:text-lg">
                            Your cart is empty! <br />
                            To view products and categories, <Link to="/" className="text-blue-500">click here.</Link>
                        </div>
                    :
                    user && 
                    <div className="text-center mt-6">
                        <span className="text-xl">
                            Please <Link to="/auth/login" className="text-blue-700">Login</Link> to continue.
                        </span>
                    </div>
            }
            {
                isUserDetailsLoading &&
                <Spinner/>
            }
        </>
    );
}

export default Checkout;