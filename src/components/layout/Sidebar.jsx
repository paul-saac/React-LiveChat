import UserSearch from "../contacts/UserSerach";
import ConversationList from "../contacts/ConversationList";

export default function Sidebar({ currentUser, onSelectConversation, activeConversationId }) {
  return (
    <aside className="sidebar">
      <UserSearch
        currentUser={currentUser}
        onSelectConversation={onSelectConversation}
      />
      <ConversationList
        currentUser={currentUser}
        onSelectConversation={onSelectConversation}
        activeConversationId={activeConversationId}
      />
    </aside>
  );
}
