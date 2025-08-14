import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { useRole } from './RoleBasedNav';

const Header = ({ userRole = 'agent', isCollapsed = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setUserRole } = useRole();
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      roles: ['end-user', 'agent', 'admin'],
      badge: null
    },
    {
      label: 'Create Ticket',
      path: '/create-ticket',
      icon: 'Plus',
      roles: ['end-user', 'agent', 'admin'],
      badge: null
    },
    {
      label: 'My Tickets',
      path: '/ticket-management',
      icon: 'Ticket',
      roles: ['end-user', 'agent', 'admin'],
      badge: 3
    },
    {
      label: 'User Management',
      path: '/user-management',
      icon: 'Users',
      roles: ['admin'],
      badge: null
    }
  ];

  const filteredNavItems = navigationItems?.filter(item => 
    item?.roles?.includes(userRole)
  );

  const visibleNavItems = filteredNavItems?.slice(0, 4);
  const overflowNavItems = filteredNavItems?.slice(4);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef?.current && !mobileMenuRef?.current?.contains(event?.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActivePath = (path) => {
    if (path === '/dashboard') {
      return location?.pathname === '/' || location?.pathname === '/dashboard';
    }
    return location?.pathname?.startsWith(path);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear all authentication data from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('rememberMe');
    
    // Reset role context to default
    setUserRole('agent');
    
    // Close user menu
    setIsUserMenuOpen(false);
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-subtle">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="flex items-center space-x-3 transition-smooth hover:opacity-80">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Headphones" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground leading-none">ITHelpDesk</span>
              <span className="text-xs text-muted-foreground font-medium">Pro</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {visibleNavItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
              {item?.badge && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-error rounded-full">
                  {item?.badge}
                </span>
              )}
            </Link>
          ))}
          
          {overflowNavItems?.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              >
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-elevated z-60">
                  {overflowNavItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={() => setIsUserMenuOpen(false)}
                      className={`flex items-center space-x-2 px-4 py-3 text-sm hover:bg-muted transition-smooth ${
                        isActivePath(item?.path) ? 'text-primary font-medium' : 'text-popover-foreground'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                      {item?.badge && (
                        <span className="ml-auto flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-error rounded-full">
                          {item?.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth">
            <Icon name="Bell" size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <Icon name="ChevronDown" size={16} />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-elevated z-60">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-medium text-popover-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                </div>
                <div className="py-1">
                  <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help</span>
                  </button>
                  <hr className="my-1 border-border" />
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-error hover:bg-muted transition-smooth"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden bg-card border-t border-border shadow-elevated animate-slide-in-from-top"
        >
          <nav className="px-4 py-4 space-y-2">
            {filteredNavItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={handleNavClick}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
                {item?.badge && (
                  <span className="ml-auto flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-error rounded-full">
                    {item?.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;