import React, { useState } from 'react';
import {
  AsciiCard,
  AsciiButton,
  AsciiInput,
  AsciiTextarea,
  AsciiBadge,
  AsciiAlert,
  AsciiAvatar
} from 'react-ascii-ui';

interface Email {
  id: number;
  from: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  important: boolean;
  avatar: string;
  body?: string;
}

export default function EmailDemo() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [currentFolder, setCurrentFolder] = useState('inbox');
  const [isComposing, setIsComposing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [emails, setEmails] = useState<Email[]>([
    {
      id: 1,
      from: 'team@company.com',
      subject: 'Weekly Sprint Review - Action Items',
      preview: 'Here are the action items from our weekly sprint review meeting...',
      timestamp: '2 hours ago',
      read: false,
      starred: true,
      important: true,
      avatar: '👥',
      body: 'Hi everyone,\n\nHere are the action items from our weekly sprint review meeting:\n\n1. Fix the authentication bug (assigned to Alice)\n2. Complete user dashboard redesign (assigned to Bob)\n3. Write unit tests for the payment module (assigned to Carol)\n\nDeadline: End of this week\n\nBest regards,\nProject Manager'
    },
    {
      id: 2,
      from: 'notifications@github.com',
      subject: '[Repository] New pull request opened',
      preview: 'A new pull request has been opened for review in your repository...',
      timestamp: '4 hours ago',
      read: false,
      starred: false,
      important: false,
      avatar: '🔧',
      body: 'A new pull request has been opened:\n\nTitle: Add error handling for API calls\nAuthor: contributor@example.com\n\nPlease review when convenient.\n\nChanges include:\n- Added try-catch blocks\n- Improved error messages\n- Added loading states'
    },
    {
      id: 3,
      from: 'security@company.com',
      subject: '🔒 Security Alert: Unusual login activity',
      preview: 'We detected a login from an unusual location. Please verify...',
      timestamp: '6 hours ago',
      read: true,
      starred: false,
      important: true,
      avatar: '🛡️',
      body: 'We detected a login attempt from an unusual location:\n\nLocation: San Francisco, CA\nDevice: Chrome on macOS\nTime: Today at 2:30 PM\n\nIf this was you, please ignore this message. Otherwise, please change your password immediately.'
    },
    {
      id: 4,
      from: 'newsletter@techblog.com',
      subject: '📰 Weekly Tech Newsletter - AI Developments',
      preview: 'This week in tech: Major AI breakthroughs, new frameworks...',
      timestamp: '1 day ago',
      read: true,
      starred: false,
      important: false,
      avatar: '📰',
      body: 'This week in tech:\n\n• Major AI breakthroughs in language models\n• New JavaScript frameworks released\n• Open source project highlights\n• Industry news and updates\n\nRead the full newsletter at techblog.com'
    },
    {
      id: 5,
      from: 'alice@company.com',
      subject: 'Re: Code review feedback',
      preview: 'Thanks for the feedback! I\'ve addressed all your comments...',
      timestamp: '1 day ago',
      read: true,
      starred: false,
      important: false,
      avatar: '👩‍💻',
      body: 'Hi,\n\nThanks for the detailed code review feedback! I\'ve addressed all your comments:\n\n- Fixed the memory leak in the component\n- Added proper error handling\n- Improved variable naming\n- Added comprehensive tests\n\nThe PR is ready for another review.\n\nBest,\nAlice'
    },
    {
      id: 6,
      from: 'noreply@calendar.com',
      subject: '📅 Meeting Reminder: Team Standup Tomorrow 9 AM',
      preview: 'Don\'t forget about the team standup meeting tomorrow...',
      timestamp: '2 days ago',
      read: true,
      starred: true,
      important: false,
      avatar: '📅',
      body: 'Reminder: Team Standup Meeting\n\nWhen: Tomorrow at 9:00 AM\nWhere: Conference Room A / Zoom Link\n\nAgenda:\n- Yesterday\'s progress\n- Today\'s goals\n- Blockers and challenges\n\nSee you there!'
    }
  ]);

  const folders = [
    { name: 'inbox', label: 'Inbox', icon: '📥', count: emails.filter(e => !e.read).length },
    { name: 'starred', label: 'Starred', icon: '⭐', count: emails.filter(e => e.starred).length },
    { name: 'important', label: 'Important', icon: '❗', count: emails.filter(e => e.important).length },
    { name: 'sent', label: 'Sent', icon: '📤', count: 0 },
    { name: 'drafts', label: 'Drafts', icon: '📝', count: 2 },
    { name: 'trash', label: 'Trash', icon: '🗑️', count: 0 }
  ];

  const getFilteredEmails = () => {
    let filtered = emails;

    switch (currentFolder) {
      case 'starred':
        filtered = emails.filter(e => e.starred);
        break;
      case 'important':
        filtered = emails.filter(e => e.important);
        break;
      case 'inbox':
      default:
        break;
    }

    if (searchQuery) {
      filtered = filtered.filter(email =>
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.preview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const markAsRead = (emailId: number) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, read: true } : email
    ));
  };

  const toggleStar = (emailId: number) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, starred: !email.starred } : email
    ));
  };

  const ComposeModal = () => (
    isComposing && (
      <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: '#2d2d2d',
          border: '1px solid #444',
          width: '600px',
          maxWidth: '90vw',
          maxHeight: '80vh'
        }}>
          <div style={{
            padding: '15px 20px',
            borderBottom: '1px solid #444',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ color: '#00ff00', margin: 0 }}>✉️ Compose Email</h3>
            <AsciiButton onClick={() => setIsComposing(false)}>✖️</AsciiButton>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '15px' }}>
              <AsciiInput placeholder="To: recipient@example.com" style={{ width: '100%' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <AsciiInput placeholder="Subject" style={{ width: '100%' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <AsciiTextarea
                placeholder="Write your message here..."
                style={{ width: '100%', height: '200px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <AsciiButton onClick={() => setIsComposing(false)}>Cancel</AsciiButton>
              <AsciiButton>📤 Send</AsciiButton>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const filteredEmails = getFilteredEmails();

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
            📧 ASCII Mail
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <AsciiInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search emails..."
            style={{ width: '250px' }}
          />
          <AsciiButton onClick={() => setIsComposing(true)}>
            ✍️ Compose
          </AsciiButton>
          <AsciiButton>🔄 Refresh</AsciiButton>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: '220px', backgroundColor: '#2d2d2d', borderRight: '1px solid #444', padding: '20px' }}>
          <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Folders</h3>
          {folders.map((folder) => (
            <div
              key={folder.name}
              onClick={() => setCurrentFolder(folder.name)}
              style={{
                padding: '10px 12px',
                marginBottom: '5px',
                backgroundColor: currentFolder === folder.name ? '#006600' : 'transparent',
                border: `1px solid ${currentFolder === folder.name ? '#00ff00' : 'transparent'}`,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{folder.icon}</span>
                <span style={{ color: currentFolder === folder.name ? '#00ff00' : '#ccc' }}>
                  {folder.label}
                </span>
              </div>
              {folder.count > 0 && (
                <AsciiBadge color="info">{folder.count}</AsciiBadge>
              )}
            </div>
          ))}
        </div>

        {/* Email List */}
        <div style={{ width: '400px', backgroundColor: '#252525', borderRight: '1px solid #444', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            padding: '15px 20px',
            borderBottom: '1px solid #444',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ color: '#00ff00', margin: 0 }}>
              {folders.find(f => f.name === currentFolder)?.label} ({filteredEmails.length})
            </h3>
            <div>
              <AsciiButton>🗂️</AsciiButton>
            </div>
          </div>
          
          <div style={{ flex: 1, overflow: 'auto' }}>
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => {
                  setSelectedEmail(email);
                  if (!email.read) markAsRead(email.id);
                }}
                style={{
                  padding: '15px 20px',
                  borderBottom: '1px solid #333',
                  backgroundColor: selectedEmail?.id === email.id ? '#333' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (selectedEmail?.id !== email.id) {
                    e.currentTarget.style.backgroundColor = '#2a2a2a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedEmail?.id !== email.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.2em' }}>{email.avatar}</span>
                    <span style={{
                      color: email.read ? '#ccc' : '#fff',
                      fontWeight: email.read ? 'normal' : 'bold',
                      fontSize: '14px'
                    }}>
                      {email.from}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    {email.important && <span style={{ color: '#ff4444' }}>❗</span>}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(email.id);
                      }}
                      style={{ 
                        cursor: 'pointer',
                        color: email.starred ? '#ffaa00' : '#666'
                      }}
                    >
                      ⭐
                    </span>
                  </div>
                </div>
                
                <div style={{
                  color: email.read ? '#ccc' : '#fff',
                  fontWeight: email.read ? 'normal' : 'bold',
                  marginBottom: '5px',
                  fontSize: '14px'
                }}>
                  {email.subject}
                </div>
                
                <div style={{
                  color: '#999',
                  fontSize: '12px',
                  marginBottom: '5px'
                }}>
                  {email.preview}
                </div>
                
                <div style={{
                  color: '#666',
                  fontSize: '11px'
                }}>
                  {email.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Content */}
        <div style={{ flex: 1, backgroundColor: '#1a1a1a', display: 'flex', flexDirection: 'column' }}>
          {selectedEmail ? (
            <>
              <div style={{
                padding: '20px',
                borderBottom: '1px solid #444',
                backgroundColor: '#2d2d2d'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                  <div>
                    <h2 style={{ color: '#00ff00', marginBottom: '10px', fontSize: '1.3em' }}>
                      {selectedEmail.subject}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                      <span style={{ fontSize: '1.5em' }}>{selectedEmail.avatar}</span>
                      <span style={{ color: '#fff' }}>{selectedEmail.from}</span>
                      <AsciiBadge color="info">{selectedEmail.timestamp}</AsciiBadge>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <AsciiButton>↩️ Reply</AsciiButton>
                    <AsciiButton>↪️ Forward</AsciiButton>
                    <AsciiButton>🗑️ Delete</AsciiButton>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  {selectedEmail.important && <AsciiBadge color="error">Important</AsciiBadge>}
                  {selectedEmail.starred && <AsciiBadge color="warning">Starred</AsciiBadge>}
                  {!selectedEmail.read && <AsciiBadge color="info">Unread</AsciiBadge>}
                </div>
              </div>
              
              <div style={{
                flex: 1,
                padding: '20px',
                overflow: 'auto'
              }}>
                <pre style={{
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  color: '#ccc',
                  lineHeight: '1.5',
                  fontSize: '14px'
                }}>
                  {selectedEmail.body}
                </pre>
              </div>
            </>
          ) : (
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: '#666'
            }}>
              <div style={{ fontSize: '4em', marginBottom: '20px' }}>📧</div>
              <h3>Select an email to read</h3>
              <p>Choose an email from the list to view its contents</p>
            </div>
          )}
        </div>
      </div>

      <ComposeModal />
    </div>
  );
}