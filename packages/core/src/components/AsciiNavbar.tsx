import React from "react";

interface AsciiNavbarItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

interface AsciiNavbarProps extends React.HTMLAttributes<HTMLElement> {
  items: AsciiNavbarItem[];
  brand?: string;
}

export const AsciiNavbar: React.FC<AsciiNavbarProps> = ({
  items,
  brand,
  className = "",
  ...props
}) => {
  const handleItemClick = (item: AsciiNavbarItem, e: React.MouseEvent) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
  };

  return (
    <nav
      {...props}
      className={`
        font-mono bg-black text-white border-b border-white 
        px-4 py-2 flex items-center gap-4
        ${className}
      `}
    >
      {brand && (
        <div className="font-bold mr-4">
          {brand}
        </div>
      )}
      
      <div className="flex items-center gap-1">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <a
                href={item.href}
                onClick={(e) => handleItemClick(item, e)}
                className={`
                  px-2 py-1 hover:text-green-400 cursor-pointer
                  before:content-['['] after:content-[']']
                  ${item.active ? 'text-green-400' : 'text-white'}
                `}
              >
                {item.label}
              </a>
            ) : (
              <button
                onClick={(e) => handleItemClick(item, e)}
                className={`
                  px-2 py-1 hover:text-green-400 cursor-pointer
                  before:content-['['] after:content-[']']
                  ${item.active ? 'text-green-400' : 'text-white'}
                `}
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};