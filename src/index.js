import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import reducer from "./redux/reducer";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import ReduxToastr from 'react-redux-toastr'

import  {persistStore, persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage"
import {PersistGate} from 'redux-persist/es/integration/react'

const persistConfig = {
  key: "root",
  storage
}

const reducers = combineReducers({
  toastr: toastrReducer,
  reducer,
});

const persistedReducer =  persistReducer(persistConfig, reducers)
 
const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <App />
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="bottom-right"
            getState={(state) => state.toastr} // This is the default
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
        </PersistGate>  
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
