import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import Address from "../pages/Address";
import MyOrders from "../pages/MyOrders";
import CategoryPage from "../pages/CategoryPage";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermission from "../layouts/AdminPermission";
import SubCategoryPage from "../pages/SubCategoryPage";
import ProductList from "../pages/ProductList";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import DisplayCartItem from "../components/DisplayCartItem";
import CheckoutPage from "../pages/CheckoutPage";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "search",
                element: <SearchPage />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "verification-otp",
                element: <OtpVerification />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            },
            {
                path: "user",
                element: <UserMenuMobile />
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />
                    },
                    {
                        path: "address",
                        element: <Address />
                    },
                    {
                        path: "myorders",
                        element: <MyOrders />
                    },
                    {
                        path: "category",
                        element: <AdminPermission><CategoryPage /></AdminPermission>
                    },
                    {
                        path: "subCategory",
                        element:
                            <AdminPermission>
                             <SubCategoryPage />
                            </AdminPermission> 
                    },
                    {
                        path: "upload-product",
                        element: 
                        <AdminPermission>
                            <UploadProduct />
                        </AdminPermission>
                    },
                    {
                        path: "product",
                        element:
                        <AdminPermission>
                            <ProductAdmin />
                        </AdminPermission> 
                    }
                ]
            },
            {
                path: ":category",
                children : [
                    {
                        path: ":subcategory",
                        element : <ProductList />
                    }
                ]
            },
            {
                path : "product/:product",
                element : <ProductDisplayPage/>
            },
            {
                path : "cart",
                element : <DisplayCartItem />
            },
            {
                path : "checkout",
                element : <CheckoutPage/>
            }
        ]
    }
])

export default router