import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h2>Sing up Form</h2>
            <form style={{ display: "flex", flexDirection: "column" }} onSubmit={
                (e) => {
                    e.preventDefault();
                    createUserWithEmailAndPassword(auth, email, password);
                }
            }>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
 
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Sign Up</button>
            </form>

        </div>
    )
}