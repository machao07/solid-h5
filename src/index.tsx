/* @refresh reload */
import { render } from 'solid-js/web'
import { Router } from "@solidjs/router";
import './index.css';
import './style/reset.css';
import App from './App'

import 'amfe-flexible/index.js';

const root = document.getElementById('root')

render(() => (
    <Router>
        <App />
    </Router>
), root!)
