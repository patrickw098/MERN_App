import React from 'react';
import { connect } from 'react-redux';

import SearchBox from './search/search_box';

class Body extends React.Component {
    
    render() {
        const { currentUser } = this.props;

        return (
            <main className="main-body">
                { currentUser ? (
                    <SearchBox />
                ) : ( null ) }
                <div className="carousel-div">
                    Some Carousel
                </div>
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