export default function MessageBubble({ message, isOwn }) {
  const time = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className={`message-bubble ${isOwn ? "own" : "other"}`}>
      <p className="message-text">{message.text}</p>
      <span className="message-time">{time}</span>
    </div>
  );
}
