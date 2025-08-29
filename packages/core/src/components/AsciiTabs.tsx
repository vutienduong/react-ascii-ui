import React, { useState } from "react";

interface AsciiTab {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AsciiTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: AsciiTab[];
  defaultTab?: number;
  onTabChange?: (index: number) => void;
}

export const AsciiTabs: React.FC<AsciiTabsProps> = ({
  tabs,
  defaultTab = 0,
  onTabChange,
  className = "",
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index: number, disabled?: boolean) => {
    if (disabled) return;
    
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div
      {...props}
      className={`font-mono ${className}`}
    >
      {/* Tab Headers */}
      <div className="flex border-b border-white mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index, tab.disabled)}
            disabled={tab.disabled}
            className={`
              px-3 py-2 border-r border-white last:border-r-0
              before:content-['['] after:content-[']']
              transition-colors
              ${activeTab === index
                ? 'bg-white text-black'
                : tab.disabled
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-white hover:text-green-400 cursor-pointer'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="text-white">
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
};