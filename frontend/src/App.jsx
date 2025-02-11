import React from 'react';
import { Routes, Route } from "react-router-dom";
// import PublicRoute from './components/PublicRoute';
import Signup from './pages/SignUp';

const App = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
};

export default App;
