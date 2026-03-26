import { Suspense, useEffect, useState } from "react";
import { NavLink as Link,Outlet, useNavigate } from "react-router-dom";//NavLink会自动添加active类名
// import './main.css';
import './index.css';
import { useAtom } from 'jotai';
import { isLoginAtom, userInfoAtom } from './store'
import axios from "axios";
import { useDarkMode } from "./hooks";


type RestaurantInfo ={
    id: string,
    name: string,
    title: string,
}
export default function HomeView() {
    var [isLogin, setIsLogin] = useAtom(isLoginAtom)
    const navigate = useNavigate();//跳转路径
    var [userInfo, setUserInfo] = useAtom(userInfoAtom)//<null | any>要求useState的返回值要么null要么any

    useEffect(() => {//这个副作用只执行一下
       axios.get('/api/userinfo').then(res => {//读取Cookies
            setUserInfo(res.data)

        })
        console.log(userInfo)

    },[]) 


    useEffect(() => {
        if (isLogin == false) {
            navigate('/login')
        }
    }, [isLogin])//当isLogin变化后,执行回调

    async function logout() {
        await axios.get('/api/logout')
        setIsLogin(false)
        navigate('/')
    }



    var [,,darkModeEl] = useDarkMode()

    if (isLogin == false) {
        return null
    }
    return (
        <div className="h-full flex flex-col overflow-auto">
        <h1 className="border-b shrink-0 p-2 justify-between flex items-center">
            <span>{userInfo?.title}</span>
            {darkModeEl}
            <button onClick={logout}>退出</button>
        </h1>
        <div className="flex grow overflow-auto">
            <div className="xw-24 border-r shrink-0">
                
                <Link className="dark:[&.active]:bg-slate-700 [&.active]:bg-slate-200  block" to="/home/orders">订单管理</Link>
                <Link className="dark:[&.active]:bg-slate-700 [&.active]:bg-slate-200  block" to="/home/foods">菜品管理</Link>
                <Link className="dark:[&.active]:bg-slate-700 [&.active]:bg-slate-200  block" to="/home/desks">桌面管理</Link>
                
            </div>
            <div className="overflow-auto grow">
            <Suspense fallback={'Loading...'} >
              <Outlet />
            </Suspense>
            </div>
        </div>
        </div>
    )
}