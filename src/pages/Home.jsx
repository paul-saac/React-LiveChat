import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";

export default function Home({ user }) {
  const [activeConversation, setActiveConversation] = useState(null);

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
  };

  const handleBack = () => {
    setActiveConversation(null);
  };

  return (
    <div className="home">
      <Navbar user={user} />
      <div className="home-body">
        <Sidebar
          currentUser={user}
          onSelectConversation={handleSelectConversation}
          activeConversationId={activeConversation?.id}
        />
        <main className="home-main">
          {activeConversation ? (
            <ChatWindow
              conversation={activeConversation}
              currentUser={user}
              onBack={handleBack}
            />
          ) : (
            <div className="chat-placeholder">
              <div className="chat-placeholder-content">
                <h2>Welcome to LiveChat</h2>
                <p>Search for a user by email or select a conversation to start chatting.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
