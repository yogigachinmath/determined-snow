import { FriendsSidebarProps } from "./myInterfaces";

const FriendsSidebar: React.FC<FriendsSidebarProps> = ({
  friends,
  selectedFriendId,
  onFriendSelect,
}) => {
  return (
    <div className="sidebar-container">
      <h3 className="sidebar-header">Chats</h3>
      {friends.map((friend) => (
        <div
          onClick={() => onFriendSelect(friend.id)}
          className={`friend-container ${
            selectedFriendId === friend.id && "friend-container-selected"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">
                {friend.name}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsSidebar;
