import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { clearBasket, removeItem } from '../actions';
import './Basket.css'; 

function Basket() {
  const user = useSelector((state) => state.user);
  const basket = useSelector((state) => state.basket);

  const dispatch = useDispatch();

  const totalItems = basket.reduce((total, { quantity }) => total + quantity, 0);

  const totalPrice = basket.reduce(
    (total, { item, quantity }) => total + item.price * quantity,
    0
  );

  const handleCheckout = () => {
    // Logique pour valider la commande
    // ...
  };

  return (
    <div>
      <h2>Coucou {user.firstname} !</h2>
      <div className="basket-header">
      <h3>Tu as {totalItems} articles Total : {totalPrice} €</h3>
      <button type="button" onClick={() => handleCheckout()}>
        Valider
      </button>
      <button onClick={() => dispatch(clearBasket())}>Vider le panier</button>
      </div>
      <hr />

      <div className="basket-container">
        {basket.length > 0 &&
          basket.map(({ id, item, quantity }) => (
            <Product key={id} product={item}>
              <div>
                <p>
                  <strong>Quantité : {quantity}</strong>
                </p>
                <button type="button" onClick={() => dispatch(removeItem(id))}>
                  Supprimer
                </button>
              </div>
            </Product>
          ))}
      </div>
      
    </div>
  );
}

export default Basket;



// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Product from '../components/Product';
// import { clearBasket, removeItem } from '../actions';

// function Basket() {
//   const user = useSelector((state) => state.user);
//   const basket = useSelector((state) => state.basket);

//   const dispatch = useDispatch();

//   return (
//     <div>
//       <h2>Coucou {user.firstname}!</h2>
//       <h3>Tu as  {basket.length} articles </h3>
//       <button onClick={() => dispatch(clearBasket())}>Clear basket</button>
//       <hr />

//       <div className="basket-container">
//         {basket.length > 0 &&
//           basket.map(({ id, item, quantity }) => (
//             <Product key={id} product={item}>
//               <div>
//                 <p>
//                   <strong>Quantity : {quantity}</strong>
//                 </p>
//                 <button type="button" onClick={() => dispatch(removeItem(id))}>
//                   Remove
//                 </button>
//               </div>
//             </Product>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default Basket;
