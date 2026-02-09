
import { configureStore } from '@reduxjs/toolkit'
import favoritesContexProvider from './favorites'

const store = configureStore({
    reducer: {
        favoriteMeals: favoritesContexProvider
    }//管理状态切片
})
export type RootState = ReturnType<typeof store.getState>;
export default store