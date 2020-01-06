import React from 'react';
import Ripples from 'react-ripples';

import './Button.scss';

export default function Button({ label, onClick }) {
  return (
    <Ripples>
      <button className="Button" onClick={onClick}>
        {label}
      </button>
    </Ripples>
  );
}
