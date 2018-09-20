import React from 'react';
import { connect } from 'react-redux';

import { loginUser, registerUser } from '../../../utils/session_api_utils';
import '../../styles/sign_in.css';

class SignInForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // this.props.clearErrors();
        let input = document.getElementById("form-input-id");
        input.focus();
    }

    handleChange(type) {
        return (e) => {
            this.setState({
                [type]: e.target.value
            });
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        const { loginUser, registerUser, action } = this.props;

        if ( action === 'Sign Up' ) {
            registerUser(this.state);
        } else {
            loginUser(this.state);
        }
    }

    render() {
        const type = this.props.action;
        let greeting, name, passwordTwo;

        if ( type === 'Sign Up' ) {
            greeting = <div className="sign-up-welcome">
            <p>Welcome to NomWheels!</p>
            <p>Please create an account!</p>
            </div>
            name = 
                    ( <label>
                        <div>Name</div>
                        <input type="text" onChange={this.handleChange('name')} value={this.state.name}></input>
                    </label> )
            passwordTwo = 
                    ( <label>
                        <div>Confirm Password</div>
                        <input type="password" onChange={this.handleChange('password2')} value={this.state.password2}></input>
                    </label> )
        } else {
            greeting = <div className="sign-up-welcome">
            <p> Welcome Back!</p> 
            <p>Please sign in.</p>
            </div>
            name = null;
            passwordTwo = null;
        }

        return (
            <div className='sign-in-form'>
                { greeting } 
                <form onSubmit={this.handleSubmit}>
                    <label><div>Email</div>
                        <input id="form-input-id" type="text" onChange={this.handleChange('email')} value={this.state.email}></input>
                    </label>
                    { name } 
                    <label><div>Password</div>
                        <input type="password" onChange={this.handleChange('password')} value={this.state.password}></input>
                    </label>
                    { passwordTwo }
                    <button className='sign-in-button' onClick={this.handleSubmit}>{type}</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    action: state.ui.modal
})

const mapDispatchToProps = dispatch => ({
    loginUser: (user) => dispatch(loginUser(user)),
    registerUser: (user) => dispatch(registerUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);