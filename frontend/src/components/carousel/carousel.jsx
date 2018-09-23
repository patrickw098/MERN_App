import React from 'react';
import { connect } from 'react-redux';

import Photo from '../photos/photo';

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

    visitBusiness(){
        //go to business's page when photo gets selected
    }

    rotateImages(direction){
        let { currentImages, images, currentIdx, noImg } = this.state;
        const newIdx = currentIdx + direction;
        //if new Index is still in current images, return the currentImages
        if ( currentImages.includes(newIdx) ) return currentImages;
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

    nextPhoto(e){
        e.preventDefault();

        if( this.state.currentIdx < this.state.images.length - 1 ){
            this.setState({
                currentIdx: this.state.currentIdx + 1,
                currentImages: this.rotateImages(1)
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
                currentImages: this.rotateImages(-1)
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

    render(){
        const {images, currentImages, currentIdx} = this.state;
        // console.log('current',currentImages);
        return (
            <div className='carousel' tabIndex='0' onKeyDown = {this.detectKeyDown}>
                <button className='button left-button' 
                    onClick={this.prevPhoto}
                    >Previous</button>
                <div className="carousel-wrapper">
                    {currentImages.map(index => {
                        return <Photo key={images[index].id} url={images[index].url} current = {index === currentIdx ? 'active-photo' : ''}/>
                    })}
                </div>
                <button className='button right-button' 
                    onClick={this.nextPhoto}
                    >More</button>
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    images: state.entities.images,
    currentUser: state.session,
})

const mapDispatchToProps = (dispatch) => ({
    // logoutUser: () => dispatch(logoutUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);