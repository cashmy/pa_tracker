import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Drawer from '../components/Drawer/Drawer';


function App() {
  return (
    <Provider>
      <div>
        <Drawer />
      </div>
    </Provider>
  );
}

export default App;
