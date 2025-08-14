import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TicketContent = ({ ticket }) => {
  const [expandedAttachment, setExpandedAttachment] = useState(null);

  const handleDownloadAttachment = (attachment) => {
    // Mock download functionality
    console.log('Downloading:', attachment?.name);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    const iconMap = {
      'pdf': 'FileText',
      'doc': 'FileText',
      'docx': 'FileText',
      'xls': 'FileSpreadsheet',
      'xlsx': 'FileSpreadsheet',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image',
      'gif': 'Image',
      'zip': 'Archive',
      'rar': 'Archive',
      'txt': 'FileText'
    };
    return iconMap?.[extension] || 'File';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">{ticket?.title}</h2>
        <div className="prose max-w-none">
          <div className="text-foreground whitespace-pre-wrap leading-relaxed">
            {ticket?.description}
          </div>
        </div>
      </div>
      {ticket?.attachments && ticket?.attachments?.length > 0 && (
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Paperclip" size={20} />
            <span>Attachments ({ticket?.attachments?.length})</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ticket?.attachments?.map((attachment, index) => (
              <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-smooth">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={getFileIcon(attachment?.name)} size={20} className="text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {attachment?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(attachment?.size)} • Uploaded {attachment?.uploadedAt}
                    </p>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="outline"
                        size="xs"
                        iconName="Download"
                        iconPosition="left"
                        onClick={() => handleDownloadAttachment(attachment)}
                      >
                        Download
                      </Button>
                      
                      {attachment?.type === 'image' && (
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="Eye"
                          iconPosition="left"
                          onClick={() => setExpandedAttachment(expandedAttachment === index ? null : index)}
                        >
                          {expandedAttachment === index ? 'Hide' : 'Preview'}
                        </Button>
                      )}
                    </div>
                    
                    {expandedAttachment === index && attachment?.type === 'image' && (
                      <div className="mt-3 border border-border rounded-lg overflow-hidden">
                        <Image
                          src={attachment?.url}
                          alt={attachment?.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="border-t border-border pt-6 mt-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Info" size={20} />
          <span>System Information</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Operating System:</span>
              <span className="text-sm text-foreground">{ticket?.systemInfo?.os || 'Windows 11'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Browser:</span>
              <span className="text-sm text-foreground">{ticket?.systemInfo?.browser || 'Chrome 120.0'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">IP Address:</span>
              <span className="text-sm text-foreground font-mono">{ticket?.systemInfo?.ip || '192.168.1.100'}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Department:</span>
              <span className="text-sm text-foreground">{ticket?.department || 'IT Support'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Location:</span>
              <span className="text-sm text-foreground">{ticket?.location || 'Building A, Floor 3'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Asset Tag:</span>
              <span className="text-sm text-foreground font-mono">{ticket?.assetTag || 'IT-2024-001'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketContent;