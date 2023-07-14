import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import App from './App'; // import your root component
import './index.css'

import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);