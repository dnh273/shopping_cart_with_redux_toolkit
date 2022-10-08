import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductApi } from "../../redux/reducer/shopReducer";
import Carts from "./Carts";
import ProductItem from "./ProductItem";

export default function Products() {
  const { dataProduct } = useSelector((state) => state.shopReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductApi());
  }, []);
  return (
    <div className="container">
      <h3>Shoes Shop</h3>
      <Carts />

      <h3 className="mt-2">Product list</h3>
      <div className="row">
        {dataProduct.map((item, index) => {
          return (
            <div className="col-4" key={index}>
              <ProductItem product={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
