import { useInput } from "./hooks"
import axios from 'axios';
import { useAtom } from "jotai";
import { isLoginAtom  } from "./store";
// import { use } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    var name = useInput('')//name变量里已经有onChange了
    var password = useInput('')
    var captcha = useInput('')
    var [isLogin,setIsLogin] = useAtom(isLoginAtom)
    var navigate = useNavigate()//跳转

    async function login() {
        // debugger;
        try {
            var res =await axios.post('/api/login',{//发送post请求
                name: name.value,
                password: password.value,
                captcha: captcha.value,
            })
            setIsLogin(true)//保存登录成功的状态
            navigate('/home')//登录成功,跳转到home页面
        } catch(e: any) {//e这里可以是各种错误类型
            if (e.isAxiosError) {
                alert('登录失败:' + e.response?.data.msg)//只有e.response存在才调用data.msg,防止报错
            } else {
                throw e
            }
            // console.error('请求失败:', e);

        }
    
        
    }
    if (isLogin) {
        return <div>已登录,去<Link to="/home">管理页面</Link></div>
    }

    return <div>
        <div className="h-12 m-2 items-center flex">
            <label className="flex gap-2">
                <span className="w-12 inline-block text-right">用户名</span>
                <input type="text" name="name" {...name}/>
            </label>
        </div>
        <div className="h-12 m-2 items-center flex">
            <label className="flex gap-2">
                <span className="w-12 inline-block text-right">密码</span>
                <input type="password" name="password" {...password}/>
            </label>
        </div>
        <div className="h-12 m-2 items-center flex">
            <label className="flex gap-2">
                <span className="w-12 inline-block text-right">验证码</span>
                <input type="text" name="captcha" {...captcha}/>                
            </label>
            <img className="bg-white h-8" src="/api/captcha" onClick={(e) => {
                var img = e.target as HTMLImageElement
                img.src = `/api/captcha?t=${new Date().getTime()}`;
                }} alt="验证码" />
        </div>
        <div className="h-12 m-2 items-center flex">
            <button className="ml-14" onClick={login}>登录</button>
        </div>
    </div>
}