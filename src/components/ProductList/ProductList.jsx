import React from "react";

import Product from "./Product";

import "./ProductList.scss";

export default function ProductList({ productList, decrement, increment }) {
  return (
    <div className="ProductList">
      {productList.map(product => {
        return (
          <Product
            key={product.id}
            decrement={decrement}
            increment={increment}
            {...product}
          />
        );
      })}
    </div>
  );
}
