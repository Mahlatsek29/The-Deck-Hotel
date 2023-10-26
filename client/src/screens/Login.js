import axios from "axios";
import React, { useState } from "react";
import Loader from "../components/Loader";
import Error from '../components/Error';

function Register() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false); 

    async function login() {
        const user = {
            email,
            password,
        }
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/users/login', user);
            const result = response.data;
            setLoading(false);
            localStorage.setItem('currentUser', JSON.stringify(result));
            window.location.href = '/home';
        } catch (error) {
            console.error(error); 
            setLoading(false);
            setError(true);
        }
    }

    return (
        <div className='back'>
            {loading && (<Loader />)}
            <div className="row justify-content-center mt-5">
                <div>
                    {error && (<Error message="Invalid credentials" />)}
                    <div className="shadow-lg p-3 mb-5 bg-white rounded">
                        <h1>Login</h1>
                        <input
                            type="text"
                            className="form-control shadow-lg p-3 mb-5 bg-white rounded"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }} 
                        />
                        <input
                            type="password"
                            className="form-control shadow-lg p-3 mb-5 bg-white rounded"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }} 
                        />
                        <button className="btn btn-outline" onClick={login}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
