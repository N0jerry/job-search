export type Food = {
        idx:  null | undefined    
        id: number,
        rid: number,
        name: string,
        desc: string,
        price: number,
        img: string,
        category: string,
        status: 'on' | 'off',
}
export type DeskInfo = {
    id: number,
    rid: number,//餐桌
    restaurantId: number,//
    name: string,//
    title: string,
    capacity: number,//餐桌容量

}
export type UserInfo = {
    id: number,
    name: string,
    title: string,
}
export type Order = {
    id: number,
    rid:number,
    did:number,
    deskName:string,
    customCount: number,
    status:'pending' | 'confirmed' | 'completed',
    timestamp: string,
    totalPrice: number,
    details: {
    food: Food,
    amount: number
}[],
}
