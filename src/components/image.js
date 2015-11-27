import React, { Component } from 'react';

class Image extends Component {
    constructor(props) {
        super(props);

        const {image} = props;

        this.state = {
            src: image.placeholder,
            aspect: (image.height / image.width * 100) + '%'
        };
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
            <div className={this.state.loaded ? 'image' : 'image is-loading'}
                style={{
                    backgroundImage: `url(${this.state.src})`,
                    paddingBottom: this.state.aspect
                }} />
        )
    }
}

export default Image;
