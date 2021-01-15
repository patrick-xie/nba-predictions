import React from 'react';
      import ReactDOM from 'react-dom';
      import 'bootstrap/dist/css/bootstrap.min.css';       // add this
      import './index.css';
      import App from './App';
      import * as serviceWorker from './serviceWorker';

      ReactDOM.render(<App />, document.getElementById('root'));
      serviceWorker.unregister();
