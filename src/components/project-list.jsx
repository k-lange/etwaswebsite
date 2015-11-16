import React, { Component } from 'react';
import { Link } from 'react-router';

import { categoriesMap } from 'models/projects';

class ProjectList extends Component {
    getCategory() {
        return this.props.params.category;
    }

    getProjects() {
        return categoriesMap[this.getCategory()];
    }

    render() {
        return (
            <div>
                <menu className='projects'>
                    {this.getProjects().map(project => {
                        return (
                            <li key={project.id}>
                                <Link to={`/${this.getCategory()}/${project.id}`}>
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
