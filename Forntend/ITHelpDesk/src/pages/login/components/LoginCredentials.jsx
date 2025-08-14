import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoginCredentials = () => {
  const [isVisible, setIsVisible] = useState(false);

  const credentials = [
    {
      role: 'Administrator',
      email: 'admin@ithelpdesk.com',
      password: 'admin123',
      description: 'Full system access with user management'
    },
    {
      role: 'Support Agent',
      email: 'agent@ithelpdesk.com',
      password: 'agent123',
      description: 'Ticket management and resolution'
    },
    {
      role: 'End User',
      email: 'user@ithelpdesk.com',
      password: 'user123',
      description: 'Create and track support tickets'
    }
  ];

  return (
    <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-foreground">Demo Credentials</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(!isVisible)}
          iconName={isVisible ? "EyeOff" : "Eye"}
          iconPosition="left"
          iconSize={14}
        >
          {isVisible ? 'Hide' : 'Show'}
        </Button>
      </div>
      {isVisible && (
        <div className="space-y-3">
          {credentials?.map((cred, index) => (
            <div key={index} className="p-3 bg-card rounded-md border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{cred?.role}</span>
                <Icon name="User" size={14} className="text-muted-foreground" />
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={12} className="text-muted-foreground" />
                  <span className="text-muted-foreground font-mono">{cred?.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={12} className="text-muted-foreground" />
                  <span className="text-muted-foreground font-mono">{cred?.password}</span>
                </div>
                <p className="text-muted-foreground mt-1">{cred?.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoginCredentials;