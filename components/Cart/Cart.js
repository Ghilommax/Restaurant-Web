import react,{ useContext,useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './checkout';
import { useEffect } from 'react/cjs/react.development';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [ordermaked, setordermaked] = useState(false);
  const [issubmited, setissubmited] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
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
const orderhandler = () =>{
setordermaked(true);
}
const confirmhandler = async (userdata) =>{
        const res = await fetch('https://movieapi-6269e-default-rtdb.firebaseio.com/orderS.json', {
          method:'POST',
          body:JSON.stringify({
            info:userdata,
            items:cartCtx.items
          })
        })
        setissubmited(true);
        cartCtx.clearItem();
}
const allfunction = <react.Fragment>
{cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {ordermaked && <Checkout onCancel = {props.onClose} onConfirm = {confirmhandler}></Checkout>}
     {!ordermaked && <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {  hasItems && <button className={classes.button} onClick = {orderhandler}>Order</button>}
      </div>}
</react.Fragment>
  return (
    <Modal onClose={props.onClose}>
      {!issubmited && allfunction}
      {issubmited && <p>your data is successfully submited</p>}
      {issubmited && <button className= {classes['button--alt']} onClick={props.onClose} > close</button>}
    </Modal>
  );
};

export default Cart;
