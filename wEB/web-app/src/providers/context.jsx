import { createContext, useContext, useReducer } from "react"
import {LocalStorage} from "../utils/localStorage"

const initialState = {
    username: LocalStorage.get('username') || null,
    role: LocalStorage.get('role') || null,
    token: LocalStorage.get('token') || null,
    isAuth: !!LocalStorage.get('token') || null,
    id: LocalStorage.get('id') || null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, username:action.payload.username, role:action.payload.role, token:action.payload.token, isAuth:true, id:action.payload.id }  
        case "REMOVE_USER":
            return { ...state, username:null, role:null, token:null, id:null, isAuth:false }              
        default:
            return state
    }
}

const AppContext = createContext(initialState)

export const SetUser = ({username, role, token, isAuth, id}) =>({type:"SET_USER", payload: {username, role, token, isAuth, id}})

export const RemoveUser = () =>({type:"REMOVE_USER" })

    


export const Provider = ({children}) => {
    const [state,dispatch] = useReducer(reducer, initialState)
    const value = {state,dispatch}

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    const {state,dispatch} = useContext(AppContext)
    return {state,dispatch}
}