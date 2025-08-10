const Button = ({ variant = 'primary', size = 'md', children, className = '', isLoading = false, ...props }) => {
  const { isDark } = useTheme();
  
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md focus:ring-blue-500',
    secondary: isDark
      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 focus:ring-gray-500'
      : 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500',
    ghost: isDark
      ? 'hover:bg-gray-800 text-gray-300 focus:ring-gray-500'
      : 'hover:bg-gray-50 text-gray-700 focus:ring-gray-500',
    outline: isDark
      ? 'border border-gray-600 text-gray-300 hover:bg-gray-800 focus:ring-gray-500'
      : 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
    </button>
  );
};
