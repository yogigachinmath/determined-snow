import { useEffect, useRef, useState } from "react";
import { ChatAreaProps } from "./myInterfaces";

const ChatArea: React.FC<ChatAreaProps> = ({
  friend,
  messages,
  onSendMessage,
}) => {
  const [messageInput, setMessageInput] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    onSendMessage(messageInput);
    setMessageInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-area-container">
      <div className="chat-header">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="chat-header-text">{friend?.name}</h2>
          </div>
        </div>
      </div>
      {messages.length ? (
        <div className="chat-container">
          {messages.map((message) => (
            <div
              className={`chat-wrapper ${
                message.senderId === "5" ? "my-message" : "user-message"
              }`}
            >
              <div className="chat-bubble">
                <p className="chat-text">{message.text}</p>
                <p className="chat-time">{formatTime(message.timestamp)}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="no-message-contianer">
          <div>
            <p>No messages yet. Start a conversation with {friend?.name}!</p>
          </div>
        </div>
      )}
      <div className="">
        <div className="flex gap-3">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={`Message ${friend?.name}...`}
            className="chat-input"
          />
          <button onClick={() => sendMessage()} disabled={!messageInput.trim()}>
            <span>➤</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
