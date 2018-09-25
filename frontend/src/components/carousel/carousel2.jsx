import React from 'react';
import { connect } from 'react-redux';

import { getMoreImages } from '../../utils/image_utils';

import { receiveImage } from '../../actions/image_actions';

import { register } from '../../actions/modal_actions';

import Photo from '../photos/photo';

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
        this.openModal = this.openModal.bind(this);
    }

    componentDidMount() {
        this.event = document.addEventListener('keydown', this.detectKeyDown);
        this.props.receiveImage(this.props.images[this.state.idx])
    }

    componentWillReceiveProps(newProps) {
        if ( newProps.images.length - 1 < this.state.idx ) {
            this.setState({
                idx: 0,
            }, () => {
                this.props.receiveImage(newProps.images[this.state.idx])
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
        }, () => {
            this.props.receiveImage(this.props.images[this.state.idx])
        })
    }

    moveRight() {    
        this.setState({
            idx: this.state.idx + 1
        }, () => {
            this.props.receiveImage(this.props.images[this.state.idx])
        })
    }

    bufferImages() {
        console.log("buffering...");
        const { nextBusinesses } = this.props.businesses;

        if (nextBusinesses && nextBusinesses.length > 1) {
            this.props.getMoreImages({ businesses: nextBusinesses })
        }
    }

    openModal(e) {
        e.preventDefault();
        this.props.register('Icons');
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
                        <li className="right-li" onClick={this.moveLeft}>
                            {/* <img className="right-photo" onClick={this.moveLeft} src={images[idx - 1].url} ></img> */}
                            <Photo key={images[idx - 1].id}
                                url={images[idx - 1].url} current=''
                                business_url={images[idx - 1].business_url}
                                info={this.props.businesses[images[idx - 1].businessId]}
                                center={false}
                            />
                        </li>
                    ) : ( <li className="white-rect"></li> )}
                    <li className="center-li" onClick = {this.openModal}>
                        {/* <img className="center-photo" src={images[idx].url} ></img> */}
                        <Photo key={images[idx].id}
                            url={images[idx].url} current=''
                            business_url={images[idx].business_url}
                            info={this.props.businesses[images[idx].businessId]}
                            // center={true}
                        />
                    </li>
                    { images[idx + 1] ? (
                        <li className="left-li" onClick={this.moveRight}>
                            {/* <img className="left-photo" onClick={this.moveRight} src={images[idx + 1].url} ></img> */}
                            <Photo key={images[idx + 1].id}
                                url={images[idx + 1].url} current=''
                                business_url={images[idx + 1].business_url}
                                info={this.props.businesses[images[idx + 1].businessId]}
                                center={false}
                            />
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
    currentUser: state.session.id,
    currentImage: state.entities.currentImage
})

const mapDispatchToProps = dispatch => ({
    getMoreImages: (businesses) => dispatch(getMoreImages(businesses)),
    receiveImage: (img) => dispatch(receiveImage(img)),
    register: (txt) => dispatch(register(txt))
})

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);