import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-moderate">
            <Icon name="Headphones" size={28} color="white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-2xl font-bold text-foreground">ITHelpDesk</span>
            <span className="text-sm text-primary font-semibold">Pro</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="text-muted-foreground">
          Sign in to your account to access the IT service management system
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;