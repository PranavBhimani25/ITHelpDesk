import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import TicketForm from './components/TicketForm';
import FileUpload from './components/FileUpload';
import SuccessModal from './components/SuccessModal';
import { useRole } from '../../components/ui/RoleBasedNav';
import Icon from '../../components/AppIcon';

const CreateTicket = () => {
  const navigate = useNavigate();
  const { userRole } = useRole();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdTicket, setCreatedTicket] = useState(null);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const generateTicketNumber = () => {
    const timestamp = Date.now()?.toString()?.slice(-6);
    const random = Math.floor(Math.random() * 1000)?.toString()?.padStart(3, '0');
    return `TK${timestamp}${random}`;
  };

  const handleSubmitTicket = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const ticketData = {
        ticketNumber: generateTicketNumber(),
        ...formData,
        attachments: attachedFiles,
        status: 'open',
        createdAt: new Date()?.toISOString(),
        createdBy: 'John Doe',
        assignedTo: null
      };
      
      setCreatedTicket(ticketData);
      setShowSuccessModal(true);
      
      // Reset form data
      setAttachedFiles([]);
      
    } catch (error) {
      console.error('Error creating ticket:', error);
      // Handle error - could show error modal or toast
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async (formData) => {
    setIsDraftSaving(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save draft to localStorage or send to API
      const draftData = {
        ...formData,
        attachments: attachedFiles,
        savedAt: new Date()?.toISOString()
      };
      
      localStorage.setItem('ticket-draft', JSON.stringify(draftData));
      
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsDraftSaving(false);
    }
  };

  const handleFilesChange = (files) => {
    setAttachedFiles(files);
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard', isHome: true },
    { label: 'Create Ticket', path: '/create-ticket', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center">
                  <Icon name="Plus" size={32} className="mr-3 text-primary" />
                  Create New Ticket
                </h1>
                <p className="text-muted-foreground mt-2">
                  Submit a detailed support request to get help from our IT team
                </p>
              </div>
              
              <div className="hidden lg:flex items-center space-x-4">
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <Icon name="Clock" size={20} className="text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Avg Response</p>
                  <p className="text-sm font-semibold text-foreground">2.5 hours</p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <Icon name="Users" size={20} className="text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Active Agents</p>
                  <p className="text-sm font-semibold text-foreground">12 online</p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <Icon name="CheckCircle" size={20} className="text-success mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Resolution Rate</p>
                  <p className="text-sm font-semibold text-foreground">94.2%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Help Tips */}
          <div className="mb-8 bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center">
              <Icon name="Lightbulb" size={20} className="mr-2 text-primary" />
              Tips for Better Support
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Be Specific</p>
                  <p className="text-muted-foreground">Include exact error messages and steps to reproduce</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Icon name="Camera" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Add Screenshots</p>
                  <p className="text-muted-foreground">Visual evidence helps us understand the issue faster</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Set Priority Correctly</p>
                  <p className="text-muted-foreground">Help us prioritize based on business impact</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Ticket Form - Takes up 2 columns */}
            <div className="xl:col-span-2">
              <div className="bg-card border border-border rounded-lg shadow-subtle p-6">
                <TicketForm
                  onSubmit={handleSubmitTicket}
                  onSaveDraft={handleSaveDraft}
                  isSubmitting={isSubmitting}
                  isDraftSaving={isDraftSaving}
                />
              </div>
            </div>

            {/* File Upload Sidebar */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg shadow-subtle p-6">
                <FileUpload
                  onFilesChange={handleFilesChange}
                  maxFiles={5}
                  maxSizePerFile={10}
                />
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg shadow-subtle p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Zap" size={20} className="mr-2 text-primary" />
                  Quick Actions
                </h3>
                
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/ticket-management')}
                    className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-border hover:bg-muted transition-smooth"
                  >
                    <Icon name="List" size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">View My Tickets</p>
                      <p className="text-xs text-muted-foreground">Check status of existing tickets</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-border hover:bg-muted transition-smooth"
                  >
                    <Icon name="BarChart3" size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Dashboard</p>
                      <p className="text-xs text-muted-foreground">View support overview</p>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-border hover:bg-muted transition-smooth">
                    <Icon name="BookOpen" size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Knowledge Base</p>
                      <p className="text-xs text-muted-foreground">Find solutions yourself</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-card border border-border rounded-lg shadow-subtle p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Phone" size={20} className="mr-2 text-primary" />
                  Need Immediate Help?
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">+1 (555) 123-4567</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">support@company.com</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="MessageCircle" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">Live Chat Available</span>
                  </div>
                  
                  <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <p className="text-xs text-warning font-medium">
                      For critical system outages, call our emergency hotline: +1 (555) 911-HELP
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        ticketData={createdTicket}
      />
    </div>
  );
};

export default CreateTicket;