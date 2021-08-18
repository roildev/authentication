import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
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
            <form onSubmit={e => this.props.handle_login(e, this.state)}>
                <h4>Log In</h4>
                <div className="row mb-3">
                    <label htmlFor="inputUsername" className="form-label">Username</label>
                    <div className="input-group has-validation col-sm-10">
                        <input 
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handle_change}
                            className={`form-control ${!!('non_field_errors' in this.props.errors) ? 'is-invalid' : ''}`}
                            aria-describedby="inputGroupPrepend"
                            required
                            id="inputUsername" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="form-label">Password</label>
                    <div className="input-group has-validation col-sm-10">
                        <input 
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handle_change}
                            className={`form-control ${!!('non_field_errors' in this.props.errors) ? 'is-invalid' : ''}`}
                            id="inputPassword3" />
                        <div className="invalid-feedback">
                            {!!('non_field_errors' in this.props.errors) ? this.props.errors['non_field_errors'][0] : ''}
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
        );
    }
}

export default LoginForm;

LoginForm.propTypes = {
    handle_login: PropTypes.func.isRequired
};