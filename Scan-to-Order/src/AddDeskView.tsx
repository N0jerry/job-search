// import { useRef } from "react";
import { useInput } from "./hooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddDeskView() {
    var navigate = useNavigate()

    var name = useInput()
    var capacity = useInput()

    function addDesk(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {//这函数是鼠标事件处理器
        e.preventDefault()//阻止事件的默认行为
       
        axios.post('/api/restaurant/1/desk', {
            name: name.value,
            capacity: capacity.value,
        })
        .then(() => {
            // console.log(res.data)
            navigate('/home/desks')//跳转页面
        })

    }

    return (
        <div className="p-2">
            <h1></h1>
            <form>
                <div className="flex gap-2 items-center h-12">
                    <label >名称</label><input className="border rounded p-1" type="text" placeholder="名称" {...name} />
                </div>
                <div className="flex gap-2 items-center h-12">
                    <label >座位数量</label><input className="border rounded p-1" type="text" placeholder="座位数量" {...capacity} />
                </div>
                <div>
                    <button onClick={addDesk}>提交</button>
                </div>
            </form>
        </div>
    )
}