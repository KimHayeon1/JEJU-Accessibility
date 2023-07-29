import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';

import BeforeLogin from './pages-before/Login';
import BeforeHome from './pages-before/Home';
import BeforeHome2 from './pages-before/Home2';
import BeforeHome3 from './pages-before/Home3';
import BeforeProduct from './pages-before/Product';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />

        {/* before */}
        <Route path='/before' element={<BeforeHome />} />
        <Route path='/before2' element={<BeforeHome2 />} />
        <Route path='/before3' element={<BeforeHome3 />} />
        <Route path='/beforelogin' element={<BeforeLogin />} />
        <Route path='/beforeproducts/:id' element={<BeforeProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
