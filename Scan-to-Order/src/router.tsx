import {createBrowserRouter, redirect, createHashRouter } from "react-router-dom";


import IndexView from './IndexView.tsx';
import Login from "./Login.tsx";
import HomeView from "./HomeView.tsx";
import { lazy } from 'react';
import LandingPage from './LandingPage.tsx';
import OrderFoodPage from './OrderFoodPage.tsx';
import Register from "./Register.tsx";

//栏加载组件
var OrderManageView = lazy(() => import('./OrderManageView.tsx'))//懒加载组件
var FoodManageView = lazy(() => import('./FoodManageView.tsx'))
var DeskManageView = lazy(() => import('./DeskManageView.tsx'))
var AddFoodView = lazy(() => import('./AddFoodView.tsx'))
var AddDeskView = lazy(() => import('./AddDeskView.tsx'))

const router = createHashRouter([//一定要换成createHashRouter
    {
        path: "/",
        element: <IndexView />,
    },
    {
        path: '/home',
        element:<HomeView />,
        children: [
            {
                path:'',
                // element: <div></div>,
                loader:  () => { redirect("/home/orders")}
            },
            {
                path: 'orders',
                element: <OrderManageView  />,
            },
            {
                path: 'foods',
                element: <FoodManageView />,
            },
            {
                path: 'add-food',
                element: <AddFoodView />,

            },
            {
                path: 'desks',
                element: <DeskManageView />,
            },
            {
                path: 'add-desk',
                element: <AddDeskView />,
            },
        ]


    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    //实际app中,管理员界面和用户界面是在两个app,以下是用户
    {
        path: '/landing/r/:restaurantId/d/:deskId',
        element: <LandingPage />
    },
    {
        path: '/r/:restaurantId/d/:deskId',
        element: <OrderFoodPage />
    },
    {
        path: '/place-order-success',
        element: <div>下单成功</div>
    },
    {//没有配置的路由
        path: '*',
        element: <div>404 Not found</div>
    }
])
export default router