import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import routes from './routes';
import './main.less';

render(<Router history={createBrowserHistory()} routes={routes} />, document.getElementById('root'));
