import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectOrders } from '../../store/orders/order.selector';
import PriceIcon from '../../icons/price.icon';
import { selectCurrentUserDetails } from '../../store/user/user.selector';

const OrderItems = () => {
    const user = useSelector(selectCurrentUserDetails);
    const orders = useSelector(selectOrders);
    const { order_id } = useParams();
    const order = orders.find((order) => order._id === order_id);

    return (
        <>
            {
                user ?
                    order ?
                        <div className="m-2 xl:w-2/3 xl:mx-auto">
                            <div className="grid grid-cols-4 my-3">
                                <span className="text-lg text-center font-bold">Product</span>
                                <span className="text-lg text-center font-bold">Name</span>
                                <span className="text-lg text-center font-bold">Qty</span>
                                <span className="text-lg text-center font-bold">Price</span>
                            </div>
                            {
                                order.items.map((item, idx) => {
                                    return (
                                        <div className="grid grid-cols-4 my-5" key={idx}>
                                            <img src={item.imageUrl} alt={`${item.name}`} className="w-14 md:w-20 mx-auto" />
                                            <span className="inline-flex items-center md:text-xl">{item.name}</span>
                                            <span className="inline-flex justify-center items-center px-3 md:text-xl">{item.quantity}</span>
                                            <span className="inline-flex justify-center items-center md:text-xl">
                                                <PriceIcon className="w-7 h-7" color="#756AB6" />
                                                {item.price}
                                            </span>
                                        </div>
                                    );
                                })
                            }
                            <hr />
                            <div className="mt-4 grid grid-cols-4">
                                <span className="text-xl col-start-2 flex justify-center items-center font-bold">Total</span>
                                <span className="text-xl flex justify-center items-center">{order.items.length}</span>
                                <span className="text-xl flex justify-center items-center">
                                    <PriceIcon className="w-7 h-7" color="#756AB6" />
                                    {order.totalAmount}
                                </span>
                            </div>
                        </div>
                        :
                        <div className="text-center mt-6">No order found with ID: {order_id}</div>
                    :
                    <div className="text-center mt-6">
                        <span className="text-xl">
                            Please <Link to="/auth/login" className="text-blue-700">Login</Link> to continue.
                        </span>
                    </div>
            }
        </>
    );
};

export default OrderItems;