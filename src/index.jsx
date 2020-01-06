import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Cart from './components/Cart/Cart';
import ProductList from './components/ProductList/ProductList';

import { fetchProducts } from './api/Products.js';

import './core/styles.scss';

function App() {
  const [counter, setCounter] = useState(0);
  const [productsList, setProductsList] = useState([]);

  const sw = navigator.serviceWorker;

  const decrement = () => {
    stateToServiceWorker({
      state: counter - 1
    });

    setCounter(counter - 1);
  };

  const increment = () => {
    stateToServiceWorker({
      state: counter + 1
    });

    setCounter(counter + 1);
  };

  const stateToServiceWorker = data => {
    // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/controller
    // controller: read-only property of the ServiceWorkerContainer interface which returns a ServiceWorker object if its state is activated
    // The ServiceWorker interface inherits methods from its parent, Worker
    if (sw?.controller) {
      sw.controller.postMessage(data);
    }
  };

  useEffect(() => {
    if (sw) {
      // Best practice: https://developers.google.com/web/fundamentals/primers/service-workers/registration
      window.addEventListener('load', () => {
        // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register
        sw.register('./sw.js')
          // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/ready
          .then(() => sw.ready)
          .then(() => {
            sw.addEventListener('message', ({ data }) => {
              console.log('[SW] Service Worker data: ', data);

              if (data?.state !== undefined) {
                setCounter(data.state);
              }
            });
          })
          .catch(error => {
            console.log('[SW] Service Worker register error: ', error);
          });
      });
    }
  }, [setCounter, sw]);

  useEffect(() => {
    fetchProducts().then(({ products }) => {
      setProductsList(products);
    });
  }, []);

  return (
    <div className="App">
      {
        <div className="container">
          <Cart counter={counter} />
          <ProductList
            productList={productsList}
            decrement={decrement}
            increment={increment}
          />
        </div>
      }
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
