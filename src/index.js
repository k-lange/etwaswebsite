import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import routes from './routes';
import './main.less';

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

render(<Router history={createBrowserHistory()} routes={routes} />, rootElement);
