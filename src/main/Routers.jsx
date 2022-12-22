import React from 'react';
import { Routes, Route } from "react-router";

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import ProductCrud from '../components/user/ProductCrud';
export default props =>
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/users' element={<UserCrud />} />
        <Route path='/products' element={<ProductCrud />} />
        <Route path='*' element={<Home />} />
    </Routes>