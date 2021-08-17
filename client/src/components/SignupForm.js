import React from 'react';
import PropTypes from 'prop-types';

class SignupForm extends React.Component {
    state = {
        username: '',
        password: ''
    };

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };

    render() {
        return (
            <form onSubmit={e => this.props.handle_signup(e, this.state)}>
                <h4>Sign Up</h4>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input 
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handle_change}
                            className="form-control"
                            id="inputEmail3" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                    <input 
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handle_change}
                        className="form-control"
                        id="inputPassword3" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
        );
    }
}

export default SignupForm;

SignupForm.propTypes = {
    handle_signup: PropTypes.func.isRequired
};