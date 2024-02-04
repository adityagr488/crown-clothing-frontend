import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Order, PaymentType, placeOrderAsync } from "../../store/orders/order.slice";
import { ActionDispatch } from "../../store/store";
import { selectCurrentUserDetails } from "../../store/user/user.selector";
import { selectCartItems, selectTotalCartAmount, selectTotalCartItems } from "../../store/cart/cart.selector";
import FormInput from "../../components/form-input/form-input.component";
import { selectOrderDetailsIsLoading} from "../../store/orders/order.selector";
import LocationIcon from "../../icons/location.icon";
import MobileIcon from "../../icons/mobile.icon";
import PriceIcon from "../../icons/price.icon";
import { setCartItemsEmpty } from "../../store/cart/cart.slice";

const Payment = () => {
    const [message, setMessage] = useState<string>("");
    const [deliveryAddressIdx, setDeliveryAddressIdx] = useState<number>(-1);
    const [paymentType, setPaymentType] = useState<PaymentType | undefined>(undefined);
    const [formFields, setFormFields] = useState<Record<string, string>>({});
    const dispatch = useDispatch<ActionDispatch>();
    const user = useSelector(selectCurrentUserDetails);
    const cartItems = useSelector(selectCartItems);
    const totalCartAmount = useSelector(selectTotalCartAmount);
    const totalCartItems = useSelector(selectTotalCartItems);
    const isLoading = useSelector(selectOrderDetailsIsLoading);
    const addresses = user?.addresses;

    const placeOrder = () => {
        const order: Order = {
            order_date: new Date(),
            items: cartItems,
            address: addresses![deliveryAddressIdx],
            paymentType: paymentType!,
            totalItems: totalCartItems,
            totalAmount: totalCartAmount,
        }
        dispatch(placeOrderAsync(order));
    }
    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const closeErrorhandler = () => {
        setMessage("");
    }

    const isFormValid = () => {
        if (deliveryAddressIdx === -1) {
            setMessage("Please select a delivery address.");
            return false;
        }
        if (paymentType === undefined) {
            setMessage("Please select a payment option.")
            return false;
        }
        return true;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid()) {
            return;
        }
        placeOrder();
        alert("Order Placed successfully.");
        dispatch(setCartItemsEmpty());
        window.location.href = "/orders"
    };

    return (
        <div className="max-w-md mx-2 md:mx-auto p-4">
            {
                !isLoading
                &&
                <div className={message === "" ? "hidden" : "bg-red-100 rounded my-2 p-2 text-red-800 flex justify-between items-center"}>
                    <span>{message}</span>
                    <button className="font-medium rounded hover:bg-red-200" onClick={closeErrorhandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            }
            <form onSubmit={handleSubmit}>
                <div className="mt-2 mb-5">
                    <label className="block text-gray-700 text-lg font-bold mb-2">Select Delivery Address</label>
                    <select
                        name="address"
                        value={deliveryAddressIdx}
                        onChange={(e) => setDeliveryAddressIdx(parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value={-1}>Select</option>
                        {
                            user?.addresses.map((address, idx) => <option key={idx} value={idx}>{address.tag}</option>)
                        }
                    </select>
                    {
                        deliveryAddressIdx !== -1 &&
                        <div className="p-2">
                            <div className="inline-flex items-center">
                                <LocationIcon className="w-6 h-6" color="#756AB6" />
                                <span className="ml-2 mb-2 text-xl font-bold">{addresses![deliveryAddressIdx].tag}</span>
                            </div>
                            <div className="flex flex-col ml-7">
                                <span className="mb-1">
                                    {addresses![deliveryAddressIdx].houseNo}, {addresses![deliveryAddressIdx].area}, {addresses![deliveryAddressIdx].city}, {addresses![deliveryAddressIdx].state} - {addresses![deliveryAddressIdx].pincode}</span>
                                <span className="mb-1 inline-flex items-center">
                                    <MobileIcon className="w-5 h-5" color="#756AB6" />
                                    {addresses![deliveryAddressIdx].mobileNo}
                                </span>
                            </div>
                        </div>
                    }
                    <span className="text-xs text-blue-500">
                        Don't see the right address? <Link to="/profile" className="font-semibold underline">Add address</Link>
                    </span>
                </div>
                <div className="mt-5">
                    <div className="mb-3">
                        <span className="text-lg font-bold">Amount: <PriceIcon className="md:ml-2 w-6 h-6 inline" color="#756AB6" /> {totalCartAmount}</span>
                    </div>
                    <label className="block text-lg font-bold mb-2">Select Payment Type</label>
                    <select
                        name="paymentType"
                        value={paymentType || ''}
                        onChange={(e) => setPaymentType(e.target.value as PaymentType)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value={undefined}>Select</option>
                        {Object.values(PaymentType).map((type) => (
                            <option key={type} value={type}>{type.replace("_", " ")}</option>
                        ))}
                    </select>
                    {paymentType === PaymentType.UPI && (
                        <div className="mb-4">
                            <FormInput
                                label="UPI ID"
                                name="upiId"
                                type="text"
                                required
                                autoComplete="on"
                                onChange={inputChangeHandler}
                            />
                        </div>
                    )}

                    {paymentType === PaymentType.CREDIT_CARD && (
                        <div className="mb-4">
                            <FormInput
                                label="Credit Card Number"
                                name="creditCardNumber"
                                type="text"
                                required
                                autoComplete="on"
                                onChange={inputChangeHandler}
                            />
                            <FormInput
                                label="Expiry Date"
                                name="creditExpiryDate"
                                type="month"
                                required
                                autoComplete="on"
                                onChange={inputChangeHandler}
                            />
                        </div>
                    )}

                    {paymentType === PaymentType.DEBIT_CARD && (
                        <div className="mb-4">
                            <FormInput
                                label="Debit Card Number"
                                name="debitCardNumber"
                                type="text"
                                required
                                autoComplete="on"
                                onChange={inputChangeHandler}
                            />
                            <FormInput
                                label="Expiry Date"
                                name="debitExpiryDate"
                                type="month"
                                required
                                autoComplete="on"
                                onChange={inputChangeHandler}
                            />
                        </div>
                    )}

                    {paymentType === PaymentType.CASH && (
                        <p className="my-4 text-green-600">Please make the payment in cash at the time of delivery.</p>
                    )}
                </div>
                <div className="mt-4">
                    <button type="submit"
                        className="flex justify-center items-center rounded text-white w-full py-2 bg-green-700 hover:bg-green-500 active:bg-green-900 disabled:opacity-80"
                        disabled={isLoading}
                    >
                        {
                            isLoading
                            &&
                            <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-t-white" />
                        }
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Payment;