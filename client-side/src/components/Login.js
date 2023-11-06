import React,{useState} from "react";
import '../styles/Login.css';
import {connect} from 'react-redux';
import {actionLogin, actionLogout} from '../redux/index.js';
import {login} from '../api/user.js';

function Login(props){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = async (e)=>{
        e.preventDefault();
        
        try {
            const user = await login(email,password);
            
            console.log(user);
            props.actionLogin();
        } catch (error) {
            console.log('Incorrect credentials', error);
        }
    }
    return (
        <>
            <div className="login-container">
                <h2>Login to Bus Booking</h2>
                <form className="login-form">
                    <div className="form-group">
                        <label for="email">Email:</label>
                        <input type="email" name="email" id="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label for="password">Password:</label>
                        <input type="password" name="password" id="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" className="login-button" onClick={handleLogin}>
                        Login
                    </button>
                </form>
            </div>
        </>
    );
}

const mapStateToProps = state =>{
    return {
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        actionLogin: ()=>{dispatch(actionLogin())},
        // actionLogout: ()=>{dispatch(actionLogout())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);