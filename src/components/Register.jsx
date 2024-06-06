import emailIcon from "../assets/email.png"
import passwordIcon from "../assets/password.png"
import personIcon from "../assets/person.png"
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firbase.config";

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    //Register and save the information in the firebase authentication
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            navigate('/');
        } catch (err) {
            alert('Registration Failed' + err)
        }
    }
    return (
        <div className="container">
            <div className="header">
                <div className="title">Register</div>
                <div className="underline"></div>
            </div>
            {/* OnSubmit of form the handle register function is called  */}
            <form className='inputs' onSubmit={handleRegister}>
                <div className="form-group row">

                    <div className="col-sm-10 input">
                        <label className="col-sm-2 col-form-label"><img src={personIcon} /></label>
                        <input type="text" className="form-control " placeholder="Enter your name" required onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-10 input">
                        <label className="col-sm-2 col-form-label"><img src={emailIcon} /></label>
                        <input type="email" className="form-control " placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10 input">
                        <label className="col-sm-2 col-form-label"><img src={passwordIcon} /></label>
                        <input type="password" className="form-control " placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                {/* If have an account then navigate to login page */}
                <div className="text">
                    <div>Already have an account? <Link to={'/'} style={{ textDecoration: 'none' }}>
                        <span className='register' >Login!</span> </Link></div>
                </div>
                {/* Registering page */}
                <div className="submit-container">
                    <button type="submit" className="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Register