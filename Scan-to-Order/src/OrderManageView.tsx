import axios from "axios"
import { useEffect, useMemo, useRef, useState } from "react"
// import { useImmer } from "use-immer"
import { printOrder } from './utils'
import { makeAutoObservable, observable } from "mobx"
import { observer } from "mobx-react"
import type { Order } from './type'
import { io } from 'socket.io-client'
import { notification } from 'antd'
import React from "react"
import { userInfoAtom } from "./store"
import { useAtom } from "jotai"




// export type Food = {    
//         id: number,
//         rid: number,
//         name: string,
//         desc: string,
//         price: number,
//         img: string,
//         category: string,
//         status: 'on' | 'off',
// }

// export type Order = {
//     id: number,
//     rid:number,
//     did:number,
//     deskName:string,
//     customCount: number,
//     status:'pending' | 'confirmed' | 'completed',
//     timestamp: string,
//     totalPrice: number,
//     details: {
//     food: Food,
//     amount: number
// }[],
// }

class OrderManager {
    orders: Order[] = []
    constructor() {
        makeAutoObservable(this)
    }
    deleteOrder(idx: number) {
        this.orders.splice(idx, 1)
    }
    changeOrdersStatus(idx: number, status: Order["status"]) {//Order["status"]访问类型
        this.orders[idx].status = status
    }
    addOrders(...orders: Order[]) {
        this.orders.push(...orders)
    }
}

const Context = React.createContext({ name: 'Default'})

function OrderManageView() {
    // debugger;
    // console.log('是否运行两遍');
    // var [orders, updateOrders] = useImmer<Order[]>([])
    var [manager] = useState(() => new OrderManager())
    var [userInfo] = useAtom(userInfoAtom)
    var music = useRef<HTMLAudioElement | null>(null)
    var [api, contextHolder] = notification.useNotification()


    useEffect(() => {//这个代码在开发模式下会运行两次
        //在这里实现自动刷新功能
        var ignore = false;
        console.log('是否运行两遍');
        axios.get(`/api/restaurant/${userInfo!.id}/order`)
            .then(res => {
                // updateOrders(orders => {
                //     if (!ignore) {
                //         return [...orders, ...res.data]
                //     }
                //     // orders.push(...res.data)
                // })
                if (!ignore) {
                    manager.addOrders(...res.data)
                }
            })
        return () => {
            ignore = true
        }
    }, [])
    //使用socket.io-client监听
    useEffect(() => {
        var client = io(`ws://${location.host}`, {
            path: '/restaurant',
            transports: ['websocket', 'polling',],//让浏览器的连接升级到webSocket;polling等待反应的期间,保持连接
            query: {
                restaurant: 'restaurant:1'
            }
        })
        client.on('new order', (newOrder) => {//监听new order事件
            console.log('有新的订单', newOrder)
            music.current!.play()//添加提示音


            manager.orders.unshift(newOrder)//不用刷新,也即时更新
            api.info({
                duration: null,//使弹窗提示需要手动关闭
                message: '有新的订单',
                description: <Context.Consumer>{({name}) => `Hello, ${name}!`}</Context.Consumer>
            })
        })
        return () => {
            client.close()//组件卸载后关闭io

        }

    }, [])


    async function deleteOrder(idx: number) {
        var order = manager.orders[idx]
        await axios.delete(`/api/restaurant/${userInfo!.id}/order/${order.id}`)
        // updateOrders(orders => {
        manager.deleteOrder(idx)
        // })

    }
    async function confirmOrder(idx: number) {
        var order = manager.orders[idx]
        await axios.put(`/api/restaurant/${userInfo!.id}/order/${order.id}/status`, {
            status: 'confrirmed'
        })
        manager.changeOrdersStatus(idx, 'confirmed')
        // order.status = 'confrirmed'
    }
    async function completeOrder(idx: number) {
        var order = manager.orders[idx]
        await axios.put(`/api/restaurant/${userInfo!.id}/order/${order.id}/status`, {
            status: 'completed'
        })
        manager.changeOrdersStatus(idx, 'completed')
    }
     
    const contextValue = useMemo(() => ({ name: 'Ant Design'}), [])
    return (//弹窗组件在contextHolde里渲染
    <Context.Provider value={contextValue}>
        {contextHolder}
        <div className="h-full flex flex-col grow p-2">
            <audio src="xxx.mp3" ref={music}></audio>
            <h1 className="text-lg font-bold">订单管理界面</h1>

            <ul  className="space-y-2 mt-2">
                {
                    manager.orders.map((order, idx) => {
                        return (
                            <li className='border flex rounded' key={order.id}>
                                <div className="space-y-2 mt-2">
                                    <div>id: {order.id}</div>
                                    <div>座号: {order.deskName} </div>
                                    <div>人数: {order.customCount} </div>
                                    <div>状态: {order.status == 'pending' ? '待确认' : order.status == 'confirmed' ? '已确认' : '已完成'}</div>
                                    <div className="truncate">时间: {order.timestamp}</div>
                                    <div>
                                        <button onClick={() => printOrder(order)}>打印</button>
                                        {

                                            order.status === 'pending' &&
                                            <button onClick={() => confirmOrder(idx)}>确认</button>
                                        }
                                        {
                                            order.status === 'confirmed' &&
                                            <button onClick={() => completeOrder(idx)}>完成</button>
                                        }
                                        <button onClick={() => deleteOrder(idx)}>删除</button>
                                    </div>
                                </div>

                                <div>
                                    {

                                        <>
                                            <ul key={idx} className="flex gap-8">
                                                <li>菜名: {
                                                    order.details.map((item) => {
                                                        return <div>{item.food.name}</div>
                                                    })}
                                                </li>
                                                <li>数量: {
                                                    order.details.map((item) => {
                                                        return <div>{item.amount}</div>
                                                    })}
                                                </li>
                                                <li>价格: {
                                                    order.details.map((item) => {
                                                        return <div>{item.food.price * item.amount}</div>
                                                    })}
                                                </li>
                                            </ul>


                                            <div>总价:{order.totalPrice}</div>
                                        </>
                                    }

                                </div>

                            </li>
                        )
                    })
                }
            </ul>
        </div>
    </Context.Provider>
    )
}

export default observer(OrderManageView)//使用mobx,需要用observer包住组件