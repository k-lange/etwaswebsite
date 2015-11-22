import React, { Component } from 'react';

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = { src: props.image.placeholder };
    }

    componentDidMount() {
        const {src} = this.props.image;
        this.loader = document.createElement('img');
        this.loader.src = src;
        this.handleLoad = () => this.setState({ src, loaded: true });
        this.loader.addEventListener('load', this.handleLoad);
    }

    componentWillUnmount() {
        this.loader.removeEventListener('load', this.handleLoad);
    }

    render() {
        return(
            <img className={this.state.loaded ? '' : 'is-loading'} src={this.state.src} />
        )
    }
}

export default Image;
