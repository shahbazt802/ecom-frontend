/** @format */

import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productListRedusers,
	productDetailsRedusers,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
	userLoginRedusers,
	userRegisterRedusers,
} from "./reducers/userReducers";

const reducers = combineReducers({
	productList: productListRedusers,
	productDetails: productDetailsRedusers,
	cart: cartReducer,
	userLogin: userLoginRedusers,
	userRegister: userRegisterRedusers,
});
const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const initialState = {
	cart: { cartItems: cartItemsFromStorage },
	userLogin: { userInfo: userInfoFromStorage },
};
const middleWare = [thunk];
const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
