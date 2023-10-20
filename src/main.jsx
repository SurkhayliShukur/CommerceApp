import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import { ProductContextProvider } from './Context/ProductContext.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore ,persistReducer } from 'redux-persist'
import {HelmetProvider} from "react-helmet-async"
import rootReducer from './features/app/rootReducer.jsx'
import "./index.css";

const persistConfig = {
  key: root,
  storage,
}

const helmetContext = {}

const persistedReducer = persistReducer(persistConfig,rootReducer)
const store = configureStore({
  reducer: {
    persistedReducer,
  },
  devTools:true,
  middleware: [],
});
const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ProductContextProvider>
          <BrowserRouter>
          <HelmetProvider context={helmetContext}>
            <App />
          </HelmetProvider>
          </BrowserRouter>
        </ProductContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
