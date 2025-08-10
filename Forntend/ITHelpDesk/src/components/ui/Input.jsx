const Input = ({ 
  className = '', 
  error = false, 
  icon: Icon, 
  rightIcon: RightIcon,
  onRightIconClick,
  ...props 
}) => {
  const { isDark } = useTheme();
  
  const baseClasses = `w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent ${
    Icon ? 'pl-11' : ''
  } ${RightIcon ? 'pr-11' : ''}`;
  
  const stateClasses = error
    ? 'border-red-500 focus:ring-red-500'
    : 'focus:ring-blue-500 focus:border-blue-500';
    
  const themeClasses = isDark
    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500';
  
  return (
    <div className="relative">
      {Icon && (
        <Icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          error 
            ? 'text-red-500' 
            : (isDark ? 'text-gray-400' : 'text-gray-500')
        }`} />
      )}
      <input
        className={`${baseClasses} ${stateClasses} ${themeClasses} ${className}`}
        {...props}
      />
      {RightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
            isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
          } transition-colors`}
        >
          <RightIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
