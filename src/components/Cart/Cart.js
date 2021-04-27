import React, { useContext, useEffect } from 'react';
import { productsContext } from '../../contexts/ProductsContext';
import './Cart.css'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import { calcTotalPrice } from '../../helpers/calcPrice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));



const Cart = () => {
    const classes = useStyles();
    const { getCart, cart, changeProductCount } = useContext(productsContext)

    useEffect(() => {
        getCart()
    }, [])

    return (
        <div className="cart">
            {cart.products ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Count</th>
                                <th>SubPrice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.products.map(elem => (
                                    <tr key={elem.item.id}>
                                        <td>
                                            <img style={{width: 100}} src={elem.item.image} />
                                        </td>
                                        <td>{elem.item.title}</td>
                                        <td>{elem.item.price}</td>
                                        <td><input onChange={(e) => changeProductCount(e.target.value, elem.item.id)} type="number" value={elem.count} /></td>
                                        <td>{elem.subPrice}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                    <h4>Total: {calcTotalPrice(cart.products)}</h4>
                    <Button>Купить</Button>
                </div>
            ) : (
                <CircularProgress />
            ) }
        </div>
    );
};

export default Cart;