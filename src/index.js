import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Viestit from './Viestit';
import AnalogWatch from './AnalogWatch';
import TypicodeFetch from './TypicodeFetch';
import NWCustomerFetch from './NWCustomerFetch';

ReactDOM.render(<div>
    <NWCustomerFetch />
    <TypicodeFetch />
    <App />
    <AnalogWatch />
    <Viestit />
</div>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
