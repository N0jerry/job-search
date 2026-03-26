import { useRequest, useThrottleFn, useToggle } from "ahooks"
import axios from "axios"
// import { use, useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useImmer } from "use-immer"
import type { Food } from "./type.ts"
// import { deskInfoAtom } from "./store"
// import { useAtom } from "jotai"
import { useEffect, useMemo, useRef, useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react"
import { io } from "socket.io-client"
import { SideBar, Checkbox, Stepper, Footer, Skeleton, Modal } from "antd-mobile"
import _, { divide } from 'lodash'
import { useDarkMode } from "./hooks.tsx"



function getMenu(id: string | number): Promise<Food[]> {
    return axios.get('/api/menu/restaurant/' + id)
        .then(res => {
            return res.data
        })
}
// function getDeskInfo(deskId: string | number): Promise<{name: string, title: string}> {
//     return axios.get()
// }
function getDeskInfo(deskId: number | string) {
    return axios.get('/api/deskinfo?did=' + deskId)
        .then(res => {
            return res.data
        })

}
function OrderFoodPage() {
    var navigate = useNavigate()
    var params = useParams()
    var [query] = useSearchParams()
    // console.log(params, query)
    //每个菜的份数
    var [foodCount, updateFoodCount] = useImmer<number[]>([])// useState 和 Immer 库的自定义 Hook，它让我们可以用 "直接修改" 的方式来更新状态，而实际上 Immer 会帮我们处理不可变数据的更新，大大简化了复杂状态的管理。
    var [foodSelected, updateFoodSelected] = useImmer<boolean[]>([])
    //data即餐厅菜单,是一个数组,元素为对象
    var { data: menu, loading } = useRequest(getMenu, {
        defaultParams: [params.restaurantId!],//这个属性会传给getMenu,所以属性值类型受getMenu约束
        //defaultData: [], // 设置默认空数组，避免 undefined
        onSuccess: (data) => {
            updateFoodCount(foodCount => {
                foodCount.push(...Array(data.length).fill(0))
                updateFoodSelected(foodSelected => {
                    foodSelected.push(...Array(data.length).fill(true))
                })
            })

        }
    })
    // var {data:menu, loading } = useRequest(getMenu, {

    // })
    var { data: deskInfo, loading } = useRequest(getDeskInfo, {//data是响应体,Loading是数据有没有到达的状态
        defaultParams: [params.deskId!],//

    })
    ///////
    // const [deskInfo ] = useAtom(deskInfoAtom)

    const [expand, { toggle }] = useToggle(false)
    //告知用户库存情况
    var clientRef = useRef<any>(null)
    useEffect(() => {
        if (menu) {//只在menu非空时运行,即等拿到菜单才建立连接

            // ws:// 表示未加密的 WebSocket 连接（wss:// 表示加密的 WebSocket 连接）。
            clientRef.current = io(`ws://${location.host}`, {//location.host 指的是当前页面的主机名和端口，例如 localhost:3000
                path: '/desk',//
                transports: ['websocket', 'polling'],
                /*transports: ['websocket', 'polling'] 是 Socket.io 客户端的传输协议配置项，用于指定实时通信时优先使用的传输方式及降级策略
                优先尝试 WebSocket 通信：如果当前环境（浏览器、网络）支持 WebSocket，就用它进行实时通信，保证性能和实时性。
自动降级到 Polling：如果 WebSocket 连接失败（比如服务器不支持、网络限制等），则自动切换为 Polling 方式继续通信，确保在各种环境下的兼容性。*/
                query: {//
                    desk: 'desk:' + params.deskId// 允许你将查询参数附加到 WebSocket 连接的 URL 上。 在这个例子中，它传递了一个名为 desk 的查询参数，其值为 'desk:' + params.deskId
                }
            })
            //连接成功后触发,同步这桌所有客户端的购物车的菜品状态

            clientRef.current.on('cart food', (data: { amount: number, desk: string, food: Food }[]) => {
                // console.log('初始已点菜品')
                for (let info of data) {//更新数据
                    let id = info.food.id
                    let idx = menu!.findIndex(it => it.id == id)
                    updateFoodCount(foodCount => {//updateFoodCount里如果使用了用var声明的变量,他可能会是异步更新的
                        foodCount[idx] = info.amount
                    })
                }
            })
            //实时同步此桌所有客户端的点菜状态
            clientRef.current.on('new food', (info: { amount: number, desk: string, food: Food }) => {//info信息
                // console.log(orders)
                var fooId = info.food.id
                var idx = menu!.findIndex(it => it.id == fooId)
                if (idx >= 0) {
                    updateFoodCount(foodCount => {
                        foodCount[idx] = info.amount//赋值操作.外层要包updateFoodCount,setFoodCount (或 updateFoodCount)  是状态更新函数：

                    })
                }

            })
            //此桌已被其他用户下单时触发
            clientRef.current.on('placeorder success', () => {
                navigate('/place-order-success')//直接跳转

            })
            return () => {
                clientRef.current.close()
            }
        }
    }, [menu])//menu初始值为空,变化时运行,闭包陷阱
    //设置某一个菜品的数量
    function setFoodCount(foodId: number, count: number) {

        let idx = menu!.findIndex(it => it.id == foodId)
        updateFoodCount(foodCount => {//updateFoodCount要检查副作用,所以会运行两遍并发送两次请求,面试
            foodCount[idx] = count
            //客户端触发服务端监听的同名事件,然后服务器将最新的信息发送到在线的客户端,实现实时更新
        })
        //
        clientRef.current.emit('new food', {//防止请求两次,拿到updateFoodCount外
            desk: 'desk:' + params.deskId,//
            food: menu![idx],
            amount: count,
        })

    }
    function setFoodSelected(idx: number, selected: boolean) {
        updateFoodSelected(draft => {
            draft[idx] = selected
        })
    }
    async function placeOrder() {
        var order = {
            deskName: deskInfo!.name,
            customCount: query.get('c'),
            totalPrice: totalPrice(),
            foods: selectedFoods().filter(it => it.selected).map(it => {
                return {
                    amount: it.count,
                    food: it.food,
                }
            })

        }
        await axios.post(`/api/restaurant/${deskInfo!.restaurantId}/desk/${deskInfo!.deskId}/order`, order)
        navigate('/place-order-success')
    }
    function totalPrice() {
        // if (!menu || !foodCount){
        //     return 0;        
        // } 
            
        return menu!.map(it => it.price)//这里要做前后端统一的
            .map((price, idx) => {
                return price * foodCount[idx]
            }).reduce((a, b) => a + b, 0)
    }

    function selectedFoods() {//返回数量大于的0的菜,不管有没有选中,只要数量大于0
        return foodCount.map((count, idx) => {
            return {
                selected: foodSelected[idx],
                count,
                idx,
                food: menu![idx],
            }
        }).filter(it => it.count > 0)
    }

    //对菜进行分类
    var groupedMenu = useMemo(() => {//用于缓存计算结果，避免在每次组件渲染时都重复执行昂贵的计算，从而优化性能。
        if (!menu) {
            return {}
        } else {
            return _.groupBy(menu, 'category')

        }
    }, [menu])
    //侧边栏导航的当前分类的id
    
    const [activeKey, setActiveKey] = useState(Object.keys(groupedMenu)[0])

    useEffect(() => {
        setActiveKey(Object.keys(groupedMenu)[0])
    },[groupedMenu])//groupedMenu不为空时重新赋值

    // debugger;
    const { run: handleScroll } = useThrottleFn(//useThrottleFn 本身是一个用于创建节流函数的 React Hook，它不会 “自动” 在滚动时运行。但它通常被用来包装滚动事件的处理函数，从而在滚动触发时，让处理函数按照节流规则执行（即控制函数的执行频率，避免过于频繁调用）。
    () => {
        // debugger;
        console.log('scroll',activeKey)
        // if(window.foo==1) {
        //     return
        // }
       let currentKey  = activeKey//Object.keys(groupedMenu)[0]
    //   let initial = Object.keys(groupedMenu)[0]//开局默认展示第一个分类
      //选出最合适的高亮项目
      for (const key of Object.keys(groupedMenu)) {
        // if (activeKey) {
            
        // }
        const element = document.getElementById(`anchor-${key}`)//这里选中滚动容器,到了位置就高亮
        
        // const changeElement = document.getElementById(`anchor-${activeKey}`)
        if (!element){//类型收窄
            continue//执行 continue，跳过当前循环中的剩余代码，直接进入下一次循环。
        }
        const rect = element.getBoundingClientRect()// JavaScript 中用于获取元素在视口（浏览器可见区域）中位置和尺寸的方法，返回一个包含元素几何信息的 DOMRect 对象。
       
        if (rect.top <= 62) {
          //滚动到了这个位置就高亮
                     
            currentKey = key
            // setActiveKey(currentKey)           
        //    console.log('scroll',currentKey)
        //   setActiveKey(key)          
        
        } else {
          break//不小于结束
        }
        
      }
    //   setActiveKey(key)
    
       setActiveKey(currentKey)//当currentKey = activeKey,这里只高亮被选中的部分,而不是依次高亮
    },
    {
      leading: true,
      trailing: true,
      wait: 100,
      /*wait：必填，节流间隔时间（毫秒），表示函数在该时间内最多执行一次。
        leading：可选，是否在节流开始时立即执行一次（默认 true）。
        trailing：可选，是否在节流结束时再执行一次（默认 true）。
        context：可选，指定函数执行时的 this 上下文。*/
    }
   )
//   const mainElementRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {//这个用于节流
//     const mainElement = mainElementRef.current
//     if (!mainElement) return
//     mainElement.addEventListener('scroll', handleScroll)
//     return () => {
//       mainElement.removeEventListener('scroll', handleScroll)
//     }
//   }, [])
// useEffect(() => {
//   // 延迟 100ms 确保元素已渲染
//   const timer = setTimeout(() => {
//     // 获取目标元素
//     const targetId = `anchor-${Object.keys(groupedMenu)[1]}`;
//     const targetRef = document.getElementById(targetId);
//     // debugger
//     if (targetRef) {
//       // 创建并触发 change 事件
//       const event = new Event('change', {
//         bubbles: true,
//         cancelable: true
//       });
//       targetRef.dispatchEvent(event);
//     }
//   }, 10000);

//   // 组件卸载或依赖变化时清理定时器
//   return () => clearTimeout(timer);
// }, []); // 依赖 groupedMenu，当它变化时重新执行
//  useEffect(() => {
//     // 定义查找并操作元素的函数
//     const findAndTriggerElement = () => {
//       const targetElement = document.querySelector('[title="素菜"]');
//       debugger
//       if (targetElement) {
//         // 找到元素后触发事件
//         targetElement.dispatchEvent(new Event('change', { bubbles: true }));
//       } else {
//         // 没找到就延迟重试（最多尝试10次，避免无限循环）
//         let attempts = 0;
//         const timer = setInterval(() => {
//           const element = document.querySelector('[title="需要触发的元素"]');
//           if (element || attempts >= 10) {
//             clearInterval(timer);
//             if (element) {
//               element.dispatchEvent(new Event('change', { bubbles: true }));
//             }
//           }
//           attempts++;
//         }, 100); // 每100ms重试一次
//       }
//     };

//     findAndTriggerElement();
//   }, []);

///////
// useEffect(() => {
//     const timer = setTimeout(() => {
//       // 获取目标元素
//       const targetRef = document.querySelectorAll('.adm-side-bar-item')[1];
//       const targetRef0 = document.querySelectorAll('.adm-side-bar-item')[0];  
//       if (targetRef) {
//         // 定义事件处理函数
//         const handleClick = () => {
//           console.log('执行了');
//         };
        
//         // 先移除可能存在的旧监听，避免重复绑定
//         targetRef.removeEventListener('click', handleClick);
//         // 绑定新的事件监听
//         targetRef.addEventListener('click', handleClick);
//         targetRef0.removeEventListener('click', handleClick);
//         // 绑定新的事件监听
//         targetRef0.addEventListener('click', handleClick);
        
//         // 创建并触发click事件
//         const event = new Event('click', {
//           bubbles: true,  // 允许事件冒泡
//           cancelable: true
//         });
//         targetRef.dispatchEvent(event);
//         targetRef0.dispatchEvent(event);
//       }
      
//     },400);
//     // debugger
//      return () => clearTimeout(timer);
// },[])


/////////


var [isDark, toggleDarkMode] = useDarkMode()
    // console.log(groupedMenu)
    if (loading) {
        return <div>            
            <Skeleton.Title animated/>
            <Skeleton.Paragraph lineCount={5} animated/>
            <Skeleton.Title animated/>
            <Skeleton.Paragraph lineCount={5} animated/>            
        </div>
    }
//    var targetRef = document.querySelector('[title="素菜"]')
// 2. 加载完成但 menu 无效（未获取到数据）
if (!menu || !Array.isArray(menu)) {
  return <div>菜单数据加载失败</div>; // 显示错误提示
}

    return (
        <div className="viewport-height scrollbar-hidden">
        <div className="h-full flex flex-col">
            <h1 className="text-xl flex justify-between items-center border-b p-4 top-0 dark:bg-slate-600">
                {deskInfo.title} - {deskInfo.name}
                <Checkbox checked={ isDark } onChange={toggleDarkMode}>深色模式</Checkbox>
                </h1>
            <div className="flex   overflow-auto scrollbar-hidden">
                <div className="overflow-auto shrink-0 scrollbar-hidden" >
                    <SideBar
                        // style={{ '--background-color': '#f5f5f5' }} 
                        activeKey={activeKey}
                        onChange={key => {
                            // debugger;
                            console.log('触发Change的元素:',key)
                            // setActiveKey(activeKey)
                            // setActiveKey(key)
                            // setActiveKey()
                            // debugger;
                             //win全局变量
                            //  window.foo = 1
                            //  setTimeout(() => {
                            //     window.foo = 0
                            //  },300)
                            

                                document.getElementById(`anchor-${key}`)?.scrollIntoView({//SideBar在平滑滚动时会出现闪烁
                                                                                                    
                                    behavior: 'smooth',//平滑滚动
                                    // block: 'start',     // 元素顶部对齐滚动容器顶部（默认值，适合“置顶”）
                                //    block: 'center'
                                })
                            
                            // document.getElementById(`anchor-${key}`)?.addEventListener('click',() => {})
                            // debugger;
                            console.log('滚动开始')

                            
                            
                            // const element = document.getElementById(`anchor-${key}`);
                            //     if (element) {
                            //     // 滚动到元素位置时，调整顶部偏移量
                            //     const offsetTop = element.offsetTop - 1123;
                            //     mainElementRef.current?.scrollTo({
                            //         top: offsetTop,
                            //         behavior: 'smooth'
                            //     });
                            //     }

                            
                        }}
                    >
                        {
                            // [...new Set(menu!.map(it => it.category))].map(category => {
                            //     return <SideBar.Item title={category} key={category} />
                            // })
                            //
                           
                            Object.keys(groupedMenu).map(category => {//Object.keys(groupedMenu) 会遍历 groupedMenu 的所有自身可枚举属性，将属性名以字符串形式存入数组并返回
                                

                                return <SideBar.Item title={category}  key={category} />
                            })
                        }
                    </SideBar>
                </div>
                
                <div className="grow p-4 space-y-4 overflow-auto" onScroll={ handleScroll} >
                
                    {
                        Object.entries(groupedMenu).map((entry) => {
                            let [key, foodItems] = entry //key属性名,foodItems,被归类到entry 数组里
                            // debugger;
                            return (
                                
                                <div key={key} className="mb-4 " id={`anchor-${key}`} >
                                    <h2 className="text-2xl z-50 -mx-4 px-4 -top-4 sticky bg-slate-300 text-black font-bold  truncate" >{key}</h2>
                                    <div className="space-y-4 mt-4">

                                    {
                                        foodItems.map((foodItem) => {
                                            var idx = menu!.findIndex(it => it.id == foodItem.id)//使用总菜单而非分类后的菜单,防止数据重复
                                            return (
                                                <div className="flex gap-2" key={foodItem.id}>
                                                    <img className="w-24 h-24 rounded  shrink-0" src={`/upload/${foodItem.img}`} alt="" onClick={() => {
                                                        // debugger;
                                                        Modal.show({
                                                            showCloseButton: true,
                                                            closeOnMaskClick: true,
                                                            content: (
                                                                <div className="w-[70vw] h-[60vh]">
                                                                <div className="mx-8 h-full">
                                                                    <img className="w-full h-4/5 object-contain rounded shrink-0" src={`/upload/${foodItem.img}`} alt="" />
                                                                    <h2>{foodItem.name}</h2>
                                                                    <p>{foodItem.desc}</p>
                                                                </div>
                                                                </div>
                                                            ),
                                                        });
                                                        // console.log(Modal)
                                                    }} />
                                                    <div className="grow" >
                                                        <div className="text-lg">{foodItem.name}</div>
                                                        <div>￥{foodItem.price}</div>
                                                        <div className="text-sm">{foodItem.desc}</div>
                                                        <div className="flex justify-end">
                                                            <Stepper  min={0} max={5} value={foodCount[idx]} onChange={c => setFoodCount(foodItem.id, c)} />
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="h-[calc(100%_-_142px)]">
                        <Footer label="没有更多" />
                        </div>
                </div>
            
                <div hidden className="space-y-2 pb-16 p-2">
                    {
                        
                        menu!.map((foodItem: any, idx: number) => (
                            <div className="flex gap-2" key={foodItem.id}>
                                <img className="w-12 h-12 shrink-0" src={`/upload/${foodItem.img}`} alt="" />
                                <div className="grow" >
                                    <div>{foodItem.name}</div>
                                    <div>￥{foodItem.price}</div>
                                    <div>{foodItem.desc}</div>
                                </div>
                                <Counter min={0} max={5} value={foodCount[idx]} onChange={c => setFoodCount(foodItem.id, c)} />
                            </div>

                        ))
                    }
                </div>
            </div> 
            <div hidden className="h-16 shrink-0 opactity-0">安全区</div>
            <div className="fixed  z-100 left-2 right-2 bottom-2 ">
                <div className="p-2 border-t border-b rounded-3xl mb-2 bg-blue-400  divide-y" hidden={!expand} data-detail="当前购物车详情">

                    {
                        selectedFoods()
                            .map(entry => {
                                return (
                                    <div className="flex items-center px-2 py-2 gap-4" key={entry.idx}>
                                        <div>
                                            <Checkbox checked={entry.selected} onChange={checked => setFoodSelected(entry.idx, checked)} />
                                            {/* <input type="checkbox" checked={entry.selected} onChange={(e) => setFoodSelected(entry.idx, e.target.checked)} /> */}
                                        </div>
                                        <div className="basis-1/3 grow truncate">{entry.food.name}</div>
                                        <div className="basis-0 grow">{entry.count}</div>
                                        <div className="basis-0 grow text-right pr-8">￥{entry.count * entry.food.price}</div>
                                        {/* <Counter min={0} max={5} value={entry.count} onChange={(count) => setFoodCount(entry.food.id, count)} /> */}
                                        <Stepper min={0} max={5} value={entry.count} onChange={(count) => setFoodCount(entry.food.id, count)} />


                                    </div>
                                )
                            })

                    }
                </div>
                <div className="flex h-12 justify-between bg-slate-700 dark:bg-slate-700 rounded-full z-50">
                    <button className="!relative !rounded-l-full !bg-yellow-500 px-5 text-lg font-bold" onClick={toggle}>
                        展开
                        <span className="absolute text-xs bg-red-500 text-white rounded-full p-1 -right-3 -top-2">{selectedFoods().map(it => it.count).reduce((a, b) => a + b, 0)}</span>
                    </button>
                    <span className="self-center text-lg">合计: ￥ <span className=" text-2xl">{
                        totalPrice()
                    }</span></span>
                    <button className=" !rounded-r-full !bg-yellow-500 px-5 text-lg font-bold" onClick={placeOrder}>下单</button>
                </div>
            </div>
        </div>
        </div>
    )
    
}


export default OrderFoodPage

type CounterProps = {
    min?: number,
    max?: number,
    start?: number,
    step?: number,
    value?: number,
    onChange?: (current: number) => void,
}
export function Counter({ max = 10, min = 0, step = 1, value = 0, onChange = () => { } }: CounterProps) {
    //改为受控组件,即value属性值为多少,组件ui就同步显示多少,当value作为全局变量传入两个组件,他们就能实现同步

    function inc() {
        var t = value + step
        if (t > max) {
            t = max
        }
        onChange(t)
    }
    function dec() {
        var t = value - step
        if (t < min) {
            t = min
        }
        onChange(t)
    }

    return (
        <div className="flex gap-1 self-center items-center">
            <button onClick={dec} className="bg-yellow-500 font-bold w-8 h-8 items-center justify-center rounded-full">-</button>
            <span className="w-8 text-center">{value}</span>
            <button onClick={inc} className="bg-yellow-500 font-bold w-8 h-8 items-center justify-center rounded-full">+</button>
        </div>

    )
}
