import React from "react";
import { CartItem } from "../../store/cart/cart.slice";
import PriceIcon from "../../icons/price.icon";

const CartItemView: React.FC<{ product: CartItem }> = ({ product }) => {
    const { name, imageUrl, price, quantity } = product;
    return (
        <div className="flex pt-2">
            <img src={imageUrl} alt={`${name}`} className="w-12" />
            <div className="flex flex-col mx-2 px-2 w-full">
                <span className="text-base"> {name}</span>
                <div className="flex flex-row justify-between">
                    <span className="text-base">Qty: {quantity}</span>
                    <span className="text-base inline-flex">
                        <PriceIcon className="w-6 h-6" color="#756AB6" />
                        {price}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CartItemView; 