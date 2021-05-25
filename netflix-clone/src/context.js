import React from 'react'
import {useContext, useReducer} from 'react'
import reducer from './reducer'

//Creating context
const AppContext = React.createContext() 

const initialState = {
    bannerStorage: [],
    movie: {
       id: null,
       name: '',
       poster: '',
       description: '',
   }
}

//AppProvider function
const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const setBannerStorage = (data) => {
        dispatch({
            type: "SET_BANNER_STORAGE",
            payload: data
        })
    }

    const setMovie = (id, name, description, poster) => {
        dispatch({
            type: "SET_MOVIE",
            id: id,
            name: name,
            description: description,
            poster: poster
        })
    }

    return(
        <AppContext.Provider value = {{
            ...state,
            dispatch,
            setMovie,
            setBannerStorage
        }}>
            {children}
        </AppContext.Provider>
    )
}

//Custom hook for calling context
const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider, useGlobalContext}
