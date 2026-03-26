import { useRef } from "react";
import { useInput } from "./hooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userInfoAtom } from "./store";

export default function AddFoodView() {
    var imgInputRef = useRef<HTMLInputElement | null>(null)//useRef需要一个初始值,可以是null
    var navigate = useNavigate()
    var name = useInput()
    var price = useInput()
    var desc = useInput()
    var category = useInput()

    function addFood(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {//这函数是鼠标事件处理器
        var [userInfo] = useAtom(userInfoAtom)
        e.preventDefault()//阻止事件的默认行为
        var fd = new FormData()
        fd.append('name', name.value)
        fd.append('price', price.value)
        fd.append('desc', desc.value)
        fd.append('category', category.value)
        fd.append('status', 'on')
        fd.append('img', imgInputRef.current!.files![0])

        axios.post(`/api/restaurant/${userInfo!.id}/food`, fd)
        .then(res => {
            // console.log(res.data)
            navigate('/home/foods')//跳转页面
        })

    }

    return (
        <div >
            <form action="">
                <div className="">
                    <input type="text" placeholder="名称" {...name}/>
                </div>
                 <div className="">
                    <input type="text" placeholder="价格" {...price}/>
                </div>
                 <div className="">
                    <input type="text" placeholder="描述" {...desc}/>
                </div>
                 <div className="">
                    <input type="text" placeholder="分类" {...category}/>
                </div>
                <div className="">
                    <input type="file" placeholder="图片" ref={imgInputRef}/>
                </div>
                <div>
                    <button onClick={addFood}>提交</button>
                </div>
            </form>
        </div>
    )
}