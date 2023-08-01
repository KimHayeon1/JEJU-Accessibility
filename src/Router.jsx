import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order";

import BeforeLogin from "./pages-before/Login";
import BeforeHome from "./pages-before/Home";
import BeforeProduct from "./pages-before/Product";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />

        {/* before */}
        <Route path="/before" element={<BeforeHome />} />
        <Route path="/beforelogin" element={<BeforeLogin />} />
        <Route path="/beforeproducts/:id" element={<BeforeProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
