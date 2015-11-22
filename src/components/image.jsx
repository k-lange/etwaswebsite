import React, { Component } from 'react';

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = { src: props.placeholder };
    }

    componentDidMount() {
        this.loader = document.createElement('img');
        this.loader.src = this.props.src;
        this.handleLoad = () => this.setState({ src: this.props.src });
        this.loader.addEventListener('load', this.handleLoad);
    }

    componentWillUnmount() {
        this.loader.removeEventListener('load', this.handleLoad);
    }

    handleLoad() {
        this.setState({ src: this.props.src });
    }

    render() {
        return(
            <img src={this.state.src} />
        )
    }
}

export default Image;
