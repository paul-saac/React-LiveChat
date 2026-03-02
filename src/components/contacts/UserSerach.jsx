import { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function UserSearch({ currentUser, onSelectConversation }) {
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setSearchResult(null);

    const trimmed = searchEmail.trim().toLowerCase();

    if (trimmed === currentUser.email) {
      setError("You can't message yourself.");
      return;
    }

    setLoading(true);
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", trimmed));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("No user found with that email.");
      } else {
        setSearchResult(snapshot.docs[0].data());
      }
    } catch (err) {
      setError("Search failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startConversation = async () => {
    if (!searchResult) return;

    try {
      const convoRef = collection(db, "conversations");

      // Check if a conversation already exists between these two users
      const q = query(
        convoRef,
        where("participants", "array-contains", currentUser.uid)
      );
      const snapshot = await getDocs(q);

      let existingConvo = null;
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.participants.includes(searchResult.uid)) {
          existingConvo = { id: docSnap.id, ...data };
        }
      });

      if (existingConvo) {
        onSelectConversation(existingConvo);
      } else {
        const newConvoData = {
          participants: [currentUser.uid, searchResult.uid],
          participantEmails: [currentUser.email, searchResult.email],
          createdAt: new Date().toISOString(),
          lastMessage: "",
          lastMessageAt: new Date().toISOString(),
        };
        const docRef = await addDoc(convoRef, newConvoData);
        onSelectConversation({ id: docRef.id, ...newConvoData });
      }

      // Clear search after starting conversation
      setSearchEmail("");
      setSearchResult(null);
    } catch (err) {
      console.error("Failed to start conversation:", err);
      setError("Failed to start conversation.");
    }
  };

  return (
    <div className="user-search">
      <form onSubmit={handleSearch} className="user-search-form">
        <input
          type="email"
          placeholder="Search by email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "..." : "Search"}
        </button>
      </form>
      {error && <p className="search-error">{error}</p>}
      {searchResult && (
        <div className="search-result">
          <div className="search-result-info">
            <p className="search-result-name">{searchResult.displayName}</p>
            <p className="search-result-email">{searchResult.email}</p>
          </div>
          <button className="btn-message" onClick={startConversation}>
            Message
          </button>
        </div>
      )}
    </div>
  );
}
