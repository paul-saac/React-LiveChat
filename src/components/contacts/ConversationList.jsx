import { useState, useEffect } from "react";
import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function ConversationList({ currentUser, onSelectConversation, activeConversationId, }) {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const convoRef = collection(db, "conversations");
        const q = query(
            convoRef,
            where("participants", "array-contains", currentUser.uid),
            orderBy("lastMessageAt", "desc")
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const convos = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("Conversations loaded:", convos.length);
                setConversations(convos);
            },
            (error) => {
                console.error("ConversationList listener error:", error);
            }
        );

        return () => unsubscribe();
    }, [currentUser.uid]);

    return (
        <div className="conversation-list">
            <h3 className="conversation-list-title">Conversations</h3>
            {conversations.length === 0 && (
                <p className="conversation-list-empty">No conversations yet.</p>
            )}
            {conversations.map((convo) => {
                const otherEmail = convo.participantEmails?.find(
                    (email) => email !== currentUser.email
                );
                const isActive = activeConversationId === convo.id;

                return (
                    <div
                        key={convo.id}
                        className={`conversation-item ${isActive ? "active" : ""}`}
                        onClick={() => onSelectConversation(convo)}
                    >
                        <div className="conversation-avatar">
                            {otherEmail ? otherEmail[0].toUpperCase() : "?"}
                        </div>
                        <div className="conversation-details">
                            <p className="conversation-email">{otherEmail}</p>
                            <p className="conversation-last-message">
                                {convo.lastMessage || "No messages yet"}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
