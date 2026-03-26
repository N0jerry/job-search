import { runInAction, makeAutoObservable } from 'mobx';
import { type Food } from './type.ts';
import { observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useInput } from './hooks.tsx';
import { ConfigProvider, Tabs } from 'antd';
import _ from 'lodash';
import type { TabsProps, ThemeConfig } from 'antd';
import { useAtom } from 'jotai';
import { userInfoAtom } from './store.tsx';

class FoodManager {//
foods: Food[] = []

    constructor() {
        //super()//必须使用 super 的场景：子类有显式构造函数，且继承了父类
        makeAutoObservable(this)//makeAutoObservable只能于没有父类的类
    }

    addFood(...foods: Food[]) {
        this.foods.push(...foods)
    }

    setFoodSgtatus(idx: number,status: Food['status']) {//设置产品状态
        this.foods[idx].status = status
    }
    get grouped() {
        return _.groupBy(this.foods, 'category')
    }
}
function FoodManageView() {
    var [manager] = useState(() => new FoodManager())
    var [userInfo] = useAtom(userInfoAtom)

    useEffect(() => {
        var ignore = false
        axios.get(`/api/restaurant/${userInfo!.id}/food`)
         .then(res => {
            if (!ignore) {//useEffect在组件卸载时又运行,所以用ignore阻止在卸载时又修改数据
                manager.addFood(...res.data)//

            }
         })
         return () => {
            ignore = true
         }
    }, [])

    var tabProps: TabsProps['items'] = Object.entries(manager.grouped).map(entry => {
        var [category, foods] = entry
        return {
            key: category,
            label: category,
            children: (
                <div className= 'mt-2 space-y-2 '>
                {
                    foods.map((foodItem, idx) => {
                        return (<FoodItem key={foodItem.id} manager={manager} foodItem={foodItem} idx={idx}/>
                        )
                    })
                }
            </div>
            )
        }
    })
    const themeConfig: ThemeConfig = {
  // 全局主题模式（根据data属性判断深色/浅色）
//   mode: document.documentElement.getAttribute('data-prefers-color-scheme') === 'dark' ? 'dark' : 'light',
  // 配置组件特定样式
  
  // 全局令牌（与index.css的CSS变量关联）
  token: {
    colorText: 'var(--text-color)',
    colorBgContainer: 'var(--bg-container)',
    colorBorder: 'var(--border-color)',
  }
};



    // async function offButton(idx: number) {
    //     var food = manager.foods[idx]
    //     await axios.put(`/api/restaurant/1/food/${food.id}`,{
    //         status: 'off'
    //     }) 
    //     manager.setFoodSgtatus(idx, 'off')
        
    // }
    // async function onButton(idx: number) {
    //     var food = manager.foods[idx]
    //     await axios.put(`/api/restaurant/1/food/${food.id}`,{
    //         status: 'on'
    //     }) 
    //     manager.setFoodSgtatus(idx, 'on')
        
    // }
    if (manager.foods.length == 0) {
        return 'Loading...'
    }

    return (

        <div className='grow p-2 '>
            <div className='flex gap-2 items-end '>
            <span className='text-lg font-bold'>菜品管理</span>
            <Link to="/home/add-food">添加菜品</Link>
            </div>
            <ConfigProvider theme={themeConfig}>

            <Tabs 
            items={ tabProps }
              />
            </ConfigProvider>

            {/* <div hidden className= 'mt-2 space-y-2'>
                {
                    manager.foods.map((foodItem, idx) => {
                        return (<FoodItem key={foodItem.id} manager={manager} foodItem={foodItem} idx={idx}/>
                        )
                    })
                }
            </div> */}
        </div>
    )
}

//函数组件
type FoodItemProp = {
    foodItem: Food,
    idx: number,
    manager: FoodManager,
}
//
const FoodItem: React.FC<FoodItemProp> = observer(({manager,foodItem, idx}) =>{//用observer包住后就可以使用mobx里方法
    var [editing, setEditing] = useState(false)
    var [userInfo] = useAtom(userInfoAtom)
        var name = useInput(foodItem.name)
        var price = useInput(String(foodItem.price))
        var desc = useInput(foodItem.desc)
        var category = useInput(foodItem.category)
        var imgInputRef = useRef<HTMLInputElement | null>(null)

    async function offButton(idx: number) {
        var food = manager.foods[idx]
        await axios.put(`/api/restaurant/${userInfo!.id}/food/${food.id}`,{
            status: 'off'
        }) 
        manager.setFoodSgtatus(idx, 'off')
        
    }
    async function onButton(idx: number) {
        var food = manager.foods[idx]
        await axios.put(`/api/restaurant/${userInfo!.id}/food/${food.id}`,{
            status: 'on'
        }) 
        manager.setFoodSgtatus(idx, 'on')        
    }
    async function handleEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        var fd = new FormData()
        fd.append('name', name.value)
        fd.append('price', price.value)
        fd.append('desc', desc.value)
        fd.append('category', category.value)
        //
        if (imgInputRef.current!.files!.length > 0) {
            fd.append('img', imgInputRef.current!.files![0])
        }
        var res = await axios.put(`/api/restaurant/${userInfo!.id}/food/${foodItem.id}`,fd)//fd就是请求体;axios返回值就是响应,所以用res
        runInAction(() => {
            manager.foods[idx] = res.data;
        });
        setEditing(false)//取消编辑状态
    }
if (editing) {///编辑一般发put请求
    //返回编辑视图
    return (
    <div className='border rounded p-2 flex gap-2' >
            <img className='w-24 h-24' src={'/upload/' + foodItem.img} alt="" />
        <div>
            <div className='flex p-2'>名称: <input className='border' type="text" {...name}/> </div>
            <div className='flex p-2'>价格: <input className='border' type="text" {...price}/> </div>
            <div className='flex p-2'>描述: <input className='border' type="text" {...desc}/></div>
            <div className='flex p-2'>分类: <input className='border' type="text" {...category}/></div>
            <div className='flex p-2'>图片: <input className='border' type="file" ref={imgInputRef}/></div>
            
            <div className='flex p-2 gap-2'>
                <button onClick={handleEdit}>确定</button>
                <button onClick={() => setEditing(false)}>取消</button>
            </div>
        </div>
    </div>
    )
}

    return(
    <div className='border rounded p-2 flex gap-2 grow-0 shrink-0 ' >
        <img className='w-24 h-24' src={'/upload/' + foodItem.img} alt={foodItem.name} />
        <div >
            <div>价格: {foodItem.price} </div>
            <div>描述: {foodItem.desc}</div>
            <div>分类: {foodItem.category}</div>
            <div>上架状态: {foodItem.status == 'on' ? '上架中' : '已下架'}</div>

            <div className='flex gap-2'>
                {foodItem.status == 'on' && <button onClick={() => offButton(idx)}>下架</button>}
                {foodItem.status == 'off' && <button onClick={() => onButton(idx)}>上架</button>}
                <button onClick={() => setEditing(true)}>编辑</button>
                <button>删除</button>
            </div>
        </div>
    </div>
    )
})


export default observer(FoodManageView)