import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. 定義 State 的類型介面
interface FavoritesState {
  ids: string[]; // 假設 ID 是字串
}

// 2. 初始化 State 並指定類型
const initialState: FavoritesState = {
  ids: [],
};
const favoritesSlice = createSlice({
    name: 'favorites',//标识符
    initialState,
    reducers: {//管理函数
        addFavorite: (state,action: PayloadAction<{ id: string }>) => {
            state.ids?.push(action.payload.id)
        },
        removeFavorite: (state,action: PayloadAction<{ id: string }>) => {
            state.ids?.splice(state.ids.indexOf(action.payload.id),1)
        }

    }
})
export const addFavorite = favoritesSlice.actions.addFavorite
export const removeFavorite = favoritesSlice.actions.removeFavorite

export default favoritesSlice.reducer