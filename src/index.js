import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DropDown from './components/DropDown';
import LoadingSpinner from './components/LoadingSpinner';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="exam" element={<App />} />
        </Routes>
      </BrowserRouter>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
