import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import Login from "./Login";
import Signup from "./Register";
import Navbar from "./Navbar";
import Order from "./Order";
import Gift from "./Gift";
import Menu from "./Menu";
import Item from "./Item";
import ChangePassword from "./Changepassword";
import OrderSuccess from "./OrderSuccess";
import Checkout from "./Checkout";
import 'bootstrap/dist/css/bootstrap.min.css';

// 🔹 AppContent handles token, navbar, and routes
const AppContent = ({ username, setUsername }) => {
  const [token, setToken] = useState("");
  const location = useLocation();

  // 🔹 Hide Navbar on login/register page
  const hideNavbar = ["/login", "/register","/changepassword","/checkout"].includes(location.pathname);

  // 🔹 Load token & email from localStorage on mount
  useEffect(() => {
  const storedToken = localStorage.getItem("token");
  const storedUsername = localStorage.getItem("username"); // ✅ સેટ કરેલું username લાવો

  if (storedToken) {
    setToken(storedToken);
  }

  if (storedUsername) {
    setUsername(storedUsername); // ✅ હવે email નહીં, ફક્ત username બતાવો
  }
}, [setUsername]);

  return (
    <>
      {/* 🔹 Conditional Navbar */}
      {!hideNavbar && <Navbar username={username} setUsername={setUsername} />}

      {/* 🔹 Routes */}
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/home" element={<Home token={token} />} />
        <Route path="/gift" element={<Gift token={token} />} />
        <Route path="/menu" element={<Menu token={token} />} />
        <Route path="/cart" element={<Cart token={token} />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/orders" element={<Order token={token} />} />
        <Route path="/items" element={<Item token={token} />} />
        <Route
          path="/order-success"
          element={
            <OrderSuccess
              message="Order Successfully. Please Wait..."
              redirectUrl="/orders"
              seconds={3}
            />
          }
        />
      </Routes>
    </>
  );
};

// 🔹 Main App
const App = () => {
  const [username, setUsername] = useState("");

  return (
    <Router>
      <AppContent username={username} setUsername={setUsername} />
    </Router>
  );
};

export default App;
