import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CommentThread = ({ ticket, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const comments = [
    {
      id: 1,
      author: 'Sarah Johnson',
      role: 'End User',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      content: `I'm experiencing this issue when trying to access the company email through Outlook. The error message appears every time I try to send an email with attachments larger than 5MB.\n\nI've tried restarting the application and my computer, but the problem persists. This is affecting my daily work as I need to send project files to clients.`,
      timestamp: '2024-08-12 09:30 AM',
      type: 'comment',
      attachments: [
        {
          name: 'error-screenshot.png',
          size: 245760,
          type: 'image',
          url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400'
        }
      ]
    },
    {
      id: 2,
      author: 'System',
      role: 'System',
      avatar: null,
      content: 'Ticket status changed from Open to In Progress',
      timestamp: '2024-08-12 09:45 AM',
      type: 'system'
    },
    {
      id: 3,
      author: 'John Doe',
      role: 'Support Agent',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      content: `Hi Sarah,\n\nThank you for reporting this issue. I can see from your screenshot that you're encountering the "Message size limit exceeded" error.\n\nThis is likely due to our email server's attachment size limit. Let me check your account settings and increase the limit for your mailbox. In the meantime, you can use our file sharing service for large attachments.\n\nI'll update you within the next hour with a resolution.`,timestamp: '2024-08-12 10:15 AM',type: 'comment'
    },
    {
      id: 4,
      author: 'John Doe',role: 'Support Agent',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',content: `Update: I've increased your mailbox attachment limit from 5MB to 25MB. Please try sending your email again and let me know if you encounter any issues.\n\nAdditionally, I've added a knowledge base article about file sharing alternatives for future reference.`,
      timestamp: '2024-08-12 11:00 AM',type: 'comment',
      attachments: [
        {
          name: 'file-sharing-guide.pdf',size: 1048576,type: 'document',url: '#'
        }
      ]
    }
  ];

  const handleSubmitComment = async (e) => {
    e?.preventDefault();
    if (!newComment?.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddComment({
        content: newComment,
        attachments: attachments
      });
      setNewComment('');
      setAttachments([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e?.target?.files);
    const newAttachments = files?.map(file => ({
      name: file?.name,
      size: file?.size,
      type: file?.type?.startsWith('image/') ? 'image' : 'document',
      file: file
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments?.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    const iconMap = {
      'pdf': 'FileText',
      'doc': 'FileText',
      'docx': 'FileText',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image',
      'gif': 'Image'
    };
    return iconMap?.[extension] || 'File';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
          <Icon name="MessageSquare" size={20} />
          <span>Communication Thread</span>
          <span className="text-sm text-muted-foreground">({comments?.length} updates)</span>
        </h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <div className="p-6 space-y-6">
          {comments?.map((comment) => (
            <div key={comment?.id} className={`flex space-x-4 ${comment?.type === 'system' ? 'opacity-75' : ''}`}>
              <div className="flex-shrink-0">
                {comment?.avatar ? (
                  <Image
                    src={comment?.avatar}
                    alt={comment?.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Icon name={comment?.type === 'system' ? 'Settings' : 'User'} size={16} className="text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-foreground">{comment?.author}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    comment?.role === 'Support Agent' ?'bg-blue-100 text-blue-800' 
                      : comment?.role === 'System' ?'bg-gray-100 text-gray-800' :'bg-green-100 text-green-800'
                  }`}>
                    {comment?.role}
                  </span>
                  <span className="text-xs text-muted-foreground">{comment?.timestamp}</span>
                </div>

                <div className={`${comment?.type === 'system' ? 'text-sm text-muted-foreground italic' : 'text-sm text-foreground'} whitespace-pre-wrap leading-relaxed`}>
                  {comment?.content}
                </div>

                {comment?.attachments && comment?.attachments?.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {comment?.attachments?.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={getFileIcon(attachment?.name)} size={16} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{attachment?.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(attachment?.size)}</p>
                        </div>
                        <Button variant="ghost" size="xs" iconName="Download">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 border-t border-border">
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Add Comment
            </label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)}
              placeholder="Type your comment here..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              disabled={isSubmitting}
            />
          </div>

          {attachments?.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Attachments ({attachments?.length})
              </label>
              {attachments?.map((attachment, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getFileIcon(attachment?.name)} size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{attachment?.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(attachment?.size)}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    iconName="X"
                    onClick={() => removeAttachment(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="file"
                id="file-upload"
                multiple
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                iconName="Paperclip"
                iconPosition="left"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Attach Files
              </Button>
              <span className="text-xs text-muted-foreground">
                Max 10MB per file
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isSubmitting}
              >
                Save Draft
              </Button>
              <Button
                type="submit"
                variant="default"
                size="sm"
                loading={isSubmitting}
                iconName="Send"
                iconPosition="left"
                disabled={!newComment?.trim()}
              >
                Add Comment
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentThread;