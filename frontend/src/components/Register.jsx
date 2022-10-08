import React, { useRef, useState} from 'react';
import axios from 'axios';
import { Room, Cancel } from "@mui/icons-material";
import "./register.css";

export default function Register({setShowRegister}) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const ageRef = useRef();
    const addressRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newUser = {
            username:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
            age:ageRef.current.value,
            address:addressRef.current.value,

        };

        try {
            await axios.post("http://54.173.161.116:8080/users/register", newUser);
            setError(false);
            setSuccess(true);
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="registerContainer">
            <div className='logoRegister'>
                <Room/>
                DoggoPin
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='username' ref={nameRef} />
                <input type="email" placeholder='email' ref={emailRef} />
                <input type="password" placeholder='password' ref={passwordRef} />
                <input type="age" placeholder='age' ref={ageRef} />
                <input type="address" placeholder='address' ref={addressRef} />
                <input type="city" placeholder='city' ref={cityRef} />
                <input type="state" placeholder='state' ref={stateRef} />
                <button className="registerBtn">Register</button>
                {success && (
                    <span className="success">Success! Logging in...</span>
                )}
                {error && <span className="failure">Oops! Looks like something went wrong...</span>}
            </form>
            <Cancel className="registerCancel" 
            onClick={() => setShowRegister(false)} 
            />
        </div>
    );
}