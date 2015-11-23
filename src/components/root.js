import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

import { categories } from 'models/projects';

class Root extends Component {
    render() {
        return (
            <div>
                <menu className='main'>
                    {categories.map(category => {
                        return (
                            <li key={category.id}>
                                <Link activeClassName="active" to={`/${category.id}`} state={ { projects: category.projects } }>
                                    <span>{category.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                    <li>
                        <IndexLink activeClassName="active" to="/">
                            <span>vonluise</span>
                        </IndexLink>
                    </li>
                </menu>
                {this.props.children}
            </div>
        );
    }
}

export default Root;
