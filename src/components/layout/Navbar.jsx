import { auth } from "../../firebase";

export default function Navbar({ user }) {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-brand">LiveChat</h1>
      <div className="navbar-right">
        <span className="navbar-email">{user.email}</span>
        <button className="btn-signout" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}
