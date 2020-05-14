import React from 'react';
import {render} from 'react-dom';
import {createStore, compose, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {PersistGate} from 'redux-persist/integration/react'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {rootReducer} from "./redux/rootReducer";
import {forbiddenWordsMiddleware} from "./redux/middleware";
import {sagaWatcher} from "./redux/sagas";
//import {store, persistor} from './redux/configureStore'


const saga = createSagaMiddleware()

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


let store = createStore(persistedReducer, compose(
    applyMiddleware(
        thunk, forbiddenWordsMiddleware, saga
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
let persistor = persistStore(store)

saga.run(sagaWatcher)

const app = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
)
render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
