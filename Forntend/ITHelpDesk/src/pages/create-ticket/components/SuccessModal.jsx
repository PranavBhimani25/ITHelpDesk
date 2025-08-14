import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessModal = ({ isOpen, onClose, ticketData }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleViewTicket = () => {
    navigate(`/ticket-detail?id=${ticketData?.ticketNumber}`);
  };

  const handleCreateAnother = () => {
    onClose();
    window.location?.reload();
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const getEstimatedResponse = (priority, urgency) => {
    if (priority === 'critical' || urgency === 'critical') {
      return 'Within 1 hour';
    } else if (priority === 'high' || urgency === 'high') {
      return 'Within 4 hours';
    } else if (priority === 'medium' || urgency === 'medium') {
      return 'Within 24 hours';
    } else {
      return 'Within 48 hours';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-elevated max-w-md w-full mx-4 p-6">
        <div className="text-center space-y-4">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
          </div>
          
          {/* Success Message */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Ticket Created Successfully!
            </h2>
            <p className="text-sm text-muted-foreground">
              Your support request has been submitted and assigned a ticket number.
            </p>
          </div>
          
          {/* Ticket Details */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3 text-left">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Ticket Number:</span>
              <span className="text-sm font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                #{ticketData?.ticketNumber}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Priority:</span>
              <span className={`text-sm px-2 py-1 rounded capitalize ${
                ticketData?.priority === 'critical' ? 'bg-error/10 text-error' :
                ticketData?.priority === 'high' ? 'bg-warning/10 text-warning' :
                ticketData?.priority === 'medium'? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
              }`}>
                {ticketData?.priority}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Estimated Response:</span>
              <span className="text-sm text-muted-foreground">
                {getEstimatedResponse(ticketData?.priority, ticketData?.urgency)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Status:</span>
              <span className="text-sm bg-accent/10 text-accent px-2 py-1 rounded">
                Open
              </span>
            </div>
          </div>
          
          {/* Next Steps */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-left">
            <h3 className="text-sm font-medium text-foreground mb-2 flex items-center">
              <Icon name="Info" size={16} className="mr-2 text-primary" />
              What happens next?
            </h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• You'll receive an email confirmation shortly</li>
              <li>• An agent will be assigned to your ticket</li>
              <li>• You'll get updates via email and in your dashboard</li>
              <li>• You can track progress anytime using your ticket number</li>
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleViewTicket}
              iconName="Eye"
              iconPosition="left"
              className="flex-1"
            >
              View Ticket
            </Button>
            
            <Button
              variant="outline"
              onClick={handleCreateAnother}
              iconName="Plus"
              iconPosition="left"
              className="flex-1"
            >
              Create Another
            </Button>
            
            <Button
              onClick={handleGoToDashboard}
              iconName="Home"
              iconPosition="left"
              className="flex-1"
            >
              Go to Dashboard
            </Button>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;