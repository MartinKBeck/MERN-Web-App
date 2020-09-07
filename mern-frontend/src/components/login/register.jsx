import React from "react";
import loginImg from "../../login.svg"

export class Register extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            email: '',
            password: ''
        }

        

    }
    onChangeUserName(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    render() {
        return <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Register</div>
            <div className="content">
                <div className="image">
                    <img src={loginImg} alt="User Login/Register"/>
                </div>
                <div className="form">
                    <div classNam="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username"/>
                    </div>
                    <div classNam="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" placeholder="email"/>
                    </div>
                    <div classNam="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" placeholder="password"/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn">Register</button>
            </div>
        </div>
    }
}