import React from 'react';
import { connect } from 'react-redux';
import { debounce } from '../../utils/timeout_utils';

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

        // debounce for auto complete
        this.setState({
            query: e.target.value
        }, debounce(() => {
            console.log("ajax call for autocomplete of", this.state.query);
        }, 2000))

      
    }

    render() {
        const { currentUser } = this.props;

        return (
            <div className="search-box-div">
                <h1>Welcome, { currentUser.name }, what would you like to eat?</h1>
                <form className="search-box-subdiv">
                    <input onChange={this.handleChange} className="search-box-input" value={this.state.query}/>
                    <button onClick={(e)=> e.preventDefault() }>Search</button>
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