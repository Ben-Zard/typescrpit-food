import React, { useRef ,useState} from "react";
import classes from "./Checkout.module.css";
type Props = {
    hidehandleCart: () => void;
};

const Checkout = ({hidehandleCart}: Props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true,
    });

    const name = useRef<HTMLInputElement>(null);
    const street = useRef<HTMLInputElement>(null);
    const zip = useRef<HTMLInputElement>(null);
    const city = useRef<HTMLInputElement>(null);

    const isEmpty = (value: string) => value.trim() === "";
    const isNotFiveChars = (value: string) => value.trim().length !== 5;

    const confirmHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const setmeal = {
            name: name.current!.value,
            street: street.current!.value,
            postalCode: zip.current!.value,
            city: city.current!.value,
        }
        console.log(setmeal);


    const enteredName = !isEmpty(setmeal.name);
    const enteredStreet = !isEmpty(setmeal.street);
    const enteredZip = !isNotFiveChars(setmeal.postalCode);
    const enteredCity = !isEmpty(setmeal.city);

    setFormInputsValidity({name: enteredName,
        street: enteredStreet,
        postal: enteredZip,
        city: enteredCity,});


 const formisValid = enteredName && enteredStreet && enteredZip && enteredCity;
    if(!formisValid){
      throw new Error('Invalid input');
      return; 
    }
};
  return (
    <form className={classes.form} onSubmit = {confirmHandler}>

      <div className={`${classes.control} ${!formInputsValidity.name && classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref = {name} />
      </div>
{!formInputsValidity.name && <p>Please enter a valid name</p>}

<div className={`${classes.control} ${!formInputsValidity.street && classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref = {street} />
      </div>
{!formInputsValidity.street && <p>Please enter a valid street</p>}

<div className={`${classes.control} ${!formInputsValidity.postal && classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref = {zip}/>
      </div>
{!formInputsValidity.postal && <p>Please enter a valid postal code</p>}

<div className={`${classes.control} ${!formInputsValidity.city && classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref = {city}/>
      </div>
{!formInputsValidity.city && <p>Please enter a valid city</p>}

      <div className={classes.actions}>
    <button type="button" onClick={hidehandleCart}>Cancel</button>
     <button >Confirm</button> 
    </div>

    </form>
  );
};

export default Checkout;
