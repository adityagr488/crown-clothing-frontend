import { useSelector } from "react-redux";
import { selectOrders} from "../../store/orders/order.selector";
import PriceIcon from "../../icons/price.icon";
import { Link } from "react-router-dom";
import { selectCurrentUserDetails } from "../../store/user/user.selector";

const OrderStatus: { [key: string]: string } = {
    "PROCESSING": "bg-yellow-400",
    "SHIPPED": "bg-blue-400",
    "DELIVERED": "bg-green-400",
    "CANCELLED": "bg-red-400",
    "RETURNED": "bg-brown-400"
}

const Orders = () => {
    const user = useSelector(selectCurrentUserDetails);
    const orders = useSelector(selectOrders);

    return (
        <>
            {
                user ?
                    orders.length ?
                        <div className="p-4 md:w-2/3 lg:w-full xl:w-2/3 mx-auto lg:grid lg:grid-cols-2">
                            {orders.map(order => (
                                <div key={order._id} className="mb-8 lg:mr-4 flex flex-row shadow-md items-center">
                                    <div className="flex flex-col md:flex-row md:flex-wrap md:w-32 justify-center items-center">
                                        {
                                            order.items
                                                .filter((_, index) => {
                                                    return index < 4;
                                                })
                                                .map((item, index) => (
                                                    <img key={index} src={item.imageUrl} alt={item.name} className="w-12 md:w-16 md:h-16" />
                                                ))
                                        }
                                    </div>
                                    <div className="px-6">
                                        <div className="mb-2">
                                            <span className="block md:inline">Order Date:</span>
                                            <span className="md:ml-2">{new Date(order.date).toDateString()}</span>
                                        </div>
                                        <div className="my-2">
                                            <span className="block md:inline">Total Amount:</span>
                                            <span><PriceIcon className="md:ml-2 w-6 h-6 inline" color="#756AB6" />{order.totalAmount.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="my-2">
                                            <span className="block md:inline mb-2 md:mb-0">Order Status:</span>
                                            <span
                                                className={`text-white ${OrderStatus[order.orderStatus!]} md:ml-2 px-2 py-1 rounded-md`}
                                            >
                                                {order.orderStatus}
                                            </span>
                                        </div>
                                        <div className="mt-2">
                                            <span className="block md:inline">Payment Type:</span>
                                            <span className="md:ml-2">{order.paymentType}</span>
                                        </div>
                                    </div>
                                    <Link to={`/orders/${order._id}`} className="ml-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#756AB6" className="w-10 h-10">
                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        :
                        <div className="mx-2 my-4 text-center md:text-lg">
                            Your haven't ordered yet!
                            <br />
                            To view products and categories,   <Link to="/" className="text-blue-500">click here.</Link>
                        </div>
                    :
                    <div className="text-center mt-6">
                        <span className="text-xl">
                            Please <Link to="/auth/login" className="text-blue-700">Login</Link> to continue.
                        </span>
                    </div>
            }
        </>
    )
}

export default Orders;