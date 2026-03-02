import { useState, useEffect, useRef } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow({ conversation, currentUser, onBack }) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Listen for messages in real-time
  useEffect(() => {
    if (!conversation?.id) return;

    const messagesRef = collection(
      db,
      "conversations",
      conversation.id,
      "messages"
    );
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [conversation?.id]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      <ChatHeader
        conversation={conversation}
        currentUser={currentUser}
        onBack={onBack}
      />

      <div className="messages-container">
        {messages.length === 0 && (
          <p className="messages-empty">
            No messages yet. Say hello!
          </p>
        )}
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === currentUser.uid}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput
        conversationId={conversation.id}
        currentUser={currentUser}
      />
    </div>
  );
}
