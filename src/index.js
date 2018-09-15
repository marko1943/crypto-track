import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'font-awesome/css/font-awesome.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
