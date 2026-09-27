import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./context/cartcontext.jsx";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./login";
import Register from "./registration.jsx";
import MyCart from "./pages/mycart.jsx";
import Checkout from "./pages/checkout.jsx";
import OrderHistory from "./pages/orderhistory.jsx";
import AdminRoute from "./adminroute.jsx";
import AdminDashboard from "./admin/admindashboard.jsx";
import AdminOrders from "./admin/adminorders.jsx";
import AdminProducts from "./admin/adminproduct.jsx";
import CustomerLayout from "./components/customerlayout";


createRoot(document.getElementById("root")).render(
  <StrictMode>

    <BrowserRouter>

     <CartProvider>
    <Routes>

  {/* ================= AUTH ================= */}

  <Route
    path="/"
    element={<Login />}
  />

  <Route
    path="/register"
    element={<Register />}
  />


  {/* ================= CUSTOMER ================= */}

  <Route element={<CustomerLayout />}>

    <Route
      path="/main"
      element={<App />}
    />

    <Route
      path="/cart"
      element={<MyCart />}
    />

    <Route
      path="/checkout"
      element={<Checkout />}
    />

    <Route
      path="/orders"
      element={<OrderHistory />}
    />

  </Route>


  {/* ================= ADMIN ================= */}

  <Route
    path="/admin"
    element={
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/orders"
    element={
      <AdminRoute>
        <AdminOrders />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/products"
    element={
      <AdminRoute>
        <AdminProducts />
      </AdminRoute>
    }
  />

</Routes>
</CartProvider>


    </BrowserRouter>

  </StrictMode>
);