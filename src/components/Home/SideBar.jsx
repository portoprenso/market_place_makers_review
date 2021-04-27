import React, {useContext, useState} from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { productsContext } from '../../contexts/ProductsContext';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary
    }
  }))

const SideBar = ({ history }) => {
    const classes = useStyles();
    const { getProductsData } = useContext(productsContext)
    const [sliderValue, setSliderValue] = useState(getSlider())
    const [memory, setMemory] = useState((getMemory()))

    function getMemory() {
        const search = new URLSearchParams(history.location.search)
        return search.get('category')
    }

    function getSlider() {
            const search = new URLSearchParams(history.location.search)
            return search.get('price_lte')
    }

    const handleChangeMemory = async (event) => {
        if(event.target.value === "all") {
            await history.push(`${history.location.pathname.replace('category')}`)
            getProductsData(history)
            return
        }
        const search = new URLSearchParams(history.location.search)
        await search.set('category', event.target.value)
        await history.push(`${history.location.pathname}?${search.toString()}`)
        getProductsData(history)
        setMemory(event.target.value)
    }

        async function handleSliderValue(e, value) {
        console.log(e, value)
        const search = new URLSearchParams(history.location.search)
        await search.set('price_lte', value)
        await history.push(`${history.location.pathname}?${search.toString()}`)
        getProductsData(history)
            setSliderValue(value)
    }
    
    return (
        <Grid item md={3}>
            <Paper className={classes.paper}>
            <FormControl component="fieldset">
            <FormLabel component="legend">Memory</FormLabel>
            <RadioGroup value={memory} onChange={handleChangeMemory} aria-label="memory" name="memory1">
                <FormControlLabel value="64" control={<Radio />} label="64GB" />
                <FormControlLabel value="128" control={<Radio />} label="128GB" />
                <FormControlLabel value="256" control={<Radio />} label="256GB" />
                <FormControlLabel value="512" control={<Radio />} label="512GB" />
                <FormControlLabel value="1024" control={<Radio />} label="1024GB" />
                <FormControlLabel value="all" control={<Radio />} label="All" />
            </RadioGroup>
            </FormControl>

               <Grid>
                   <Slider
                       value={sliderValue}
                       min={500}
                       max={20000}
                       onChange={handleSliderValue}
                       valueLabelDisplay="auto"
                       aria-labelledby="range-slider"
                   />
               </Grid>


            </Paper>
        </Grid>
    );
};

export default SideBar;