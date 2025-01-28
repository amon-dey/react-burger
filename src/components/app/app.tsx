import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AppHeader from "./app-header/app-header";
import { useDispatch } from "./../../services/store"
import { userGetInfo } from './../../services/thunks/thunks'
import { OnlyAuth, OnlyUnAuth } from "./protected-route.tsx";

import styles from './styles.module.css'

import PageMain from './../../pages/main'
import PageLogin from './../../pages/login'
import PageRegister from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import PageResetPassword from "../../pages/reset-password";
import ProfilePage from "../../pages/profile/profile.tsx";
import Orders from '../../pages/ordres.tsx'
import PageUserDetails from '../../pages/user-details.tsx'

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userGetInfo());
  }, [dispatch]);

  return (
    <main className={styles.appcontainer}>
      <AppHeader />
      <div className={styles.contentcontainer}>
        <Routes>
          <Route path="/" element={<PageMain />} />
          <Route path="/login" element={<OnlyUnAuth component={<PageLogin />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<PageRegister />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<PageResetPassword />} />} />
          <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} >
            <Route path="/profile/" element={<PageUserDetails />} />
            <Route path="/profile/orders" element={<Orders />} />
          </Route>
          {/* </Route><Route path="/ingredients/:id" element={< />} > */}
        </Routes>
      </div>
    </main>
  );

};

export default App;