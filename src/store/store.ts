/*import { createStore  } from 'redux';
import rootReducer from '../reducers/rootReducer';

export const store = createStore (rootReducer);*/

import { createStore  } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to local storage
import rootReducer from '../reducers/rootReducer';

const persistConfig = {
    key: 'root', // Key for the persist store
    storage, // Storage engine
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);