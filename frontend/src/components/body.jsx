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
                ) : <h1 className="search-box-div">Decide, what you want to eat by the way it looks.</h1>}
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