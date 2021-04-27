import React, { useReducer } from 'react';
import { JSON_API } from '../helpers/constants'
import axios from 'axios'
import { calcSubPrice, calcTotalPrice } from "../helpers/calcPrice"
import { getCountProductsInCart } from '../helpers/calcPrice'

export const productsContext = React.createContext();
const INIT_STATE = {
    productsData: [],
    productDetails: {},
    paginationPages: 1,
    cart: {},
    cartLength: getCountProductsInCart()
}

const reducer = (state=INIT_STATE, action) =>{
    switch(action.type){
        case "GET_PRODUCTS_DATA":
            return {...state, productsData: action.payload.data, paginationPages: Math.ceil(action.payload.headers["x-total-count"] / 4)}
        case 'GET_CART':
            return {...state, cart: action.payload}
        case 'CHANGE_COUNT':
            return {...state, cartLength: action.payload}
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

    function addProductToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newProduct = {
            item: product,
            count: 1,
            subPrice: 0
        }

        let filteredCart = cart.products.filter(elem => elem.item.id === product.id)
        if(filteredCart.length > 0) {
            cart.products.filter(elem => elem.item.id !== product.id)
        }
        else {
            cart.products.push(newProduct)
        }
        newProduct.subPrice = calcSubPrice(newProduct)
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "CHANGE_COUNT",
            payload: cart.products.length
        })
    }

    function getCart() {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "GET_CART",
            payload: cart
        })
    }

    function changeProductCount(count, id) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.products = cart.products.map(elem => {
            if(elem.item.id === id) {
                elem.count = count
                elem.subPrice = calcSubPrice(elem)
            }
            return elem
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }

    function checkProductInCart(id) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newCart = cart.products.filter(elem => elem.item.id === id)
        return newCart.length > 0 ? true : false
    }


    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    let values = {
        productsData: state.productsData,
        paginationPages: state.paginationPages,
        cartLength: state.cartLength,
        cart: state.cart,
        getProductsData,
        addProductToCart,
        getCart,
        changeProductCount,
        checkProductInCart
    }

    return (
        <productsContext.Provider value={values}>
            {children}
        </productsContext.Provider>
    )
}
export default ProductsContextProvider;