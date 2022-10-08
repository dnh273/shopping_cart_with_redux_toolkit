import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantityAction,
  delItemAction,
  getAllProductApi,
} from "../../redux/reducer/shopReducer";

export default function Carts() {
  const { cart } = useSelector((state) => state.shopReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductApi());
  }, []);

  console.log(cart);

  return (
    <>
      <h3>Carts</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img src={item.image} style={{ width: "50px" }} alt="anh1" />
                </td>
                <td>{item.price}</td>
                <td>
                  <button
                    className="btn btn-outline-primary mr-2"
                    onClick={() => {
                      const itemQuantity = {
                        id: item.id,
                        quantity: 1,
                      };
                      const action = changeQuantityAction(itemQuantity);
                      /*
                                        action = {
                                            type: "shopReducer/changeQuantityAction",
                                            payload: {
                                                 id: item.id,
                                                 quantity: 1
                                            }
                                        }
                                    */

                      dispatch(action);
                    }}
                  >
                    +
                  </button>
                  {item.quantity}
                  <button
                    className="btn btn-outline-primary ml-2"
                    onClick={() => {
                      const itemQuantity = {
                        id: item.id,
                        quantity: -1,
                      };
                      const action = changeQuantityAction(itemQuantity);

                      dispatch(action);
                    }}
                  >
                    -
                  </button>
                </td>
                <td>{item.price * item.quantity}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      dispatch(delItemAction(item.id));
                    }}
                  >
                    Del
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
