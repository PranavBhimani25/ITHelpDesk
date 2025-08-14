import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const TicketForm = ({ onSubmit, onSaveDraft, isSubmitting, isDraftSaving }) => {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: '',
    description: '',
    affectedSystems: [],
    urgency: '',
    template: ''
  });

  const [errors, setErrors] = useState({});
  const [lastSaved, setLastSaved] = useState(null);

  const categoryOptions = [
    { value: '', label: 'Select Category' },
    { value: 'hardware', label: 'Hardware Issues' },
    { value: 'software', label: 'Software Problems' },
    { value: 'network', label: 'Network & Connectivity' },
    { value: 'access', label: 'Access & Permissions' },
    { value: 'email', label: 'Email & Communication' },
    { value: 'security', label: 'Security Concerns' }
  ];

  const priorityOptions = [
    { value: '', label: 'Select Priority' },
    { value: 'low', label: 'Low - Minor inconvenience' },
    { value: 'medium', label: 'Medium - Affects productivity' },
    { value: 'high', label: 'High - Significant impact' },
    { value: 'critical', label: 'Critical - System down' }
  ];

  const urgencyOptions = [
    { value: '', label: 'Select Urgency' },
    { value: 'low', label: 'Low - Can wait' },
    { value: 'medium', label: 'Medium - Within 24 hours' },
    { value: 'high', label: 'High - Within 4 hours' },
    { value: 'critical', label: 'Critical - Immediate attention' }
  ];

  const templateOptions = [
    { value: '', label: 'Select Template (Optional)' },
    { value: 'password-reset', label: 'Password Reset Request' },
    { value: 'software-install', label: 'Software Installation' },
    { value: 'hardware-repair', label: 'Hardware Repair' },
    { value: 'network-issue', label: 'Network Connectivity Issue' },
    { value: 'email-setup', label: 'Email Account Setup' },
    { value: 'access-request', label: 'System Access Request' }
  ];

  const systemOptions = [
    { id: 'windows', label: 'Windows Workstation' },
    { id: 'mac', label: 'Mac Computer' },
    { id: 'mobile', label: 'Mobile Device' },
    { id: 'printer', label: 'Printer/Scanner' },
    { id: 'server', label: 'Server Systems' },
    { id: 'network', label: 'Network Equipment' }
  ];

  const templateData = {
    'password-reset': {
      subject: 'Password Reset Request',
      description: `I need assistance with resetting my password for the following system:\n\nSystem/Application: [Please specify]\nUsername: [Your username]\nLast successful login: [Date if known]\n\nAdditional details:\n[Please provide any additional context]`
    },
    'software-install': {
      subject: 'Software Installation Request',
      description: `I need the following software installed on my workstation:\n\nSoftware Name: [Software name]\nVersion Required: [Version if specific]\nBusiness Justification: [Why you need this software]\nUrgency: [When you need it by]\n\nAdditional requirements:\n[Any specific configuration needs]`
    },
    'hardware-repair': {
      subject: 'Hardware Repair Request',
      description: `I am experiencing issues with my hardware:\n\nDevice Type: [Computer/Printer/Monitor/etc.]\nModel/Serial Number: [If available]\nProblem Description: [Detailed description of the issue]\nError Messages: [Any error messages displayed]\n\nWhen did the problem start: [Date/time]\nSteps already taken: [What you've tried to fix it]`
    }
  };

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (formData?.subject || formData?.description) {
        handleSaveDraft();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [formData]);

  // Template selection handler
  useEffect(() => {
    if (formData?.template && templateData?.[formData?.template]) {
      const template = templateData?.[formData?.template];
      setFormData(prev => ({
        ...prev,
        subject: template?.subject,
        description: template?.description
      }));
    }
  }, [formData?.template]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSystemChange = (systemId, checked) => {
    setFormData(prev => ({
      ...prev,
      affectedSystems: checked
        ? [...prev?.affectedSystems, systemId]
        : prev?.affectedSystems?.filter(id => id !== systemId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.subject?.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData?.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData?.priority) {
      newErrors.priority = 'Please select a priority level';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData?.description?.trim()?.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData?.urgency) {
      newErrors.urgency = 'Please select urgency level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleSaveDraft = () => {
    if (formData?.subject || formData?.description) {
      onSaveDraft(formData);
      setLastSaved(new Date());
    }
  };

  const getFieldsForCategory = () => {
    switch (formData?.category) {
      case 'hardware':
        return (
          <div className="space-y-4">
            <Input
              label="Asset Tag/Serial Number"
              type="text"
              placeholder="Enter asset tag or serial number"
              description="If available, helps us locate your device"
            />
            <Input
              label="Device Location"
              type="text"
              placeholder="e.g., Building A, Floor 2, Desk 15"
              description="Physical location of the affected device"
            />
          </div>
        );
      case 'software':
        return (
          <div className="space-y-4">
            <Input
              label="Software Name & Version"
              type="text"
              placeholder="e.g., Microsoft Office 365, Chrome v108"
              description="Include version number if known"
            />
            <Input
              label="Error Code/Message"
              type="text"
              placeholder="Enter any error codes or messages"
              description="Exact error text helps with diagnosis"
            />
          </div>
        );
      case 'network':
        return (
          <div className="space-y-4">
            <Input
              label="Connection Type"
              type="text"
              placeholder="e.g., WiFi, Ethernet, VPN"
              description="How are you trying to connect?"
            />
            <Input
              label="Network Name/Location"
              type="text"
              placeholder="e.g., Office-WiFi, Conference Room B"
              description="Which network are you having issues with?"
            />
          </div>
        );
      case 'access':
        return (
          <div className="space-y-4">
            <Input
              label="System/Application"
              type="text"
              placeholder="e.g., SharePoint, CRM, Email"
              description="Which system do you need access to?"
            />
            <Input
              label="Business Justification"
              type="text"
              placeholder="Why do you need this access?"
              description="Required for access requests"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Template Selection */}
      <div className="bg-muted/50 p-4 rounded-lg border border-border">
        <Select
          label="Quick Start Templates"
          description="Select a template to pre-fill common ticket types"
          options={templateOptions}
          value={formData?.template}
          onChange={(value) => handleInputChange('template', value)}
          className="mb-0"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Primary Fields */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="FileText" size={20} className="mr-2 text-primary" />
              Ticket Details
            </h3>
            
            <div className="space-y-4">
              <Input
                label="Subject"
                type="text"
                placeholder="Brief description of the issue"
                value={formData?.subject}
                onChange={(e) => handleInputChange('subject', e?.target?.value)}
                error={errors?.subject}
                required
                maxLength={100}
                description="Keep it concise and descriptive"
              />

              <Select
                label="Category"
                description="Select the type of issue you're experiencing"
                options={categoryOptions}
                value={formData?.category}
                onChange={(value) => handleInputChange('category', value)}
                error={errors?.category}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Priority"
                  description="Impact on your work"
                  options={priorityOptions}
                  value={formData?.priority}
                  onChange={(value) => handleInputChange('priority', value)}
                  error={errors?.priority}
                  required
                />

                <Select
                  label="Urgency"
                  description="How quickly you need help"
                  options={urgencyOptions}
                  value={formData?.urgency}
                  onChange={(value) => handleInputChange('urgency', value)}
                  error={errors?.urgency}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description <span className="text-error">*</span>
                </label>
                <textarea
                  className="w-full min-h-[120px] p-3 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-y"
                  placeholder="Provide detailed information about the issue, including steps to reproduce, error messages, and any troubleshooting you've already tried..."
                  value={formData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                  maxLength={2000}
                />
                {errors?.description && (
                  <p className="mt-1 text-sm text-error">{errors?.description}</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  {formData?.description?.length}/2000 characters
                </p>
              </div>

              {/* Dynamic fields based on category */}
              {getFieldsForCategory()}
            </div>
          </div>
        </div>

        {/* Right Column - Additional Information */}
        <div className="space-y-6">
          {/* Affected Systems */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Monitor" size={20} className="mr-2 text-primary" />
              Affected Systems
            </h3>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-3">
                Select all systems affected by this issue:
              </p>
              <div className="space-y-3">
                {systemOptions?.map((system) => (
                  <Checkbox
                    key={system?.id}
                    label={system?.label}
                    checked={formData?.affectedSystems?.includes(system?.id)}
                    onChange={(e) => handleSystemChange(system?.id, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Priority Indicators */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="AlertTriangle" size={20} className="mr-2 text-primary" />
              Impact Assessment
            </h3>
            
            <div className="bg-card border border-border rounded-lg p-4 space-y-4">
              <div className="flex items-start space-x-3">
                <Icon name="Users" size={16} className="text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium text-foreground">Users Affected</p>
                  <p className="text-xs text-muted-foreground">
                    {formData?.priority === 'critical' ? 'Multiple users/departments' :
                     formData?.priority === 'high' ? 'Several users' :
                     formData?.priority === 'medium' ? 'Few users' : 'Single user'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Icon name="Clock" size={16} className="text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium text-foreground">Expected Response</p>
                  <p className="text-xs text-muted-foreground">
                    {formData?.urgency === 'critical' ? 'Within 1 hour' :
                     formData?.urgency === 'high' ? 'Within 4 hours' :
                     formData?.urgency === 'medium' ? 'Within 24 hours' : 'Within 48 hours'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Icon name="TrendingUp" size={16} className="text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium text-foreground">Business Impact</p>
                  <p className="text-xs text-muted-foreground">
                    {formData?.priority === 'critical' ? 'Severe - Operations stopped' :
                     formData?.priority === 'high' ? 'High - Significant delays' :
                     formData?.priority === 'medium' ? 'Medium - Some delays' : 'Low - Minor inconvenience'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-save Status */}
          {lastSaved && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <p className="text-sm text-success">
                  Draft saved at {lastSaved?.toLocaleTimeString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-border space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isDraftSaving || (!formData?.subject && !formData?.description)}
            loading={isDraftSaving}
            iconName="Save"
            iconPosition="left"
          >
            Save Draft
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Auto-saves every 30 seconds
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => window.history?.back()}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            iconName="Send"
            iconPosition="left"
          >
            Submit Ticket
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TicketForm;