import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";

import { selectTotalCartAmount } from "../../store/cart/cart.selector";
import { selectCurrentUserDetails } from "../../store/user/user.selector";

const PaymentForm = () => {

    const amount = useSelector(selectTotalCartAmount);
    const user = useSelector(selectCurrentUserDetails);

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsProcessingPayment(true);

        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then(res => res.json());


        setIsProcessingPayment(false);

    }

    return (
        <div className="mx-5 my-10 md:w-1/2 xl:w-1/3 md:mx-auto border-2 rounded p-2">
            <div className="flex flex-col">
                <div className="text-center text-2xl mb-4">
                    Credit Card Payment
                </div>
            </div>
            <div className="my-2">
                <button className="rounded text-white w-full py-2 bg-blue-700 hover:bg-blue-500 active:bg-blue-900" disabled={isProcessingPayment}>Pay now</button>
            </div>
        </div>

    );
}

export default PaymentForm;