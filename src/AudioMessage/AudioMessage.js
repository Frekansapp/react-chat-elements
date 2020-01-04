import React, { Component } from 'react';
import './AudioMessage.css';

import FaCloudDownload from 'react-icons/lib/fa/cloud-download';
import FaError from 'react-icons/lib/fa/exclamation-triangle';
import FaPlay from 'react-icons/lib/fa/play';
import FaPause from 'react-icons/lib/fa/pause';
import FaPauseCircle from 'react-icons/lib/fa/pause-circle';
import FaPlayCircle from 'react-icons/lib/fa/play-circle';

export class AudioMessage extends Component {

    state = {
        play: false
    }
    audio = new Audio(this.props.data.uri)

    componentDidMount() {
        this.audio.addEventListener('ended', () => this.setState({ play: false }));
    }

    componentWillUnmount() {
        this.audio.removeEventListener('ended', () => this.setState({ play: false }));
    }

    togglePlay = () => {
        this.setState({ play: !this.state.play }, () => {
            this.state.play ? this.audio.play() : this.audio.pause();
        });
    }

    render() {
        const error = this.props.data.status && this.props.data.status.error === true;

        return (
            <div className='rce-mbox-file'>
                <button onClick={this.togglePlay}>
                    <div className="rce-mbox-file--icon">
                        {this.state.play ? <FaPause /> : <FaPlay />}
                        {this.props.data.size &&
                            <div className="rce-mbox-file--size">
                                {this.props.data.size}
                            </div>
                        }
                    </div>
                    <div className="rce-audio-file--text">
                        {this.props.text}
                    </div>
                    <div className="rce-mbox-file--buttons">
                        {
                            error &&
                            <span className="rce-error-button">
                                <FaError
                                    color='#ff3d3d' />
                            </span>
                        }
                    </div>
                </button>
            </div>
        );
    }
}

export default AudioMessage;