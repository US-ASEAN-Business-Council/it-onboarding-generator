import React from 'react';

interface CodeProps {
  children: React.ReactNode;
}

export const Code: React.FC<CodeProps> = ({ children }) => {
  return (
    <code className="bg-gray-100 border border-gray-200 px-[6px] py-[1px] rounded-lg text-blue-700 font-mono text-[12.5px]">
      {children}
    </code>
  );
};