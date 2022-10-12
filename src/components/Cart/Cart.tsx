import { MouseEventHandler, useContext,useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext, { ICart } from '../../store/cart-context';
import React from 'react';
import Checkout from './Checkout';
interface Props {
  hidehandleCart: ()=> void;
}

const Cart = ({hidehandleCart}:Props) => {
const cartCtx = useContext(CartContext);
const [isCheckout, setIsCheckout] = useState(false);

const totalAmount = `$${cartCtx?.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx!.items.length > 0;

  const cartItemRemoveHandler = (id:number) => {
    cartCtx?.removeItem(id);
  };

  const cartItemAddHandler = (item:ICart) => {
    cartCtx?.addItem(item);
  };
const showOrderForm = () => {
  setIsCheckout(true);
}
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx?.items.map((item:ICart) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
const modalaction =( 
<div className={classes.actions}>
<button className={classes['button--alt']} onClick = {hidehandleCart}>Close</button> 
{hasItems && <button className={classes.button} onClick= {showOrderForm}>Order</button>}
</div>
)

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <>
      {isCheckout && <Checkout hidehandleCart= {hidehandleCart}/> }
      {!isCheckout && modalaction}
      </>
    </Modal>
  );
};

export default Cart;
