import React, { Component } from 'react';
import API from '../API';

class Signup extends Component {
  state = {
    username: '',
    password: ''
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    API.signup(this.state)
      .then(data => {
        if (data.error) {
          alert('Error occurred!');
        } else {
          this.props.signup(this.state.username);
          this.props.history.push('/signin');
        }
      });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <form className="text-center border border-light p-5">
          <p className="h4 mb-4">Sign up</p>
          <input
            name='username'
            id="defaultSignup"
            onChange={this.handleChange}
            value={username}
            className="form-control mb-4"
            placeholder="Username"
          />
          <input
            name='password'
            type='password'
            id="defaultSignupPassword"
            onChange={this.handleChange}
            value={password}
            className="form-control mb-4"
            placeholder="Password"
          />
          <button
            onClick={this.handleSubmit}
            className="btn btn-info btn-block my-4"
            type="submit">
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;