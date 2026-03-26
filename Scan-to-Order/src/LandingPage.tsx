import { useState } from "react";
import { clsx } from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import axios from "axios";
import { useAtom } from "jotai";
import { deskInfoAtom } from "./store";
import { useDarkMode } from "./hooks";
import { Checkbox } from "antd-mobile";

function getDeskInfo(deskId: number | string) {
    return axios.get('/api/deskinfo?did=' + deskId)
        .then(res => {
            return res.data
        })

}

function LandingPage() {
    const [isDark, toggleDarkMode ] = useDarkMode()
    const [customCount, setCustomCount] = useState(0)
    const navigate = useNavigate()
    const params = useParams()//useParams 是 React Router（v6+）提供的一个 Hook，用于获取当前路由中的动态参数（即 URL 路径中用 :param 定义的部分）。它在处理动态路由（如详情页、用户页等需要根据 ID 展示不同内容的场景）时非常常用。
    console.log(params)
    // const [ ,setDeskInfo] = useAtom(deskInfoAtom)
    

    var { data: deskInfo, loading} = useRequest(getDeskInfo, {//data是响应体,Loading是数据有没有到达的状态
        defaultParams: [params.deskId!],//
        // onSuccess(data) {
        //     setDeskInfo(data)
        // }
    })
    function start() {
        navigate(`/r/${params.restaurantId}/d/${params.deskId}?c=` + customCount)//c是就餐人数

    }
    return (
        <div>
            {/* <h1>{loading ? '餐厅:桌号...' : data.title + ':' + data.name }</h1> */}
            <h1 className="text-xl flex justify-between items-center border-b p-4 top-0 dark:bg-slate-600">
                {deskInfo?.title} - {deskInfo?.name}
                <Checkbox checked={ isDark } onChange={toggleDarkMode}>深色模式</Checkbox>
                </h1>
            <div className="mt-8 gap-2 grid grid-cols-5 justify-center">
                {
                    new Array(12).fill(0).map((_, idx) => {
                        return <div 
                        key={idx} 
                        className={clsx(
                            "[&.active]:border-red-500 m-auto [&.active]:text-red-500 w-8 h-8 flex justify-center rounded border",
                            {active: customCount == idx + 1})}
                            onClick={() => setCustomCount(idx + 1)}>
                            {idx + 1}
                        </div>
                    })
                }
            </div>
            <button className="block m-auto mt-8 disabled:bg-slate-200 bg-slate-400 dark:bg-slate-700 " disabled={customCount == 0} onClick={start}>开始点餐</button>
        </div>
    )
}
export default LandingPage