import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const routeMap = {
    '/': 'Dashboard',
    '/dashboard': 'Dashboard',
    '/create-ticket': 'Create Ticket',
    '/ticket-detail': 'Ticket Details',
    '/ticket-management': 'Ticket Management',
    '/user-management': 'User Management',
    '/login': 'Login'
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard', isHome: true }];

    if (location?.pathname === '/' || location?.pathname === '/dashboard') {
      return breadcrumbs;
    }

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeMap?.[currentPath] || segment?.charAt(0)?.toUpperCase() + segment?.slice(1);
      
      breadcrumbs?.push({
        label,
        path: currentPath,
        isLast: index === pathSegments?.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
            )}
            
            {crumb?.isHome && (
              <Link
                to={crumb?.path}
                className="flex items-center space-x-1 hover:text-foreground transition-smooth"
              >
                <Icon name="Home" size={14} />
                <span className="hidden sm:inline">{crumb?.label}</span>
              </Link>
            )}
            
            {!crumb?.isHome && (
              <>
                {crumb?.isLast ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {crumb?.label}
                  </span>
                ) : (
                  <Link
                    to={crumb?.path}
                    className="hover:text-foreground transition-smooth"
                  >
                    {crumb?.label}
                  </Link>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;