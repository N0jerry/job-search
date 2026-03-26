import axios from 'axios';
// import { set } from 'mobx';
// import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { DeskInfo } from './type.ts'
import { QRCode } from 'antd';
import { useAtom } from 'jotai';
import { userInfoAtom } from './store.tsx';




export default function DeskManageView() {
    var [desks, setDesks] = useState<DeskInfo[]>([])
    var [userInfo] = useAtom(userInfoAtom)

    useEffect(() => {
        axios.get(`/api/restaurant/${userInfo!.id}/desk`)
            .then(res => {
                setDesks(res.data)

            })
    }, [])
    //二维码
    // var [qrcodes, setQrcodes] = useState<string[]>([])
    // useEffect(() => {
    //     Promise.all(
    //         desks.map(desk => {
    //             return QRCode.toDataURL(`http://10.3.3.3:3000/rest/1/desk/${desk.deskId}`)
    //         })
    //     ).then(urls => {
    //         setQrcodes(urls)
    //     })
    // }, [desks])



return (
    <div className="p-2 grow">
        <h1 className="text-lg font-bold flex gap-2">
        桌面管理界面
        <Link to="/home/add-desk">添加餐桌</Link>
        </h1>
        <div className="space-y-2 mt-2  ">
            {
                desks.map((desk, idx) => {
                    return (
                        <div key={idx} className="flex border rounded grow ">
                            <div className="p-2" key={idx}>
                                <div>名称: {desk.name}</div>
                                <div>座位: {desk.capacity}</div>
                                <div className="flex gap-2">
                                    <button>编辑</button>
                                    <button>删除</button>
                                    <button>打印二维码</button>
                                </div>
                            </div>
                            <div className=" w-30 p-2 border flex rounded">
                                <a href={`http://${location.host}/#/r/${userInfo!.id}/d/${desk.id}`}>
                                
                                <QRCode bgColor='white' size={100} value={`http://${location.host}/#/r/${userInfo!.id}/d/${desk.id}`} />
                                </a>
                                {/* <img data-url={`http://10.3.3.3:3000/r/1/d/${desk.deskId}`} src={qrcodes[idx]} alt="" /> */}
                            </div>
                        </div>
                    )
                })

            }
        </div>
    </div>
)
}