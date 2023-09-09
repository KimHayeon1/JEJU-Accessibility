import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';

import BeforeLogin from './beforePages/Login';
import BeforeHome1 from './beforePages/Home1';
import BeforeHomeFocus from './beforePages/HomeFocus';
import BeforeHome2 from './beforePages/Home2';
import BeforeHome3 from './beforePages/Home3';
import BeforeHomeAutoLive from './beforePages/HomeAutoLive';
import BeforeHomeStop from './beforePages/HomeStop';
import BeforeProduct from './beforePages/Product';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />

        {/* before */}
        <Route path='/before' element={<BeforeHome1 />} />
        <Route path='/before2' element={<BeforeHome2 />} />
        <Route path='/beforefocus' element={<BeforeHomeFocus />} />
        <Route path='/before3' element={<BeforeHome3 />} />
        <Route path='/beforeauto' element={<BeforeHomeAutoLive />} />
        <Route path='/beforestop' element={<BeforeHomeStop />} />
        <Route path='/beforelogin' element={<BeforeLogin />} />
        <Route path='/beforeproducts/:id' element={<BeforeProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
