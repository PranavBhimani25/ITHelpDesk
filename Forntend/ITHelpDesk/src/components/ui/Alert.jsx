const Alert = ({ type = 'info', children, className = '' }) => {
  const types = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
      icon: CheckCircle2
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      icon: AlertCircle
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: AlertCircle
    }
  };
  
  const config = types[type];
  const Icon = config.icon;
  
  return (
    <div className={`p-4 rounded-lg border flex items-center space-x-3 ${config.bg} ${config.border} ${className}`}>
      <Icon className={`w-5 h-5 ${config.text} flex-shrink-0`} />
      <div className={`text-sm ${config.text}`}>
        {children}
      </div>
    </div>
  );
};
