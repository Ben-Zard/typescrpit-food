import React, { Ref } from 'react';

import classes from './Input.module.css';

type Props = {
  input:any,
  id:any,
  label:string
}

const Input = React.forwardRef((props: Props, ref: Ref<any> ) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
