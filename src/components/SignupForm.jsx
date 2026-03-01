import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h2>Sing up Form</h2>
            <form style={{ display: "flex", flexDirection: "column"}} onsubmit={
                (e) => {
                    e.preventDefault();
                    createUserWithEmailAndPassword(auth, email, password);
                }
            }>




                
            </form>

        </div>
    )
}