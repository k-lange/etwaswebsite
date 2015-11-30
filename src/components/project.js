import React, { Component } from 'react';
import Image from './image';

import { projectsMap } from 'models/projects';

class Project extends Component {
    render() {
        const { images, content} = projectsMap[this.props.params.project];

        return (
            <div>
                <div className="meta">
                    <h1>{content.title}</h1>
                    <div className="description"
                        dangerouslySetInnerHTML={{__html: content.__content }}>
                    </div>
                </div>
                <div className="content">
                    {images.map(image => {
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
