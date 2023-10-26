import React, { useState } from "react";
import axios from 'axios';
import Loader from "../components/Loader";
import Error from '../components/Error';
import Success from "../components/Success";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    async function register() {
        if (password === cpassword) {
            const user = {
                name,
                email,
                password
            };
            try {
                setLoading(true);
                const response = await axios.post('http://localhost:5000/api/users/register', user);
                setLoading(false);
                setSuccess(true);

                
                setName('');
                setEmail('');
                setPassword('');
                setCPassword('');
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        } else {
            alert('Password does not match');
        }
    }

    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error />)}
            {success && (<Success message={'Registration success'} />)}

            <div className="row justify-content-center mt-5">
                <div>
                    <div className="shadow-lg p-3 mb-5 bg-white rounded">
                        <h1>Register</h1>
                        <input type="text" className="form-control shadow-lg p-3 mb-5 bg-white rounded" placeholder="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                        <input type="text" className="form-control shadow-lg p-3 mb-5 bg-white rounded" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <input type="password" className="form-control shadow-lg p-3 mb-5 bg-white rounded" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <input type="password" className="form-control shadow-lg p-3 mb-5 bg-white rounded" placeholder="confirm password" value={cpassword} onChange={(e) => { setCPassword(e.target.value) }} />
                        <button className="btn btn-outline" onClick={register}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
