import React from 'react';
import { connect } from 'react-redux';

import SearchBox from './search/search_box';
import Carousel from './carousel/carousel2';

class Body extends React.Component {
    
    render() {
        const { currentUser } = this.props;

        return (
            <main className="main-body">
                <div className="carousel-div">
                    <Carousel />
                </div>
                {currentUser ? (
                    <SearchBox />
                ) : <div className="search-box-div"><h2 className="slogan">Feast Your Eyes</h2></div>}
            </main>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.session.id,
}) 

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Body);