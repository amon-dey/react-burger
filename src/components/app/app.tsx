import { FC, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AppHeader from "./app-header/app-header";
import { useDispatch } from "./../../services/store"
import { userGetInfo } from './../../services/thunks/thunks'
import { OnlyAuth, OnlyUnAuth } from "./protected-route.tsx";
import { fetchIngredients } from "../../services/thunks/thunks";

import styles from './styles.module.css'

import PageMain from './../../pages/main'
import PageLogin from './../../pages/login'
import PageRegister from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import PageResetPassword from "../../pages/reset-password";
import ProfilePage from "../../pages/profile/profile.tsx";
import Feed from '../../pages/feed/feed.tsx'
import PageUserDetails from '../../pages/user-details.tsx'
import OrderDetails from '../../pages/order-details.tsx'
import NotFound from '../../pages/notfound.tsx'
import PageIngredientDetails from '../../pages/ingredients.tsx'
import IngredientDetailsModal from '../burger-ingredients/ingredient-details-modal/ingredient-details-modal.tsx'
import OrderInfoModal from '../order-info/order-info-modal.tsx'
import ProfileOrdersFeed from '../profile-orders/profile-orders.tsx'
import OrderInfo from './../order-info/order-info'

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(userGetInfo());
  }, [dispatch]);

  return (
    <main className={styles.appcontainer}>
      <AppHeader />
      <div className={styles.contentcontainer}>
        <Routes>
          <Route path="/" element={<PageMain />} />
          <Route path="/feed" element={<Feed />}></Route>
          <Route path="/feed/:number" element={<OrderInfo />} />
          <Route path="/login" element={<OnlyUnAuth component={<PageLogin />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<PageRegister />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<PageResetPassword />} />} />
          <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} >
            <Route path="/profile/" element={<PageUserDetails />} />
            <Route path="/profile/orders" element={<ProfileOrdersFeed />} />
            <Route path="/profile/orders/:number" element={<OrderDetails />} />
          </Route>
          <Route path="/ingredients/:id" element={<PageIngredientDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {
          location.state && location.state.from && (
            <Routes>
              <Route path="/ingredients/:id" element={<IngredientDetailsModal />} />
              <Route path="/feed/:number" element={<OrderInfoModal />} />
            </Routes>
          )
        }
      </div>
    </main>
  );

};

export default App;