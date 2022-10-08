import React from "react";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../../redux/reducer/shopReducer";

export default function ProductItem(props) {
  const { product } = props;

  const dispatch = useDispatch();
  return (
    <div className="card">
      <img src={product.image} alt=".." />
      <div className="card-body">
        <h2>{product.name}</h2>
        <p>{product.price}</p>
        <button
          className="btn btn-secondary"
          onClick={() => {
            dispatch(addToCartAction(product));
          }}
        >
          Add to cart
          <i className="fa fa-cart-plus" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
