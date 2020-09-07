import React from "react";
import axios from 'axios';
import loginImg from "../../login.svg";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
    }

  }

  onChangeUsername(e){
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e){
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e){
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    // Console Log Testing Information
    // console.log(`Form submitted:`);
    // console.log(`Username: ${this.state.username}`)
    // console.log(`Email: ${this.state.email}`)
    // console.log(`Password: ${this.state.password}`)

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    axios.post('http://localhost:4000/user', newUser)
    .then(res => console.log(res.data));

    this.setState({
      username: '',
      email: '',
      password: ''
    })


  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="Women looking at computer"/>
          </div>
          
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" 
              name="username" 
              placeholder="username" 
              value={this.state.username}
              onChange={this.onChangeUsername}/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" 
              name="email" 
              placeholder="email"
              value={this.state.email}
              onChange={this.onChangeEmail}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">password</label>
              <input type="text" 
              name="password" 
              placeholder="password" 
              value={this.state.password}
              onChange={this.onChangePassword}/>
            </div>
            <div className="form-group">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
