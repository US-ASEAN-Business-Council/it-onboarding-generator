import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';
import { InputForm, InternData } from './components/InputForm';
import { CheatSheet } from './components/CheatSheet';
import { ExportToolbar } from './components/ExportToolbar';
import { PasswordGate } from './components/PasswordGate';

const App: React.FC = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [data, setData] = useState<InternData>({
    firstName: '',
    lastName: '',
    startDate: '',
    office: '',
    supervisor: '',
    staffType: 'Intern'
  });

  const sheetRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (newData: InternData) => {
    setData(newData);
    setIsGenerated(true);
  };

  const getFileName = () => {
    const name = `${data.firstName}-${data.lastName}`;
    return `USABC-Onboarding-${name.replace(/\s+/g, '-')}`;
  };

  const handleDownloadJpg = async () => {
    if (!sheetRef.current) return;
    try {
      // 0.95 quality, white background
      const dataUrl = await htmlToImage.toJpeg(sheetRef.current, { quality: 0.95, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = `${getFileName()}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to generate image', error);
      alert('Could not generate image. Please try again.');
    }
  };

  const handleDownloadPdf = async () => {
    if (!sheetRef.current) return;
    try {
      // 1. Generate high-quality image of the cheat sheet
      const dataUrl = await htmlToImage.toPng(sheetRef.current, { backgroundColor: '#ffffff', pixelRatio: 2 });
      
      // 2. Initialize PDF (A4 Portrait)
      // unit: 'px' allows us to map DOM coordinates easier, though scaling is still needed
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps = pdf.getImageProperties(dataUrl);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // 3. Add the visual content (Image)
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, imgHeight);

      // 4. Overlay Clickable Links
      // We traverse the DOM to find links and map their positions to the PDF coordinates
      const links = sheetRef.current.querySelectorAll('a');
      const sheetRect = sheetRef.current.getBoundingClientRect();
      
      // Scale factor = PDF Width / DOM Element Width
      // This maps pixels on screen to pixels in the PDF document
      const scale = pdfWidth / sheetRect.width;

      links.forEach((link) => {
        const rect = link.getBoundingClientRect();
        
        // Calculate position relative to the cheat sheet container
        const x = (rect.left - sheetRect.left) * scale;
        const y = (rect.top - sheetRect.top) * scale;
        const w = rect.width * scale;
        const h = rect.height * scale;

        // Add invisible link annotation over the image
        pdf.link(x, y, w, h, { url: link.href });
      });

      pdf.save(`${getFileName()}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF', error);
      alert('Could not generate PDF. Please try again.');
    }
  };

  const handleDownloadWord = () => {
    if (!sheetRef.current) return;
    
    // Use outerHTML to capture the main container styles (border, padding, etc.)
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Onboarding Cheat Sheet</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #ffffff; color: #111827; }
          a { color: #2f7dff; text-decoration: none; }
          h1 { font-size: 22px; color: #2f7dff; font-weight: 800; margin-bottom: 5px; }
          h2 { font-size: 14px; color: #2f7dff; text-transform: uppercase; font-weight: bold; margin-bottom: 8px; margin-top: 14px; letter-spacing: 0.8px; }
          p, ul, li { font-size: 13.5px; line-height: 1.4; color: #1f2937; }
          ul { padding-left: 20px; margin: 0; }
          li { margin-bottom: 4px; }
          
          /* Utility mimics */
          .text-\[\#2f7dff\] { color: #2f7dff; }
          .text-gray-500 { color: #6b7280; }
          .font-bold { font-weight: bold; }
          .bg-gray-100 { background-color: #f3f4f6; }
          .bg-white { background-color: #ffffff; }
          .rounded-xl, .rounded-\[14px\] { border-radius: 12px; }
          .border { border: 1px solid #e5e7eb; }
          .p-6, .p-\[22px\] { padding: 20px; }
          .mb-2\.5 { margin-bottom: 10px; }
          .mt-1\.5 { margin-top: 6px; }
          
          /* Grid simulation for Word */
          .grid { display: flex; flex-wrap: wrap; }
          .grid-cols-2 > div { width: 48%; margin-right: 2%; float: left; }
          
          /* Code block style */
          code { background-color: #f3f4f6; padding: 2px 4px; border-radius: 4px; font-family: monospace; color: #1d4ed8; border: 1px solid #e5e7eb; }
          
          /* Helper for clearing floats */
          .clearfix::after { content: ""; clear: both; display: table; }
        </style>
      </head>
      <body>
        <p style="color: #000; background: #ffff00; padding: 5px; font-size: 12px; border: 1px solid #eab308;">
          <strong>Note:</strong> Formatting may vary in Microsoft Word. Use PDF for the best result.
        </p>
        <br/>
        <div class="clearfix">
          ${sheetRef.current.outerHTML}
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], {
      type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${getFileName()}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PasswordGate>
      <div className="min-h-screen bg-gray-100 text-gray-900 font-sans print:bg-white">
        {!isGenerated ? (
          <InputForm onSubmit={handleSubmit} initialData={data} />
        ) : (
          <div className="pt-16 pb-10 flex flex-col items-center print:p-0 print:block">
            <div className="print:hidden w-full">
              <ExportToolbar
                onBack={() => setIsGenerated(false)}
                onDownloadJpg={handleDownloadJpg}
                onDownloadPdf={handleDownloadPdf}
                onDownloadWord={handleDownloadWord}
              />
            </div>
            {/* We add p-6 here in the preview container to give visual breathing room,
                but it won't be in the captured image since ref is on CheatSheet.
                In print mode, we remove padding to fit page. */}
            <div className="w-full overflow-x-auto p-6 flex justify-center items-start print:p-0 print:overflow-visible print:block">
               <CheatSheet ref={sheetRef} data={data} />
            </div>
          </div>
        )}
      </div>
    </PasswordGate>
  );
};

export default App;