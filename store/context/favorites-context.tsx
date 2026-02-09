import React, { createContext, FC, ReactNode, useState } from 'react'
import { View, Text } from 'react-native'


interface FavoritesContextType<T> {
  ids: T[];
  addFavorite: (id: T) => void;
  removeFavorite: (id: T) => void;
}
export const FavoritesContex = createContext<FavoritesContextType<any> | null>({
    ids: [],
    addFavorite: (id) => {},
    removeFavorite: (id) => {}
    
})

const FavoritesContexProvider= <T,>({children}:{children:ReactNode}) => {
    const [favoriteMealIds, setFavoriteMealIds] = useState<T[]>([])


    const addFavorite = (id: T) => {
        setFavoriteMealIds((currentFavIds) => [...currentFavIds,id])
    }

    const removeFavorite = (id: T) => {
        setFavoriteMealIds((currentFavIds) => 
            currentFavIds.filter((mealId) => mealId !== id))

    }
    const value = {
        ids: favoriteMealIds,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite
    }
  return (
    <FavoritesContex.Provider value={value}>
        {children}
    </FavoritesContex.Provider>
  )
}

export default FavoritesContexProvider