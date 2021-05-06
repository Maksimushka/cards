import React from 'react';
import {HashRouter} from 'react-router-dom';
import Routes from './routes/Routes';
import {store} from '../bll/store';
import {Provider} from 'react-redux';

function App() {
  return (
    <div>
      <HashRouter>
          <Provider store={store}>
              <Routes/>
          </Provider>
      </HashRouter>
    </div>
  );
}

export default App;
