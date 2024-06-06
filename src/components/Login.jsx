import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firbase.config';
import emailIcon from "../assets/email.png"
import passwordIcon from "../assets/password.png"
import { Link } from 'react-router-dom'
//Use of Firebase
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    //function used to authenticate and login and navigate to accounts 
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/account');
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    };
    return (
        <div className="container">
            <div className="header">
                <div className="title">Login</div>
                <div className="underline"></div>

            </div>

            <form className='inputs' onSubmit={handleLogin}>
                <div className="form-group row">
                    <div className="col-sm-10 input">
                        <label className="col-sm-2 col-form-label"><img src={emailIcon} /></label>
                        <input type="email" className="form-control " placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10 input">
                        <label className="col-sm-2 col-form-label"><img src={passwordIcon} /></label>
                        <input type="password" className="form-control " placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="text">
                    <div>Don't have an account? <Link to={'/register'} style={{ textDecoration: 'none' }}>
                        <span className='register' >Register!</span> </Link></div>
                </div>
                <div className="submit-container">
                    <button type="submit" className="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login