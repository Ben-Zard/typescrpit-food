import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext, { ICart } from "../../store/cart-context";
import React from "react";
import Checkout from "./Checkout";
// import { mealsOrder } from "../../store/CartProvider";
interface Props {
  hidehandleCart: () => void;
}

const Cart = ({ hidehandleCart }: Props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setdidSubmit] = useState(false);

  const totalAmount = `$${cartCtx?.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx!.items.length > 0;

  const cartItemRemoveHandler = (id: number) => {
    cartCtx?.removeItem(id);
  };

  const cartItemAddHandler = (item: ICart) => {
    cartCtx?.addItem(item);
  };
  const showOrderForm = () => {
    setIsCheckout(true);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx?.items.map((item: ICart) => (
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

  const submitOrderHandler = async (userData: {}) => {
    setIsSubmitting(true);
    await fetch("https://react-http-3eed4-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx?.items,
      }),
    });
    setIsSubmitting(false);
    setdidSubmit(true);
    cartCtx?.clearCart();
  };

  const modalaction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={hidehandleCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={showOrderForm}>
          Order
        </button>
      )}
    </div>
  );

const cartModalContent = (<>
{cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  <>
    {isCheckout && (
      <Checkout
        submitOrderHandler={submitOrderHandler}
        hidehandleCart={hidehandleCart}
      />
    )}
    {!isCheckout && modalaction}
  </>
  </>
);

const didSubmitModalContent = (
    <><p>Successfully sent the order!</p>
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={hidehandleCart}>
        Close
      </button>
      </div></>);

const isSubmittingModalContent = <p>Sending order data...</p>;
  return (
    <Modal>
      <>
     {!isSubmitting && !didSubmit&& cartModalContent}
     {isSubmitting && isSubmittingModalContent}
     {didSubmit && didSubmitModalContent}
     </>
    </Modal>
  );
};

export default Cart;
