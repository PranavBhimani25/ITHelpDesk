import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted'
    },
    {
      icon: 'Lock',
      text: 'SOC 2 Compliant'
    },
    {
      icon: 'CheckCircle',
      text: 'ISO 27001 Certified'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex items-center justify-center space-x-6">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-muted-foreground">
            <Icon name={feature?.icon} size={16} className="text-success" />
            <span className="text-xs font-medium">{feature?.text}</span>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} ITHelpDesk Pro. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SecurityBadges;