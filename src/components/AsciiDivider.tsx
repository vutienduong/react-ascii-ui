import React from "react";

export const AsciiDivider: React.FC = () => {
  return (
    <div className="font-mono overflow-hidden text-ellipsis whitespace-nowrap">
      {"-".repeat(70)}
    </div>
  );
};