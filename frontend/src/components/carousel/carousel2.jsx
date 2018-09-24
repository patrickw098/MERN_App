import React from 'react';
import { connect } from 'react-redux';

import { getMoreImages } from '../../utils/image_utils';

import './carousel.css';

class Carousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            idx: 0,
        }

        this.detectKeyDown = this.detectKeyDown.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
    }

    componentDidMount() {
        this.event = document.addEventListener('keydown', this.detectKeyDown);
    }

    componentWillReceiveProps(newProps) {
        if ( newProps.currentUser.id ) {
            this.setState({
                idx: 0,
            })
        }
    }

    detectKeyDown(e) {
        if (e.key === 'ArrowUp') {
        }
        else if (e.key === 'ArrowDown') {
        }
        else if (e.key === 'ArrowRight') {
            e.preventDefault();
            if ( this.state.idx < this.props.images.length - 1) {
                this.moveRight();
            }
        }
        else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if ( this.state.idx > 0 ) {
                this.moveLeft();
            }
        }
    }

    moveLeft() {
        this.setState({
            idx: this.state.idx - 1
        })
    }

    moveRight() {    
        this.setState({
            idx: this.state.idx + 1
        })
    }

    bufferImages() {
        console.log("buffering...");
        const { nextBusinesses } = this.props.businesses;

        if (nextBusinesses && nextBusinesses.length > 1) {
            this.props.getMoreImages({ businesses: nextBusinesses })
        }
    }

    render() {
        const { images } = this.props;
        let { idx } = this.state;

        if (idx > images.length - 3) {
            this.bufferImages();
        }
        
        return (
            <div className="carousel">
                <ul className="carousel-wrapper">
                    { images[idx - 1] ? ( 
                        <li>
                            <img className="right-photo" onClick={this.moveLeft} src={images[idx - 1].url} ></img>
                        </li>
                    ) : ( <li className="white-rect"></li> )}
                    <li>
                        <img className="center-photo" src={images[idx].url} ></img>
                    </li>
                    { images[idx + 1] ? (
                        <li>
                            <img className="left-photo" onClick={this.moveRight} src={images[idx + 1].url} ></img>
                        </li>
                    ) : ( <li className="white-rect"></li> )}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    businesses: state.entities.businesses,
    images: state.entities.images,
    currentUser: state.session.id
})

const mapDispatchToProps = dispatch => ({
    getMoreImages: (businesses) => dispatch(getMoreImages(businesses))
})

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);