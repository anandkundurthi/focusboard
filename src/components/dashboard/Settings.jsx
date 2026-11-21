
import { useState } from 'react';
import { User, Bell, ShieldCheck, Save } from 'lucide-react';

const SETTINGS_KEY = 'focusboard_settings';

const defaultSettings = {
  name: '',
  email: '',
  taskReminders: true,
  weeklySummary: false,
};

function getSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function Settings() {
  const [settings, setSettings] = useState(getSettings);
  const [savedMessage, setSavedMessage] = useState('');

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
    setSavedMessage('');
  };

  const handleSave = (event) => {
    event.preventDefault();

    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

    window.dispatchEvent(
        new Event('focusboard-settings-updated')
    );

    setSavedMessage('Your settings have been saved successfully.');
   };

  return (
    <div className="settings-page">
      <section className="settings-card">
        <div className="settings-section-heading">
          <div className="settings-icon">
            <User size={20} />
          </div>
          <div>
            <h2>Profile information</h2>
            <p>Manage your personal account details.</p>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div className="settings-form-grid">
            <label className="settings-field">
              Display name
              <input
                type="text"
                placeholder="Enter your name"
                value={settings.name}
                onChange={(e) => updateSetting('name', e.target.value)}
              />
            </label>

            <label className="settings-field">
              Email address
              <input
                type="email"
                placeholder="Enter your email"
                value={settings.email}
                onChange={(e) => updateSetting('email', e.target.value)}
              />
            </label>
          </div>

          <div className="settings-divider" />

          <div className="settings-section-heading">
            <div className="settings-icon">
              <Bell size={20} />
            </div>
            <div>
              <h2>Notifications</h2>
              <p>Choose which updates you want to receive.</p>
            </div>
          </div>

          <div className="settings-option">
            <div>
              <h3>Task reminders</h3>
              <p>Enable reminders for upcoming task deadlines.</p>
            </div>

            <label className="settings-switch">
              <input
                type="checkbox"
                checked={settings.taskReminders}
                onChange={(e) =>
                  updateSetting('taskReminders', e.target.checked)
                }
              />
              <span />
            </label>
          </div>

          <div className="settings-option">
            <div>
              <h3>Weekly summary</h3>
              <p>Enable a weekly overview of your task progress.</p>
            </div>

            <label className="settings-switch">
              <input
                type="checkbox"
                checked={settings.weeklySummary}
                onChange={(e) =>
                  updateSetting('weeklySummary', e.target.checked)
                }
              />
              <span />
            </label>
          </div>

          <div className="settings-divider" />

          <div className="settings-section-heading">
            <div className="settings-icon">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2>Privacy and security</h2>
              <p>Your task data is currently stored in this browser.</p>
            </div>
          </div>

          <div className="settings-save-row">
            {savedMessage && (
              <p className="settings-success">{savedMessage}</p>
            )}

            <button className="primary-button" type="submit">
              <Save size={16} />
              Save changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Settings;
