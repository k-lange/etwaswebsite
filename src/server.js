import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';

import routes from './routes';
import { categories, categoriesMap } from './models/projects';

const locations = ['/'];
const pages = [];

categories.forEach(category => {
    locations.push(`/${category.id}`);
    const projects = categoriesMap[category.id];
    projects.forEach(project => {
        locations.push(`/${category.id}/${project.id}`);
    });
});

locations.forEach((location, index) => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
        if (error || !renderProps) { return; }
        const html = renderToString(<RoutingContext {...renderProps} />);
        pages.push({ location, html });
    });
});

export default pages;
