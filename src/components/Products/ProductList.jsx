import React, {useContext, useEffect} from 'react';
import {productsContext} from "../../contexts/ProductsContext";
import {Grid} from "@material-ui/core";
import ProductCard from "./ProductCard";

const ProductList = () => {

    const { getProductsData, productsData } = useContext(productsContext)
    useEffect(() => {
        getProductsData()}, []
    )

    return (
        <Grid container spacing={3}>
            {
                productsData.map((item) => (
                    <ProductCard item={item} key={item.id} />
                ))
            }
        </Grid>
    );
}

export default ProductList;