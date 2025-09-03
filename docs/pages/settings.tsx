import React, { useState } from 'react';
import {
  AsciiCard,
  AsciiButton,
  AsciiAlert,
  AsciiTabs,
  AsciiNavbar,
  AsciiInput,
  AsciiSelect,
  AsciiTextarea,
  AsciiSwitch,
  AsciiCheckbox
} from 'react-ascii-ui';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');

  const resetSettings = () => {
    setNotifications(true);
    setAutoSave(false);
    setTheme('dark');
    setLanguage('en');
  };

  const tabsData = [
    {
      label: 'General',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Application Settings</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff' }}>Enable notifications</span>
                <AsciiSwitch 
                  checked={notifications} 
                  onChange={(e) => setNotifications(e.target.checked)}
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff' }}>Auto-save changes</span>
                <AsciiSwitch 
                  checked={autoSave} 
                  onChange={(e) => setAutoSave(e.target.checked)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '14px' }}>
                    Theme:
                  </label>
                  <AsciiSelect 
                    value={theme} 
                    onChange={(e) => setTheme(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value="dark">Dark Theme</option>
                    <option value="light">Light Theme</option>
                    <option value="auto">Auto (System)</option>
                  </AsciiSelect>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '14px' }}>
                    Language:
                  </label>
                  <AsciiSelect 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </AsciiSelect>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Profile Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '14px' }}>
                  Display Name:
                </label>
                <AsciiInput defaultValue="John Doe" style={{ width: '100%' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '14px' }}>
                  Email:
                </label>
                <AsciiInput defaultValue="john.doe@example.com" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ marginTop: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '14px' }}>
                Bio:
              </label>
              <AsciiTextarea 
                placeholder="Tell us about yourself..."
                rows={3}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Security',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <AsciiAlert variant="info">
            Keep your account secure by regularly updating your password and enabling two-factor authentication.
          </AsciiAlert>

          <div>
            <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Password Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '14px' }}>
                  Current Password:
                </label>
                <AsciiInput type="password" style={{ width: '100%' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '14px' }}>
                  New Password:
                </label>
                <AsciiInput type="password" style={{ width: '100%' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '14px' }}>
                  Confirm New Password:
                </label>
                <AsciiInput type="password" style={{ width: '100%' }} />
              </div>

              <AsciiButton>Update Password</AsciiButton>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Two-Factor Authentication</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AsciiCheckbox />
                <span style={{ color: '#fff' }}>Enable two-factor authentication</span>
              </div>
              
              <p style={{ color: '#ccc', fontSize: '14px', marginTop: '5px' }}>
                Add an extra layer of security by requiring a code from your mobile device.
              </p>
              
              <AsciiButton>Configure 2FA</AsciiButton>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Active Sessions</h3>
            <div style={{ 
              backgroundColor: '#111', 
              border: '1px solid #333', 
              borderRadius: '4px', 
              padding: '15px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div>
                  <div style={{ color: '#fff', fontSize: '14px' }}>Current Session</div>
                  <div style={{ color: '#ccc', fontSize: '12px' }}>Chrome on macOS • Last active: Now</div>
                </div>
                <div style={{ color: '#00ff00', fontSize: '12px' }}>Active</div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#fff', fontSize: '14px' }}>Mobile Device</div>
                  <div style={{ color: '#ccc', fontSize: '12px' }}>Safari on iPhone • Last active: 2 hours ago</div>
                </div>
                <AsciiButton>Revoke</AsciiButton>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Storage',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div>
            <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Storage Usage</h3>
            <div style={{ 
              backgroundColor: '#111', 
              border: '1px solid #333', 
              borderRadius: '4px', 
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ color: '#fff' }}>Used Storage</span>
                <span style={{ color: '#00ff00' }}>2.3 GB of 5 GB</span>
              </div>
              
              <div style={{ 
                width: '100%', 
                height: '8px', 
                backgroundColor: '#333', 
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '15px'
              }}>
                <div style={{ 
                  width: '46%', 
                  height: '100%', 
                  backgroundColor: '#00ff00',
                  borderRadius: '4px'
                }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#00ff00', fontSize: '18px', marginBottom: '5px' }}>1.2 GB</div>
                  <div style={{ color: '#ccc', fontSize: '12px' }}>Documents</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#ffaa00', fontSize: '18px', marginBottom: '5px' }}>0.8 GB</div>
                  <div style={{ color: '#ccc', fontSize: '12px' }}>Images</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#00ffff', fontSize: '18px', marginBottom: '5px' }}>0.3 GB</div>
                  <div style={{ color: '#ccc', fontSize: '12px' }}>Other</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Backup Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AsciiCheckbox defaultChecked />
                <span style={{ color: '#fff' }}>Automatic backups</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AsciiCheckbox />
                <span style={{ color: '#fff' }}>Include media files in backups</span>
              </div>

              <div style={{ marginTop: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '14px' }}>
                  Backup Frequency:
                </label>
                <AsciiSelect style={{ width: '200px' }}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </AsciiSelect>
              </div>

              <div style={{ marginTop: '15px' }}>
                <AsciiButton>Create Backup Now</AsciiButton>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#ff4444', marginBottom: '15px' }}>Danger Zone</h3>
            <div style={{ 
              backgroundColor: '#111', 
              border: '1px solid #ff4444', 
              borderRadius: '4px', 
              padding: '20px'
            }}>
              <p style={{ color: '#ccc', marginBottom: '15px', fontSize: '14px' }}>
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <AsciiButton>Delete Account</AsciiButton>
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Advanced',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div>
            <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Developer Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AsciiCheckbox />
                <span style={{ color: '#fff' }}>Enable developer mode</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AsciiCheckbox defaultChecked />
                <span style={{ color: '#fff' }}>Show debug information</span>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#fff', fontSize: '14px' }}>
                  API Key:
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <AsciiInput 
                    defaultValue="sk-1234567890abcdef" 
                    readOnly 
                    style={{ width: '300px' }}
                  />
                  <AsciiButton>Regenerate</AsciiButton>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Export Data</h3>
            <div style={{ 
              backgroundColor: '#111', 
              border: '1px solid #333', 
              borderRadius: '4px', 
              padding: '20px'
            }}>
              <p style={{ color: '#ccc', marginBottom: '15px', fontSize: '14px' }}>
                Download all your data in a portable format. This may take several minutes to complete.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AsciiCheckbox defaultChecked />
                  <span style={{ color: '#fff', fontSize: '14px' }}>Profile information</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AsciiCheckbox defaultChecked />
                  <span style={{ color: '#fff', fontSize: '14px' }}>Settings and preferences</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AsciiCheckbox />
                  <span style={{ color: '#fff', fontSize: '14px' }}>Usage analytics</span>
                </div>
              </div>

              <div style={{ marginTop: '15px' }}>
                <AsciiButton>Export Data</AsciiButton>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>System Information</h3>
            <div style={{ 
              backgroundColor: '#111', 
              border: '1px solid #333', 
              borderRadius: '4px', 
              padding: '20px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '14px' }}>
                <div>
                  <div style={{ color: '#ccc' }}>Version:</div>
                  <div style={{ color: '#fff' }}>v2.1.0</div>
                </div>
                <div>
                  <div style={{ color: '#ccc' }}>Build:</div>
                  <div style={{ color: '#fff' }}>#1234</div>
                </div>
                <div>
                  <div style={{ color: '#ccc' }}>Last Updated:</div>
                  <div style={{ color: '#fff' }}>Dec 15, 2023</div>
                </div>
                <div>
                  <div style={{ color: '#ccc' }}>Environment:</div>
                  <div style={{ color: '#fff' }}>Production</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>Settings</h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        Manage your account settings and preferences.
      </p>

      {/* Navigation */}
      <div style={{ marginBottom: '30px' }}>
        <AsciiNavbar
          brand="Admin Panel"
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Users', href: '/users' },
            { label: 'Settings', href: '/settings', active: true }
          ]}
        />
      </div>

      {/* Settings Tabs */}
      <AsciiCard title="[ SYSTEM SETTINGS ]">
        <AsciiTabs tabs={tabsData} defaultTab={0} />
        
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #333'
        }}>
          <AsciiButton>Save Changes</AsciiButton>
          <AsciiButton onClick={resetSettings}>Reset to Defaults</AsciiButton>
        </div>
      </AsciiCard>

      <p style={{ 
        textAlign: 'center', 
        color: '#666', 
        fontStyle: 'italic', 
        marginTop: '40px' 
      }}>
        Settings panel built with React ASCII UI
      </p>
    </div>
  );
}