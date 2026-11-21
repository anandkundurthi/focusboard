
import { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  UserRound,
  Settings,
  LogOut,
} from 'lucide-react';

const SETTINGS_KEY = 'focusboard_settings';

function getProfile() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved
      ? JSON.parse(saved)
      : { name: '', email: '' };
  } catch {
    return { name: '', email: '' };
  }
}

function getInitials(name) {
  if (!name?.trim()) return 'JD';

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

function Header({ activeItem, onNavigate }) {
  const [profile, setProfile] = useState(getProfile);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateProfile = () => setProfile(getProfile());

    window.addEventListener('focusboard-settings-updated', updateProfile);
    window.addEventListener('storage', updateProfile);

    return () => {
      window.removeEventListener('focusboard-settings-updated', updateProfile);
      window.removeEventListener('storage', updateProfile);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const navigateTo = (page) => {
    onNavigate?.(page);
    setIsDropdownOpen(false);
  };

  return (
    <header className="top-header">
      <div className="breadcrumb">
        <span>Workspace</span>
        <span className="breadcrumb-separator">/</span>
        <strong>{activeItem}</strong>
      </div>

      <div className="profile-dropdown" ref={dropdownRef}>
        <button
          className="profile-button"
          type="button"
          aria-label="User profile menu"
          aria-expanded={isDropdownOpen}
          onClick={() => setIsDropdownOpen((current) => !current)}
        >
          <span className="profile-avatar">
            {getInitials(profile.name)}
          </span>

          <ChevronDown
            size={14}
            className={isDropdownOpen ? 'profile-chevron-open' : ''}
          />
        </button>

        {isDropdownOpen && (
          <div className="profile-menu">
            <div className="profile-menu-header">
              <div className="profile-menu-avatar">
                {getInitials(profile.name)}
              </div>

              <div className="profile-menu-user">
                <strong>{profile.name || 'FocusBoard User'}</strong>
                <span>{profile.email || 'Personal workspace'}</span>
              </div>
            </div>

            <div className="profile-menu-divider" />

            <button
              type="button"
              className="profile-menu-item"
              onClick={() => navigateTo('Settings')}
            >
              <UserRound size={17} />
              <span>My profile</span>
            </button>

            <button
              type="button"
              className="profile-menu-item"
              onClick={() => navigateTo('Settings')}
            >
              <Settings size={17} />
              <span>Settings</span>
            </button>

            <div className="profile-menu-divider" />

            <button
              type="button"
              className="profile-menu-item disabled-menu-item"
              disabled
              title="Authentication is not configured"
            >
              <LogOut size={17} />
              <span>Sign out</span>
              <small>Unavailable</small>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
