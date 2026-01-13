import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <section className={`bg-white border border-gray-200 rounded-xl p-[14px] pb-3 shadow-sm ${className}`}>
      {children}
    </section>
  );
};