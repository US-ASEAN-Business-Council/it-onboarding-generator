import React from 'react';

interface ExportToolbarProps {
  onBack: () => void;
  onDownloadJpg: () => void;
  onDownloadPdf: () => void;
  onDownloadWord: () => void;
}

export const ExportToolbar: React.FC<ExportToolbarProps> = ({ 
  onBack, 
  onDownloadJpg, 
  onDownloadPdf,
  onDownloadWord
}) => {
  const btnClass = "bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-xs font-bold py-2 px-4 rounded transition-colors flex items-center gap-2 shadow-sm";

  return (
    <div className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 p-3 flex justify-between items-center z-50 shadow-sm">
      <button onClick={onBack} className={`${btnClass} text-gray-500 hover:text-gray-900`}>
        ← Edit Data
      </button>
      
      <div className="flex gap-3">
        <button onClick={onDownloadWord} className={btnClass}>
          Word (.doc)
        </button>
        <button onClick={onDownloadJpg} className={btnClass}>
           Image (.jpg)
        </button>
        <button onClick={onDownloadPdf} className={`${btnClass} !bg-[#2f7dff] !border-[#2f7dff] !text-white hover:!bg-[#1a65e6] shadow-blue-500/20`}>
           PDF
        </button>
      </div>
    </div>
  );
};