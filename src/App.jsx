import { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import SignupForm from "./components/SignupForm.jsx";
import SigninForm from "./components/SigninForm.jsx";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleForm = () => setIsSignUp((prev) => !prev);

  if (user) {
    return (
      <div className="auth-container">
        <h2>Welcome!</h2>
        <p>Signed in as <strong>{user.email}</strong></p>
        <button onClick={() => signOut(auth)}>Sign Out</button> 
      </div>
    );
  }

  return (
    <>
      {isSignUp ? <SignupForm onToggle={toggleForm} /> : <SigninForm onToggle={toggleForm} />}
    </>
  );
}

export default App;
