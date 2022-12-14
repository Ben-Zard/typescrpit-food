import React from 'react';
import classes from './Card.module.css';
type CardProps = {
  children: JSX.Element | JSX.Element[];
};
const Card = ({children}:CardProps) => {
  return <div className={classes.card}>{children}</div>
};

export default Card;