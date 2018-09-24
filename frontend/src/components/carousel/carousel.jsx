import React from 'react';
import { connect } from 'react-redux';
import {Route, Link} from 'react-router-dom';

import Photo from '../photos/photo';

import { getMoreImages } from '../../utils/image_utils';
// import { truncate } from 'fs';
import './carousel.css';

class Carousel extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            images: this.props.images,
            currentIdx: 0,
            currentImages: [0, 1, 2],
            noImg: 'https://cdn.dribbble.com/users/55871/screenshots/2158022/no_photo_1x.jpg'
        }

        this.nextPhoto = this.nextPhoto.bind(this);
        this.prevPhoto = this.prevPhoto.bind(this);
        this.detectKeyDown = this.detectKeyDown.bind(this);
        this.handleArrowClick = this.handleArrowClick.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            images: newProps.images,
        })
    }

    componentWillMount(){
        //this does not require user to focus on the carousel
        // document.addEventListener('keydown', this.detectKeyDown);
    }

    componentWillUnmount(){
        //this does not require user to focus on the carousel
        // document.removeEventListener('keydown', this.detectKeyDown);
    }

    visitBusiness(url){
        //go to business's yelp page when photo gets selected
        // window.location = url;
    }

    switchImage(direction){
        let { currentImages, currentIdx} = this.state;
        const newIdx = currentIdx + direction;
        //if new Index is still in current images, return the currentImages
        if (currentImages.includes(newIdx)) return currentImages;

        const newImages = this.rotateImages(direction);
        return newImages;
    }


    rotateImages(direction){
        let { currentImages, images, noImg, currentIdx } = this.state;
        const newIdx = currentIdx + direction;

        if (newIdx > images.length -1 || newIdx < 0) return currentImages;
        //if forward direction, update by 3
        let newImages;
        if ( direction > 0 ){
            newImages = currentImages.map((el) => el + 3);
        } else {
            newImages = currentImages.map((el) => el - 3);
        }

        //take care of the images if there are not a multiple of 3 
        const len = images.length;
        const copy = images.slice(0);
        for( let i = 0; i < newImages.length; i++ ){
            if( newImages[i] > len - 1 ){
                copy.push({
                    url: noImg,
                    id: newImages[i]
                })
            }
        }

        if ( len !== copy.length ){
            this.setState({
                images: copy
            }, () => console.log(copy))
        }

        return newImages;
    }

    handleArrowClick(direction, e){
        e.preventDefault();
        const {currentIdx, images} = this.state;
        const newIdx = currentIdx + direction;
        if(newIdx >= 0 && newIdx < images.length - 1){
            this.setState({
                currentIdx: newIdx,
                currentImages: this.rotateImages(direction)
            })
        }
    }

    nextPhoto(e){
        e.preventDefault();

        if( this.state.currentIdx < this.state.images.length - 1 ){
            this.setState({
                currentIdx: this.state.currentIdx + 1,
                currentImages: this.switchImage(1)
            }, () => {
                console.log(this.state);
            })
        }

        // if (this.state.currentIdx > 5){
        //     //make api call to yelp to update the state of the images
        // }
    }

    prevPhoto(e){
        e.preventDefault();
        if ( this.state.currentIdx > 0 ) {
            this.setState({
                currentIdx: this.state.currentIdx - 1,
                currentImages: this.switchImage(-1)
            }, () => {
                console.log(this.state);
            })
        }
    }

    detectKeyDown(e){
        if ( e.key === 'ArrowUp' ) {
        }
        else if ( e.key === 'ArrowDown' ) {
        }
        else if ( e.key === 'ArrowRight' ) {
            e.preventDefault();
            this.nextPhoto(e);
        }
        else if ( e.key === 'ArrowLeft' ) {
            e.preventDefault();
            this.prevPhoto(e);
        } 
    }

    bufferImages() {
        console.log("buffering...");
        const { nextBusinesses } = this.props.businesses;

        if ( nextBusinesses && nextBusinesses.length > 1 ) {
            this.props.getMoreImages({ businesses: nextBusinesses })
        }
    }

    render(){
        const { currentImages, currentIdx } = this.state;
        const { images } = this.props;

        if ( currentIdx > images.length - 3 ) {
            this.bufferImages();
        }

        if ( images.index ) {
            return ( null )
        } else {

            return (
                <div className='carousel' tabIndex='0' onKeyDown = {this.detectKeyDown}>
                    <button className='button left-button' 
                        onClick={(e) => this.handleArrowClick(-3,e)}
                        >    
                        <i className="fas angle fa-angle-double-left"></i>
                        </button>
                    <div className = 'wrapper'>
                        <div className="carousel-wrapper">
                            {currentImages.map(index => {
                                return <Photo key={images[index].id} 
                                url={images[index].url} current = {index === currentIdx ? 'active-photo' : ''}
                                business_url={images[index].business_url}
                                visitBusiness={this.visitBusiness}
                                info = {this.props.businesses}
                                />
                            })}
                        </div>
                        <div className='selectors'>
                            <button className = 'button left-select' onClick ={this.prevPhoto}> 
                                <i className="fas angle fa-angle-left"></i>
                            </button>
                            <button className = 'button right-select' onClick = {this.nextPhoto}>
                                <i className="fas angle fa-angle-right"></i>
                            </button>
                        </div>
                    </div>
                    <button className='button right-button' 
                        onClick={(e) => this.handleArrowClick(3,e)}
                        >
                        <i className="fas angle fa-angle-double-right"></i>
                        </button>
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => ({
    images: state.entities.images,
    currentUser: state.session,
    businesses: state.entities.businesses
})

const mapDispatchToProps = (dispatch) => ({
    getMoreImages: (businesses) => dispatch(getMoreImages(businesses)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);