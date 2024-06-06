import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../firbase.config';
import { useNavigate } from 'react-router-dom';
import emailIcon from "../assets/email.png"
import personIcon from "../assets/person.png"

const Accounts = () => {
    const [user, setUser] = useState(null)
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate()
    //Render the data  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                setDisplayName(currentUser.displayName || '');
                setEmail(currentUser.email);
            } else {
                navigate('/')
            }
        })
        return () => unsubscribe();
    }, [navigate])
    //This is used to update the data
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await updateProfile(auth.currentUser, { displayName, email })
            alert('Account Update');
            navigate('/account')
        } catch (err) {
            alert('Update failed' + err)
        }
    }
    return (
        user && (
            // {/* On Click of edit button the disabled input fields and and update button will be shown  */}
            <div className="container" >
                <div className="title" style={{ padding: '2%', margin: '2%' }}>Manage Your Account</div>
                {!isEditing ? (
                    <div className="inputs">
                        <div className="form-group row">
                            <div className="col-sm-10 input">
                                <label className="col-sm-2 col-form-label"><img src={personIcon} /></label>
                                <input type="text" className="form-control " value={displayName} required disabled />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-10 input">
                                <label className="col-sm-2 col-form-label"><img src={emailIcon} /></label>
                                <input type="email" className="form-control " value={email} required disabled />
                            </div>
                        </div>
                        <div className="submit-container">
                            <button onClick={() => setIsEditing(true)} className='submit'>Edit</button>
                        </div>
                    </div>
                ) : (
                    <form className='inputs' onSubmit={handleUpdate}>
                        <div className="form-group row">
                            <div className="col-sm-10 input">
                                <label className="col-sm-2 col-form-label"><img src={personIcon} /></label>
                                <input type="text" className="form-control " value={displayName} required onChange={(e) => setDisplayName(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-10 input">
                                <label className="col-sm-2 col-form-label"><img src={emailIcon} /></label>
                                <input type="email" className="form-control " value={email} required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="submit-container">
                            <button type="submit" className='updateBtn'>Update</button>
                            {/* // On click of the cancel button the update and the input field will disable */}
                            <button className='cancelBtn' onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </form>)}
            </div>
        )
    )
}

export default Accounts