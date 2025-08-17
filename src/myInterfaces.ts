export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
}

export interface Friend {
  id: string;
  name: string;
}

export interface Chat {
  friendId: string;
  messages: Message[];
}

export interface ChatAreaProps {
  friend: Friend | null;
  messages: Message[];
  onSendMessage: (messageInput: string) => void;
}

export interface FriendsSidebarProps {
  friends: Friend[];
  selectedFriendId: string;
  onFriendSelect: (friendId: string) => void;
}
