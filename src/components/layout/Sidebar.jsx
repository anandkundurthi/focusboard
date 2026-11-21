
import {
  LayoutDashboard,
  List,
  CalendarDays,
  Settings,
} from 'lucide-react';

const navigationItems = [
  {
    label: 'Overview',
    icon: LayoutDashboard,
  },
  {
    label: 'My tasks',
    icon: List,
  },
  {
    label: 'Calendar',
    icon: CalendarDays,
  },
  {
    label: 'Settings',
    icon: Settings,
  },
];

function Sidebar({ activeItem, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <span className="brand-name">FocusBoard</span>
      </div>

      <nav className="sidebar-navigation" aria-label="Main navigation">
        <p className="navigation-label">WORKSPACE</p>

        <div className="navigation-items">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;

            return (
              <button
                key={item.label}
                type="button"
                className={`navigation-item ${
                  isActive ? 'active' : ''
                }`}
                onClick={() => onNavigate(item.label)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
