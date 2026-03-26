import { useInput } from "./hooks"
import axios from 'axios';
import { useAtom } from "jotai";
import { isLoginAtom  } from "./store";
// import { use } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    var name = useInput('')//name变量里已经有onChange了
    var password = useInput('')
    var email = useInput('')
    var title = useInput('')
    // var [isLogin,setIsLogin] = useAtom(isLoginAtom)
    var navigate = useNavigate()//跳转

    async function login() {
        // debugger;
        try {
            await axios.post('/api/register',{//发送post请求
                name: name.value,
                password: password.value,
                email: email.value,
                title: title.value,
            })
            
            navigate('/')//注册成功,跳转到home页面
        } catch(e: any) {//e这里可以是各种错误类型
            if (e.isAxiosError) {
                alert('登录失败:' + e.response?.data.msg)//只有e.response存在才调用data.msg,防止报错
            } else {
                throw e
            }
            // console.error('请求失败:', e);

        }
    
        
    }
    

    return <div>
        <div className="h-12 m-2 items-center flex">
            <label className="flex gap-2">
                <span className="w-12 inline-block text-right">用户名</span>
                <input className="border" type="text" name="name" {...name}/>
            </label>
        </div>
        <div className="h-12 m-2 items-center flex">
            <label className="flex gap-2">
                <span className="w-12 inline-block text-right">密码</span>
                <input className="border" type="password" name="password" {...password}/>
            </label>
        </div>
        <div className="h-12 m-2 items-center flex">
            <label className="flex gap-2">
                <span className="w-12 inline-block text-right">电子邮箱</span>
                <input className="border" type="text" name="email" {...email}/>                
            </label>           
        </div>
         <div className="h-12 m-2 items-center flex">
            <label className="flex gap-2">
                <span className="w-12 inline-block text-right">餐厅名称</span>
                <input className="border" type="text" name="email" {...title}/>                
            </label>           
        </div>
        <div className="h-12 m-2 items-center flex">
            <button className="ml-14" onClick={login}>注册</button>
        </div>
    </div>
}