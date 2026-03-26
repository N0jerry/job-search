import { Link } from "react-router-dom";
import React from 'react';


export default function IndexView() {
    return <div>
        <Link to="/login">登录</Link>
        |
        <Link to="/register">注册</Link>
    </div>
}