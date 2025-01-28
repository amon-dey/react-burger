import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./app-header/app-header";

import styles from './styles.module.css'

import PageMain from './../../pages/main'
import PageLogin from './../../pages/login'
import PageRegister from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import PageResetPassword from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";

const App: FC = () => {
  return (
    <main className={styles.appcontainer}>
      <Router>
        <AppHeader />
        <div className={styles.contentcontainer}>
          <Routes>
            <Route path="/" element={<PageMain />} />
            <Route path="/login" element={<PageLogin />} />
            <Route path="/register" element={<PageRegister />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<PageResetPassword />} />
            <Route path="/profile" element={<ProfilePage />} >
            {/* </Route><Route path="/ingredients/:id" element={< />} > */}
            </Route>
          </Routes>
        </div>
      </Router>
    </main>
  );

};

export default App;