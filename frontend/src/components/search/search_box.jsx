import React from 'react';
import { connect } from 'react-redux';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            query: e.target.value
        })
    }

    render() {
        const { currentUser } = this.props;

        return (
            <div className="search-box-div">
                <h1>Welcome, { currentUser.name }, what would you like to eat?</h1>
                <form className="search-box-subdiv">
                    <input onChange={this.handleChange} className="search-box-input" value={this.state.query}/>
                    <button>Search</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.session,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);