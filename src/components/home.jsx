import React, { Component } from 'react';
import content from '../../etwasvonluise/home.md';

class Home extends Component {
    getHtml() {
        return {
            __html: content.__content
        };
    }

    render() {
        return (
            <div className="content home" dangerouslySetInnerHTML={this.getHtml()}/>
        );
    }
}

export default Home;
