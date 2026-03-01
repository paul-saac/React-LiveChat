import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import SignupForm from "./components/SignupForm";

function App() {
  return (
    <SignupForm />
  )
}

export default App;