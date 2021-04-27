import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { productsContext } from '../../contexts/ProductsContext';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        backgroundSize: "contain",
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

export default function ProductCard({ item }) {
    const classes = useStyles();
    const { addProductToCart, checkProductInCart } = useContext(productsContext)
    return (
        <Card className={classes.root}>
            <CardHeader
                title={<Typography align="center" variant="h5">{item.title}</Typography>}
                subheader={<Typography align="center" color="textSecondary">{item.author}</Typography>}
            />
            <CardMedia
                className={classes.media}
                image={item.image}
                title={item.title}
            />
            <CardContent>
                <Typography variant="body2" color="textPrimary" component="p">
                    {item.description}
                </Typography>
            </CardContent>
                <Typography align="center" variant="h5" color="textPrimary" component="p">
                    {`${item.price}сом`}
                </Typography>
            <CardActions disableSpacing>
                <IconButton onClick={() =>
                {addProductToCart(item)}}
                aria-label="share"
                color={checkProductInCart(item.id) ? "secondary" : "primary"}>
                    <ShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
