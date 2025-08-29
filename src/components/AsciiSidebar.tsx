import React from "react";

interface AsciiSidebarItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  icon?: string;
}

interface AsciiSidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: AsciiSidebarItem[];
  title?: string;
  width?: string;
}

export const AsciiSidebar: React.FC<AsciiSidebarProps> = ({
  items,
  title,
  width = "w-64",
  className = "",
  ...props
}) => {
  const handleItemClick = (item: AsciiSidebarItem, e: React.MouseEvent) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
  };

  return (
    <aside
      {...props}
      className={`
        font-mono bg-black text-white border-r border-white 
        ${width} min-h-screen p-4 flex flex-col
        ${className}
      `}
    >
      {title && (
        <div className="font-bold mb-4 pb-2 border-b border-dashed border-white">
          {title}
        </div>
      )}
      
      <nav className="flex flex-col gap-1">
        {items.map((item, index) => (
          <div key={index} className="w-full">
            {item.href ? (
              <a
                href={item.href}
                onClick={(e) => handleItemClick(item, e)}
                className={`
                  block w-full px-2 py-1 hover:text-green-400 cursor-pointer
                  before:content-['['] after:content-[']']
                  ${item.active ? 'text-green-400' : 'text-white'}
                `}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </a>
            ) : (
              <button
                onClick={(e) => handleItemClick(item, e)}
                className={`
                  block w-full text-left px-2 py-1 hover:text-green-400 cursor-pointer
                  before:content-['['] after:content-[']']
                  ${item.active ? 'text-green-400' : 'text-white'}
                `}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </button>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};