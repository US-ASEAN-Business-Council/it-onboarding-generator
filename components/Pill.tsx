import React from 'react';

interface PillProps {
  children: React.ReactNode;
}

export const Pill: React.FC<PillProps> = ({ children }) => {
  return (
    <span className="inline-block border border-gray-200 rounded-full px-2.5 py-1 bg-gray-50 text-gray-500 text-xs mt-1.5">
      {children}
    </span>
  );
};