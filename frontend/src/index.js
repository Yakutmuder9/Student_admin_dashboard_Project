import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from "./redux/store"
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

