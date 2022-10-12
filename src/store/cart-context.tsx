import { createContext } from 'react';
export interface ICart {
    id: number;
    name: string;
    description: string;
    price: number;
    amount: number;
  }

export type CartContextType = {
    totalAmount: number;
    items: ICart[];
    addItem: (item: ICart) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
  };

  const defalutCart={
  items:[],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  clearCart:()=>{}
  }

const CartContext = createContext<CartContextType |undefined| null>(defalutCart);
// const CartContext = React.createContext<CartContextType>({
//   items: [],
//   totalAmount: 0,
//   addItem: (item) => {},
//   removeItem: (id) => {}
// });

export default CartContext;