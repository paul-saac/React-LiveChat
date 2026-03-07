import { SlArrowLeft } from "react-icons/sl";

export default function ChatHeader({ conversation, currentUser, onBack }) {
  const otherEmail = conversation.participantEmails?.find(
    (email) => email !== currentUser.email
  );

  const otherName = otherEmail ? otherEmail.split("@")[0] : "Unknown";

  return (
    <div className="chat-header">
      <button className="btn-back" onClick={onBack}>
        <SlArrowLeft size={12}/>
      </button>
      <div className="chat-header-avatar">
        {otherEmail ? otherEmail[0].toUpperCase() : "?"}
      </div>
      <div className="chat-header-info">
        <p className="chat-header-name">{otherName}</p>
        <p className="chat-header-email">{otherEmail}</p>
      </div>
    </div>
  );
}
