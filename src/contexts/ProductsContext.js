import React, { useReducer } from 'react';
import { JSON_API } from '../helpers/constants'
import axios from 'axios'

export const productsContext = React.createContext();
const INIT_STATE = {
    productsData: [],
    productDetails: {}
}

const reducer = (state=INIT_STATE, action) =>{
    switch(action.type){
        case "GET_PRODUCTS_DATA":
            return {...state, productsData: action.payload}
        default: return state
    }
}

const ProductsContextProvider = ({ children }) => {

    const getProductsData = async () => {
        let { data } = await axios(`${JSON_API}${window.location.search}`)
        dispatch({
            type: "GET_PRODUCTS_DATA",
            payload: data
        })
    }

    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    let values = {
        productsData: state.productsData,
        getProductsData
    }

    return (
        <productsContext.Provider value={values}>
            {children}
        </productsContext.Provider>
    )
}
export default ProductsContextProvider;