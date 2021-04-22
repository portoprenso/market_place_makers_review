import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import ProductsContextProvider from "./contexts/ProductsContext";

const Routes = () => {
    return (
        <ProductsContextProvider>
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Home}/>
            </Switch>
        </BrowserRouter>
        </ProductsContextProvider>
    );
};

export default Routes;