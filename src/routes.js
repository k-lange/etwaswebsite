import Root from './components/root';
import Home from './components/home';
import ProjectList from './components/project-list';
import Project from './components/project';

export default {
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
