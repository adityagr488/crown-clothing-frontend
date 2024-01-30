import { useDispatch, useSelector } from "react-redux";
import { Order, PaymentType, placeOrderAsync } from "../../store/orders/order.slice";
import { ActionDispatch } from "../../store/store";
import { selectCurrentUserDetails } from "../../store/user/user.selector";
import { selectCartItems, selectTotalCartAmount, selectTotalCartItems } from "../../store/cart/cart.selector";

const Payment = () => {
    const dispatch = useDispatch<ActionDispatch>();
    const user = useSelector(selectCurrentUserDetails);
    const cartItems = useSelector(selectCartItems);
    const totalCartAmount = useSelector(selectTotalCartAmount);
    const totalCartItems = useSelector(selectTotalCartItems);
    const addresses = user?.addresses;
    const placeOrder = () => {
        const order: Order = {
            date: new Date(),
            items: cartItems,
            address: addresses![0],
            paymentType: PaymentType.CASH,
            totalItems: totalCartItems,
            totalAmount: totalCartAmount
        }
        dispatch(placeOrderAsync(order));
    }
    return (
        <>
        <div>Payment</div>
        </>
    );
}
 
export default Payment;