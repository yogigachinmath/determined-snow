import { useState } from "react";
import FriendsSidebar from "./FriendsSidebar";
import ChatArea from "./ChatArea";
import { Chat, Friend, Message } from "./myInterfaces";

declare global {
  interface Crypto {
    randomUUID: () => string;
  }
}

const friends: Friend[] = [
  {
    id: "1",
    name: "batman",
  },
  {
    id: "2",
    name: "ironman",
  },
  {
    id: "3",
    name: "spider",
  },
  {
    id: "4",
    name: "blackw",
  },
];

const initialChats: Chat[] = [
  {
    friendId: "1",
    messages: [
      {
        id: "1",
        text: "Hi",
        senderId: "1",
        timestamp: new Date(),
      },
      {
        id: "2",
        text: "hiya!",
        senderId: "5",
        timestamp: new Date(),
      },
    ],
  },
  {
    friendId: "2",
    messages: [
      {
        id: "3",
        text: "wsup!?",
        senderId: "2",
        timestamp: new Date(),
      },
    ],
  },
];

const MessengerApp: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>(initialChats);

  const [selectedFriendId, setSelectedFriendId] = useState<string>(
    initialChats[0]?.friendId
  );

  const selectedFriend = () =>
    friends.find((friend) => friend.id === selectedFriendId) || null;

  const currentMessages = () =>
    chats.find((chat) => chat.friendId === selectedFriendId)?.messages || [];

  const handleSendMessage = (messageInput: string) => {
    if (!messageInput.trim() || !selectedFriendId) return;

    const newMessage: Message = {
      id: self.crypto.randomUUID(),
      text: messageInput.trim(),
      senderId: "5",
      timestamp: new Date(),
    };

    setChats((prevChats) => {
      const updatedChats = [...prevChats];
      const chatIndex = updatedChats.findIndex(
        (chat) => chat.friendId === selectedFriendId
      );

      if (chatIndex >= 0) {
        updatedChats[chatIndex] = {
          ...updatedChats[chatIndex],
          messages: [...updatedChats[chatIndex].messages, newMessage],
        };
      } else {
        updatedChats.push({
          friendId: selectedFriendId,
          messages: [newMessage],
        });
      }

      return updatedChats;
    });
  };

  return (
    <div className="main-container">
      <div className="header">
        <h1>Messenger</h1>
      </div>
      <div className="messenger-container">
        <FriendsSidebar
          friends={friends}
          selectedFriendId={selectedFriendId}
          onFriendSelect={setSelectedFriendId}
        />
        <ChatArea
          friend={selectedFriend()}
          messages={currentMessages()}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default MessengerApp;
