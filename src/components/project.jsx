import React, { Component } from 'react';
import Image from './image';

import { projectsMap } from 'models/projects';

class Project extends Component {
    getProject() {
        return projectsMap[this.props.params.project];
    }

    render() {
        return (
            <div>
                <div className="meta">
                    <h1>{ this.getProject().content.title }</h1>
                    <p className="description">
                        { this.getProject().content.description }
                    </p>
                </div>
                <div className="content">
                    {this.getProject().images.map(image => {
                        return (
                            <Image key={image.src} image={image} />
                        );
                    })}
                </div>
            </div>
        );
    }
}


export default Project;
