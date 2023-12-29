import { configureStore } from "@reduxjs/toolkit";
import products from './productSlice'
import cart from "./cartSlice";
import wishlist from './wishlistSlice'

const store = configureStore({reducer:{products, cart, wishlist}});

export default store;