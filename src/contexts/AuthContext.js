import React, {useReducer } from 'react'
import { AUTH_API} from "../helpers/constants";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useCookies} from "react-cookie";
export const authContext =React.createContext();



const INIT_STATE={}
const reducer =(state=INIT_STATE,action)=>{
    switch(action.type){
        case '...':
        default: return state}
}
const AuthContextProvider =({children})=>{
    const [state,dispatch] = useReducer(reducer,INIT_STATE)
    const [ cookies, setCookie, removeCookie ] = useCookies()

    const history = useHistory()

    function cookieExpireDate() {
        let newDate = Date.now()
        newDate = new Date(newDate).toUTCString()
        return newDate
    }

    async function createCookie(mail) {
        await setCookie('isLogged', {mail}, {expires: 2})
    }

    async function registerUser(e, history) {
        e.preventDefault()
        const newUser = {
            email: e.target[0].value,
            password: e.target[2].value
        }
        try{
            const res = await axios.post(`${AUTH_API}/api/auth/register`, newUser)
            console.log(res)
            history.push('/login')
        } catch(err){
            console.log(err.response)
        }

    }

    function receiveCookie() {
        // let some = cookies.get('isLogged')
        // console.log(some)
        // console.log(cookies.isLogged)
        let some = cookies.isLogged
        console.log(some)
    }

    async function loginUser(e, history) {
        e.preventDefault()
        const user = {
            email: e.target[0].value,
            password: e.target[2].value
        }
        try{
            const data = await axios.post(`${AUTH_API}/api/auth/login`, user)
            console.log(data)
            createCookie(e.target[0].value)
            history.push('/')
        } catch(err){
            console.log(err.response)
        }

    }

    let values = {
        registerUser,
        loginUser,
        receiveCookie
    }

    return (
        <authContext.Provider value={values}>
            {children}
        </authContext.Provider>
    )
}
export default AuthContextProvider;