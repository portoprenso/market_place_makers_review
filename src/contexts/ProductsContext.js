import React, { useReducer } from 'react';
import { JSON_API } from '../helpers/constants'
import axios from 'axios'

export const productsContext = React.createContext();
const INIT_STATE = {
    productsData: [],
    productDetails: {},
    paginationPages: 1
}

const reducer = (state=INIT_STATE, action) =>{
    switch(action.type){
        case "GET_PRODUCTS_DATA":
            return {...state, productsData: action.payload.data, paginationPages: Math.ceil(action.payload.headers["x-total-count"] / 4)}
        default: return state
    }
}

const ProductsContextProvider = ({ children }) => {

    const getProductsData = async (history) => {
        const search = new URLSearchParams(history.location.search)
        search.set('_limit', 4)
        history.push(`${history.location.pathname}?${search.toString()}`)
        let res = await axios(`${JSON_API}?_limit=4&${window.location.search}`)
        dispatch({
            type: "GET_PRODUCTS_DATA",
            payload: res
        })
    }

    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    let values = {
        productsData: state.productsData,
        paginationPages: state.paginationPages,
        getProductsData
    }

    return (
        <productsContext.Provider value={values}>
            {children}
        </productsContext.Provider>
    )
}
export default ProductsContextProvider;