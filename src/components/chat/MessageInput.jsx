import { useState } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function MessageInput({ conversationId, currentUser }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    setSending(true);
    try {
      // Add message to the messages subcollection
      const messagesRef = collection(
        db,
        "conversations",
        conversationId,
        "messages"
      );
      await addDoc(messagesRef, {
        text: trimmed,
        senderId: currentUser.uid,
        senderEmail: currentUser.email,
        createdAt: new Date().toISOString(),
      });

      // Update the conversation's lastMessage and lastMessageAt
      const convoRef = doc(db, "conversations", conversationId);
      await updateDoc(convoRef, {
        lastMessage: trimmed,
        lastMessageAt: new Date().toISOString(),
      });

      setText("");
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="message-input" onSubmit={handleSend}>
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={sending}
        autoFocus
      />
      <button type="submit" disabled={!text.trim() || sending}>
        {sending ? "..." : "Send"}
      </button>
    </form>
  );
}
