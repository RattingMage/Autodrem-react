import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Provider} from "react-redux";

import store from "./store";

import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";



const App = () => {
  return (
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>
        </Router>
      </Provider>
  );
};

export default App;
