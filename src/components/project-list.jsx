import React, { Component } from 'react';
import { Link } from 'react-router';

import { categoriesMap } from 'models/projects';

class ProjectList extends Component {
    render() {
        const category = this.props.params.category;
        const projects = categoriesMap[category];
        
        return (
            <div>
                <menu className='projects'>
                    {projects.map(project => {
                        return (
                            <li key={project.id}>
                                <Link activeClassName="active" to={`/${category}/${project.id}`}>
                                    {project.content.title}
                                </Link>
                            </li>
                        );
                    })}
                </menu>
                {this.props.children}
            </div>
        );
    }
}


export default ProjectList;
