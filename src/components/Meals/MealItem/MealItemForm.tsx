import { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
type Props = {
  id: number;
  onAddToCart(amount: number): void;
};
const MealItemForm = ({ onAddToCart, id }: Props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef<any>(1);

  const submitHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const enteredAmount:string = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        id={id}
        label='Amount'
        input={{
          id: {id},
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }} />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
