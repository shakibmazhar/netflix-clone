import React from 'react'
import {useContext, useReducer} from 'react'
import reducer from './reducer'

//Creating context
const AppContext = React.createContext() 

const initialState = {
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
            setMovie
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
