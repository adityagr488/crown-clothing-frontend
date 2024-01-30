import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from "./routes/home/home.route";
import Authentication from './routes/authentication/authentication.route';
import Navigation from './routes/navigation/navigation.route';
import Checkout from './routes/checkout/checkout.route';

import CategoryView from "./components/category-view/category-view.component";
import { fetchCartItemsAsync } from "./store/cart/cart.slice";
import { ActionDispatch } from "./store/store";
import { checkUserSessionAsync } from "./store/user/user.slice";
import { selectCurrentUserDetails, selectUserSessionError } from "./store/user/user.selector";
import Orders from "./routes/orders/orders.route";
import Profile from "./routes/profile/profile.route";
import OrderItems from "./components/order-items/OrderItems.component";
import { fetchOrdersAsync } from "./store/orders/order.slice";
import Payment from "./routes/payment/payment.route";


const App = () => {

  const dispatch = useDispatch<ActionDispatch>();
  const currentUser = useSelector(selectCurrentUserDetails);
  const sessionError = useSelector(selectUserSessionError);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      dispatch(checkUserSessionAsync());
    }
    if (sessionError) {
      navigate("/auth/login");
    }
    if (currentUser) {
      dispatch(fetchCartItemsAsync());
      dispatch(fetchOrdersAsync());
    }
  }, [currentUser, sessionError]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path=":category" element={<CategoryView />} />
        <Route path="auth/*" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:order_id" element={<OrderItems />} />
        <Route path="profile" element={<Profile />} />
        <Route path="payment" element={<Payment />} />
      </Route>
    </Routes>
  );
};

export default App;
