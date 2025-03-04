import { FC, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AppHeader from "./app-header/app-header";
import { useDispatch } from "./../../services/store";
import { userGetInfo, fetchIngredients } from './../../services/thunks/thunks';
import { OnlyAuth, OnlyUnAuth } from "./protected-route.tsx";

import styles from './styles.module.css';

import PageMain from './../../pages/main';
import PageLogin from './../../pages/login';
import PageRegister from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import PageResetPassword from "../../pages/reset-password";
import ProfilePage from "../../pages/profile/profile.tsx";
import Feed from '../../pages/feed/feed.tsx';
import PageUserDetails from '../../pages/user-details.tsx';
import NotFound from '../../pages/notfound.tsx';
import PageIngredientDetails from '../../pages/ingredients.tsx';
import IngredientDetailsModal from '../burger-ingredients/ingredient-details-modal/ingredient-details-modal.tsx';
import OrdersDetailsModal from '../order-info/order-details-modal.tsx';
import FeedProfile from '../profile-orders/profile-orders.tsx';
import OrdersDetails from '../order-info/order-details.tsx';

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(userGetInfo());
  }, [dispatch]);

  let isModal = !!(location.state?.from);
  if (isModal) {
    if (location.state.from.pathname.includes("/profile")) {
      isModal = false;
    }
  }

  const test = isModal ? location.state.from : location
  //console.log(test, isModal)

  return (
    <main className={styles.appcontainer}>
      <AppHeader />
      <div className={styles.contentcontainer}>
        <Routes location={test}>
          <Route path="/login" element={<OnlyUnAuth component={PageLogin} />} />
          <Route path="/feed/:number" element={<OrdersDetails />} />
          <Route path="/ingredients/:id" element={<PageIngredientDetails />} />
          <Route path="/register" element={<OnlyUnAuth component={PageRegister} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={ForgotPasswordPage} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={PageResetPassword} />} />
          <Route path="/" element={<PageMain />} />
          <Route path="/feed" element={<Feed />} />

          <Route path="/profile/*" element={<OnlyAuth component={ProfilePage} />}>
            <Route index element={<PageUserDetails />} />
            <Route path="orders" element={<FeedProfile />} />
            <Route path="orders/:number" element={<OrdersDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

        {isModal && (
          <Routes location={location.state?.from || location}>
            <Route path="/ingredients/:id" element={<IngredientDetailsModal />} />
            <Route path="/feed/:number" element={<OrdersDetailsModal />} />
            <Route path="/profile/orders/:number" element={<OnlyAuth component={OrdersDetailsModal} />} />
          </Routes>
        )}
      </div>
    </main>
  );
};

export default App;