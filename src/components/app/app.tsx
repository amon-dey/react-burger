import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./app-header/app-header";

import styles from './styles.module.css'

import PageMain from './../../pages/main'
import PageLogin from './../../pages/login'

const App: FC = () => {
  return (
    <main className={styles.appcontainer}>
      <Router>
        <AppHeader />
        <div className={styles.contentcontainer}>
          <Routes>
            <Route path="/" element={<PageMain />} />
            <Route path="/login" element={<PageLogin />} />
          </Routes>
        </div>
      </Router>
    </main>
  );

};

export default App;