import React from 'react';
import { connect } from 'react-redux';
import { debounce } from '../../utils/timeout_utils';
import { makeQuery } from '../../utils/image_utils';
import { saveCurrentQuery } from '../../actions/image_actions';

import './search_box.css';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.runAjax =
            debounce(() => {
                console.log("ajax call for autocomplete of", this.state.query);
            }, 1000);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let input = document.getElementById('input-bar');

        input.focus();
    }

    handleSubmit(e) {
        e.preventDefault();

        // this.props.saveCurrentQuery(this.state.query);
        this.props.makeQuery(this.state);

        this.setState({ 
            query: ""
        })
    }

    handleChange(e) {
        e.preventDefault();

        // debounce for auto complete
        this.setState({
            query: e.target.value
        }, () => {
            if ( this.state.query.length > 1 ) {
                this.runAjax();
            }
        })
    }

    render() {
        const { currentUser } = this.props;

        return (
            <div className="search-box-div" onSubmit={this.handleSubmit}>
                <h1 className="welcome-message">Welcome, { currentUser.name }</h1>
                <form className="search-box-subdiv">
                    <input id="input-bar" onChange={this.handleChange} className="search-box-input" value={this.state.query} placeholder="What would you like to eat?"/>
                    <button className='search-button' onClick={this.handleSubmit}><i class="fas fa-search"></i></button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.session,
})

const mapDispatchToProps = dispatch => ({
    makeQuery: (query) => dispatch(makeQuery(query)),
    saveCurrentQuery: (query) => dispatch(saveCurrentQuery(query)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);