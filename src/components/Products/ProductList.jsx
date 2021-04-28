import React, {useContext, useEffect, useState} from 'react';
import {productsContext} from "../../contexts/ProductsContext";
import {Button, Grid} from "@material-ui/core";
import ProductCard from "./ProductCard";
import Pagination from '@material-ui/lab/Pagination';
import { useHistory } from 'react-router-dom'
import {authContext} from "../../contexts/AuthContext";

const ProductList = () => {
    const history = useHistory()
    const { getProductsData, productsData, paginationPages } = useContext(productsContext)
    const { receiveCookie } = useContext(authContext)
    function getPage() {
        const search = new URLSearchParams(history.location.search)
        // console.log(history);
        return search.get('_page')
    }
    const [page, setPage] = useState(getPage())
    const handlePage = (event, page) => {
        const search = new URLSearchParams(history.location.search)
        search.set('_page', page)
        history.push(`${history.location.pathname}?${search.toString()}`)
        setPage(page)
        getProductsData(history)
    }
    useEffect(() => {
        getProductsData(history)}, []
    )
    return (
            <>
            <Grid container spacing={3}>
                <Button onClick={receiveCookie}>Receive Cookie</Button>
                {
                    productsData.map((item) => (
                        <ProductCard item={item} key={item.id} />
                    ))
                }
            </Grid>
            <Pagination page={+page} onChange={(event, page) => {handlePage(event, page)}} count={paginationPages} color="primary" />
            </>
    );
}

export default ProductList;