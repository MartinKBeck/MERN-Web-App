import React from "react";
import axios from 'axios';
import loginImg from "../../login.svg";

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      username: '',
      password: ''
    }
  }

  onChangeUsername(e){
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword(e){
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const checkUser = {
      username: this.state.username,
      password: this.state.password
    }

    axios.post('http://localhost:4000/user/verify', checkUser)
    .then(res => console.log(res.data));

    this.setState({
      username: '',
      password: ''
    })

  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
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
