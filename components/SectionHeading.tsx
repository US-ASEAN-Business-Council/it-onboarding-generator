import React from 'react';

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children, className = '' }) => {
  return (
    <h2 className={`m-0 mb-2 text-[14px] text-[#2f7dff] uppercase tracking-[0.8px] font-bold ${className}`}>
      {children}
    </h2>
  );
};