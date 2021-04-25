import React from 'react';
import {Grid} from '@material-ui/core'
import SideBar from "./SideBar";
import Content from "./Content";

const Home = (props) => {
    console.log(props);
    return (
        <Grid container spacing={3}>
            <SideBar {...props}/>
            <Content />
        </Grid>
    );
};

export default Home;