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
                    <div className="images">
                        {this.getProject().images.map(image => {
                            return (
                                <Image key={image.src} placeholder={image.placeholder} src={image.src} />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}


export default Project;
