import React from 'react';
import { connect } from 'react-redux';

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
    }

    render() {
        const type = this.props.action;
        let greeting, name, passwordTwo;

        if ( type === 'Sign Up' ) {
            greeting = <div className="sign-up-welcome">Welcome to NomWheels! Please create an account!</div>
            name = 
                    ( <label>
                        <div>Name</div>
                        <input type="text" onChange={this.handleChange('name')} value={this.state.name}></input>
                    </label> )
            passwordTwo = 
                    ( <label>
                        <div>Retype Password</div>
                        <input type="password" onChange={this.handleChange('password2')} value={this.state.password2}></input>
                    </label> )
        } else {
            greeting = <div className="sign-up-welcome">Welcome Back! Please sign in.</div>
            name = null;
            passwordTwo = null;
        }

        return (
            <div className='sign-in-form'>
                { greeting } 
                <form>
                    <label><div>Email</div>
                        <input id="form-input-id" type="text" onChange={this.handleChange('email')} value={this.state.email}></input>
                    </label>
                    { name } 
                    <label><div>Password</div>
                        <input type="password" onChange={this.handleChange('password')} value={this.state.password}></input>
                    </label>
                    { passwordTwo }
                    <button onClick={this.handleSubmit}>{type}</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    action: state.ui.modal
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);