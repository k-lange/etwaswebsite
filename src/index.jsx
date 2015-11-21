import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';

import './main.less';

import Root from './components/root';
import Home from './components/home';
import ProjectList from './components/project-list';
import Project from './components/project';

const routes = {
    path: '/',
    component: Root,
    indexRoute: { component: Home },
    childRoutes: [
        {
            path: ':category',
            component: ProjectList,
            childRoutes: [
                {
                    path: ':project',
                    component: Project
                }
            ]
        }
    ]
};

render(<Router routes={routes} />, document.body);
