import React, { useState } from "react";

interface AsciiAccordionItem {
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface AsciiAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AsciiAccordionItem[];
  allowMultiple?: boolean;
}

export const AsciiAccordion: React.FC<AsciiAccordionProps> = ({
  items,
  allowMultiple = false,
  className = "",
  ...props
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(items.map((item, index) => item.defaultOpen ? index : -1).filter(i => i >= 0))
  );

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      if (!allowMultiple) {
        newOpenItems.clear();
      }
      newOpenItems.add(index);
    }
    
    setOpenItems(newOpenItems);
  };

  return (
    <div
      {...props}
      className={`font-mono ${className}`}
    >
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        
        return (
          <div key={index} className="border-b border-white last:border-b-0">
            {/* Accordion Header */}
            <button
              onClick={() => toggleItem(index)}
              className="w-full text-left py-3 px-2 text-white hover:text-green-400 cursor-pointer flex items-center gap-2"
            >
              <span className="select-none font-bold">
                {isOpen ? '▼' : '▶'}
              </span>
              <span>{item.title}</span>
            </button>
            
            {/* Accordion Content */}
            {isOpen && (
              <div className="pb-3 px-6 text-white border-l-2 border-dashed border-white ml-2">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};