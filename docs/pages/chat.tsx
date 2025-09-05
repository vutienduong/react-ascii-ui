import React, { useState, useEffect, useRef } from 'react';
import {
  AsciiCard,
  AsciiButton,
  AsciiInput,
  AsciiBadge,
  AsciiAlert,
  AsciiAvatar
} from 'react-ascii-ui';

interface Message {
  id: number;
  user: string;
  text: string;
  timestamp: Date;
  avatar: string;
  isMe?: boolean;
}

interface User {
  name: string;
  status: 'online' | 'away' | 'offline';
  avatar: string;
}

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: 'Alice',
      text: 'Hey everyone! How\'s the coding going? 💻',
      timestamp: new Date(Date.now() - 300000),
      avatar: '👩‍💻'
    },
    {
      id: 2,
      user: 'Bob',
      text: 'Just finished implementing the new authentication system!',
      timestamp: new Date(Date.now() - 250000),
      avatar: '👨‍💼'
    },
    {
      id: 3,
      user: 'Carol',
      text: 'Nice work Bob! I\'m working on the frontend components',
      timestamp: new Date(Date.now() - 200000),
      avatar: '👩‍🎨'
    },
    {
      id: 4,
      user: 'You',
      text: 'Looks great! Need any help with testing?',
      timestamp: new Date(Date.now() - 150000),
      avatar: '👤',
      isMe: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('#general');
  const [onlineUsers] = useState<User[]>([
    { name: 'Alice', status: 'online', avatar: '👩‍💻' },
    { name: 'Bob', status: 'online', avatar: '👨‍💼' },
    { name: 'Carol', status: 'away', avatar: '👩‍🎨' },
    { name: 'David', status: 'online', avatar: '👨‍💻' },
    { name: 'Eve', status: 'offline', avatar: '👩‍🔬' }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const channels = [
    { name: '#general', unread: 0 },
    { name: '#random', unread: 3 },
    { name: '#dev-team', unread: 1 },
    { name: '#design', unread: 0 },
    { name: '#urgent', unread: 5 }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: messages.length + 1,
      user: 'You',
      text: newMessage,
      timestamp: new Date(),
      avatar: '👤',
      isMe: true
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate bot responses
    setTimeout(() => {
      const botResponses = [
        'That sounds great!',
        'I agree! 👍',
        'Let me check on that...',
        'Perfect timing!',
        'Thanks for sharing!',
        'Interesting idea! 💡'
      ];
      
      const botUsers = ['Alice', 'Bob', 'Carol', 'David'];
      const randomUser = botUsers[Math.floor(Math.random() * botUsers.length)];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: messages.length + 2,
        user: randomUser,
        text: randomResponse,
        timestamp: new Date(),
        avatar: onlineUsers.find(u => u.name === randomUser)?.avatar || '👤'
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#00ff00';
      case 'away': return '#ffaa00';
      case 'offline': return '#666';
      default: return '#666';
    }
  };

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#1a1a1a', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: '#2d2d2d', 
        padding: '15px 20px', 
        borderBottom: '1px solid #444',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ color: '#00ff00', fontSize: '1.8em', margin: 0 }}>
            💬 ASCII Chat
          </h1>
          <p style={{ color: '#ccc', margin: '5px 0 0 0', fontSize: '0.9em' }}>
            Real-time messaging interface
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <AsciiBadge color="success">{onlineUsers.filter(u => u.status === 'online').length} online</AsciiBadge>
          <AsciiButton>⚙️ Settings</AsciiButton>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', backgroundColor: '#2d2d2d', borderRight: '1px solid #444', display: 'flex', flexDirection: 'column' }}>
          {/* Channels */}
          <div style={{ padding: '20px', borderBottom: '1px solid #444' }}>
            <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Channels</h3>
            {channels.map((channel) => (
              <div
                key={channel.name}
                onClick={() => setSelectedChannel(channel.name)}
                style={{
                  padding: '8px 12px',
                  marginBottom: '5px',
                  backgroundColor: selectedChannel === channel.name ? '#006600' : 'transparent',
                  border: `1px solid ${selectedChannel === channel.name ? '#00ff00' : 'transparent'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ color: selectedChannel === channel.name ? '#00ff00' : '#ccc' }}>
                  {channel.name}
                </span>
                {channel.unread > 0 && (
                  <AsciiBadge color="error">{channel.unread}</AsciiBadge>
                )}
              </div>
            ))}
          </div>

          {/* Online Users */}
          <div style={{ padding: '20px', flex: 1, overflow: 'auto' }}>
            <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>
              Online Users ({onlineUsers.filter(u => u.status === 'online').length})
            </h3>
            {onlineUsers.map((user) => (
              <div
                key={user.name}
                style={{
                  padding: '8px 12px',
                  marginBottom: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <span style={{ fontSize: '1.5em' }}>{user.avatar}</span>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(user.status),
                      border: '1px solid #2d2d2d'
                    }}
                  />
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: '14px' }}>{user.name}</div>
                  <div style={{ color: '#666', fontSize: '12px' }}>{user.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <div style={{ 
            padding: '15px 20px', 
            borderBottom: '1px solid #444',
            backgroundColor: '#2d2d2d'
          }}>
            <h2 style={{ color: '#00ff00', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              {selectedChannel}
              <AsciiBadge color="primary">{messages.length} messages</AsciiBadge>
            </h2>
            <p style={{ color: '#ccc', margin: '5px 0 0 0', fontSize: '14px' }}>
              Welcome to {selectedChannel}! Start chatting below.
            </p>
          </div>

          {/* Messages Area */}
          <div style={{ 
            flex: 1, 
            padding: '20px', 
            overflow: 'auto',
            backgroundColor: '#1a1a1a'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  marginBottom: '20px',
                  padding: '15px',
                  backgroundColor: message.isMe ? '#003300' : '#2d2d2d',
                  border: `1px solid ${message.isMe ? '#006600' : '#444'}`,
                  borderRadius: '8px'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '8px',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '1.5em' }}>{message.avatar}</span>
                  <span style={{ 
                    color: message.isMe ? '#00ff00' : '#fff', 
                    fontWeight: 'bold' 
                  }}>
                    {message.user}
                  </span>
                  <span style={{ color: '#666', fontSize: '12px' }}>
                    {formatTime(message.timestamp)}
                  </span>
                  {message.isMe && (
                    <AsciiBadge color="success">You</AsciiBadge>
                  )}
                </div>
                <div style={{ color: '#ccc', lineHeight: '1.4' }}>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div style={{ 
            padding: '20px', 
            borderTop: '1px solid #444',
            backgroundColor: '#2d2d2d'
          }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <AsciiInput
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={`Message ${selectedChannel}`}
                style={{ flex: 1 }}
              />
              <AsciiButton onClick={sendMessage} disabled={!newMessage.trim()}>
                📤 Send
              </AsciiButton>
              <AsciiButton>📎</AsciiButton>
              <AsciiButton>😊</AsciiButton>
            </div>
            <div style={{ 
              marginTop: '10px', 
              fontSize: '12px', 
              color: '#666',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>Press Enter to send, Shift+Enter for new line</span>
              <span>{newMessage.length}/500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}