import { useContext } from 'react';

import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';
interface Props {
  name:string,
  description:string,
  price:number,
  id:number
  // amount: number
}
const MealItem = ({name,description,price,id,}: Props) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount:number) => {
    cartCtx!.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
      description: ''
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{`${price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={0} />
      </div>
    </li>
  );
};

export default MealItem;
