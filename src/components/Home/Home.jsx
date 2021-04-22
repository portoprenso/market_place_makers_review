import React from 'react';
import {Grid} from '@material-ui/core'
import SideBar from "./SideBar";
import Content from "./Content";

const Home = () => {

    return (
        <Grid container spacing={3}>
            <SideBar />
            <Content />
        </Grid>
    );
};

export default Home;