import React from 'react';

import Button from '../Button/Button';

import './Product.scss';

export default function Product({
  decrement,
  description,
  increment,
  name,
  price,
  src
}) {
  return (
    <div className={'Product'}>
      <img className="image" src={src} title={name} alt={name} />

      <div className="info-container">
        <div className="info-item name">{name}</div>
        <div className="info-item description">{description}</div>
        <div className="info-item price">{price}</div>
      </div>

      <div className="button-container">
        <Button label="ADD" onClick={increment} />
        <Button label="REMOVE" onClick={decrement} />
      </div>
    </div>
  );
}
