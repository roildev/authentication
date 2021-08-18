import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if (!!json.token) {
          localStorage.setItem('token', json.token);
          this.setState({
            errors: {},
            logged_in: true,
            displayed_form: '',
            username: json.user.username
          });
        } else {
          this.setState({
            errors: json,
            logged_in: false,
            displayed_form: 'login',
          })
        }
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if (!!json.token) {
          localStorage.setItem('token', json.token);
          this.setState({
            errors: {},
            logged_in: true,
            displayed_form: '',
            username: json.username
          });
        } else {
          this.setState({
            errors: json,
            logged_in: false,
            displayed_form: 'signup',
          })
        }
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm errors={this.state.errors} handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm errors={this.state.errors} handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div>
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        <div className="container">
          <div className="row">
            <div className="mt-3">
              {form}
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3>
            {this.state.logged_in
              ? `Hello, ${this.state.username}`
              : 'Please Log In'}
          </h3>
        </div>
      </div>
    );
  }
}

export default App;