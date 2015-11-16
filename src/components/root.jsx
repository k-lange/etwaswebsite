import React, { Component } from 'react';
import { Link } from 'react-router';

import { categories } from 'models/projects';

class Root extends Component {
    render() {
        return (
            <div>
                <menu className='main'>
                    {categories.map(category => {
                        return (
                            <li key={category.id}>
                                <Link to={`/${category.id}`} state={ { projects: category.projects } }>
                                    {category.name}
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

export default Root;
