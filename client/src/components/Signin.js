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
}