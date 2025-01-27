import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./app-header/app-header";

import PageMain from './../../pages/main'

const App: FC = () => {
  return (
    <>
      <Router>
        <AppHeader />
          <Routes>
            <Route path="/" element={<PageMain />} />
          </Routes>
      </Router>
    </>
  );

};

export default App;