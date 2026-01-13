import React, { forwardRef } from 'react';
import { Card } from './Card';
import { SectionHeading } from './SectionHeading';
import { Code } from './Code';
import { InternData } from './InputForm';

interface CheatSheetProps {
  data: InternData;
}

// ForwardRef is needed to allow parent to capture this DOM element for image generation
export const CheatSheet = forwardRef<HTMLDivElement, CheatSheetProps>(({ data }, ref) => {
  const linkClass = "text-[#2f7dff] hover:underline decoration-1 underline-offset-2 transition-colors";
  const mutedClass = "text-gray-500";
  const textBaseClass = "text-[13.5px] leading-[1.35] mb-2.5 text-gray-800";
  const listClass = `list-disc pl-[18px] ${textBaseClass} m-0`;
  const listItemClass = "my-1.5";

  const isIntern = data.staffType === 'Intern';

  // Default Booking QR
  const defaultQr = "https://api.qrserver.com/v1/create-qr-code/?size=100x100&color=000000&bgcolor=FFFFFF&data=https%3A%2F%2Foutlook.office.com%2Fbook%2FRegionalITTeamBookingTime%40usasean.org%2F%3Fismsaljsauthenabled";
  
  // Format Date for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "---";
    try {
      // Append time to ensure local date isn't shifted by timezone when parsing YYYY-MM-DD
      const date = new Date(dateStr + 'T12:00:00'); 
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  // Generate Username
  const generateUsername = (firstName: string, lastName: string) => {
    if (!firstName || !lastName) return "username@usasean.org";
    
    // Logic: First Initial + Last Name
    const firstInitial = firstName.trim().charAt(0).toLowerCase();
    const last = lastName.trim().toLowerCase();
    
    return `${firstInitial}${last}@usasean.org`;
  };

  const username = generateUsername(data.firstName, data.lastName);

  // Social Icons Paths
  const fbPath = "M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z";
  const xPath = "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";
  const liPath = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.451V1.729C24 .774 23.2 0 22.225 0z";

  return (
    <div 
      ref={ref} 
      className="w-[1000px] border border-gray-200 bg-white rounded-[14px] p-[22px] pb-[18px] shadow-sm print:border-0 print:shadow-none"
    >
      
      {/* Header */}
      <header className="border-b border-gray-200 pb-[14px] mb-[18px]">
        <h1 className="m-0 text-[22px] tracking-[0.2px] text-[#2f7dff] font-extrabold">
          US-ABC IT Onboarding ({isIntern ? 'Interns' : 'Staff'}) — Quick Start
        </h1>
        <p className={`mt-1.5 text-[13px] ${mutedClass}`}>
          Cheat sheet for email, required apps, mobile setup, Zoom, GrowthZone, and IT support. US-ASEAN Business Council Inc. (US-ABC).
        </p>
      </header>

      {/* Grid Content */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <Card>
            <SectionHeading>{isIntern ? 'Intern Details' : 'Staff Details'}</SectionHeading>
            <div className="grid grid-cols-[130px_1fr] gap-x-2.5 gap-y-2 text-[13.5px] mt-2">
              <div className={mutedClass}>{isIntern ? 'Intern Name' : 'Name'}</div>
              <div className="break-all font-bold text-gray-900">{data.firstName} {data.lastName}</div>
              
              <div className={mutedClass}>Start Date</div>
              <div className="break-all"><Code>{formatDate(data.startDate)}</Code></div>
              
              <div className={mutedClass}>Office / Team</div>
              <div className="break-all"><Code>{data.office || "---"}</Code></div>
              
              <div className={mutedClass}>Supervisor</div>
              <div className="break-all">
                <Code>{data.supervisor || "---"}</Code>
              </div>
            </div>

            <SectionHeading className="mt-[14px]">{isIntern ? 'Device Policy (BYOD)' : 'Device Policy'}</SectionHeading>
            {isIntern ? (
                <p className={textBaseClass}>
                  Interns use personal devices (BYOD). Company devices provided on a need basis. Contact IT immediately if you have hardware/compatibility issues.
                </p>
            ) : (
                <p className={textBaseClass}>
                  Work devices will be provided and processed by the IT Department.
                </p>
            )}

            <SectionHeading className="mt-[14px]">Email Login</SectionHeading>
            <p className={textBaseClass}>Sign in with US-ABC credentials:</p>
            <div className="grid grid-cols-[130px_1fr] gap-x-2.5 gap-y-2 text-[13.5px] mt-2">
              <div className={mutedClass}>Username</div>
              <div className="break-all">
                <Code>{username}</Code>
              </div>
              
              <div className={mutedClass}>Password</div>
              <div className="break-all"><Code>(See welcome email)</Code></div>
              
              <div className={mutedClass}>Webmail</div>
              <div className="break-all">
                <a href="https://outlook.office365.com/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  https://outlook.office365.com/
                </a>
              </div>
            </div>

            <SectionHeading className="mt-[14px]">Multifactor Authentication (MFA)</SectionHeading>
            <p className={textBaseClass}>
              Set up MFA immediately after first login. Download Microsoft Authenticator:
            </p>
            <div className="flex gap-2">
              <a href="https://apps.apple.com/us/app/microsoft-authenticator/id983156458" target="_blank" rel="noopener noreferrer" className={linkClass}>iOS App Store</a>
              <span className={mutedClass}>|</span>
              <a href="https://play.google.com/store/apps/details?id=com.azure.authenticator" target="_blank" rel="noopener noreferrer" className={linkClass}>Google Play</a>
            </div>

            <SectionHeading className="mt-[14px]">Device Requirements</SectionHeading>
            <ul className={listClass}>
              <li className={listItemClass}><strong>Windows:</strong> Windows 10 or later</li>
              <li className={listItemClass}><strong>macOS:</strong> macOS 12 (Monterey) or later</li>
              <li className={listItemClass}><strong>Internet:</strong> Stable connection required</li>
              <li className={listItemClass}><strong>Browser:</strong> Latest Chrome / Edge / Safari</li>
              <li className={listItemClass}><strong>Hardware:</strong> Webcam + microphone/headset required</li>
            </ul>
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <Card>
            <SectionHeading>Required Apps (Laptop)</SectionHeading>
            <ul className={listClass}>
              <li className={listItemClass}>
                <strong>Zoom:</strong>{' '}
                <a href="https://zoom.us/download" target="_blank" rel="noopener noreferrer" className={linkClass}>zoom.us/download</a>
              </li>
              <li className={listItemClass}>
                <strong>Office 365:</strong>{' '}
                <a href="https://portal.office.com/" target="_blank" rel="noopener noreferrer" className={linkClass}>portal.office.com</a>
              </li>
              <li className={listItemClass}>
                <strong>Microsoft Teams:</strong>{' '}
                <a href="https://www.microsoft.com/en-us/microsoft-365/microsoft-teams/download-app" target="_blank" rel="noopener noreferrer" className={linkClass}>Download Teams</a>
              </li>
            </ul>

            <SectionHeading className="mt-[14px]">Mobile Setup (O365 Access)</SectionHeading>
            <p className={textBaseClass}>
              <strong>Required:</strong> Install <strong>InTune Management Profile</strong> to access work apps.
              <br/>
              <a href="https://www.sweetprocess.com/kb/WkD8IjYD2HGR/article/dJBwI1fD5Zo/intune-install-intune-company-portal-on-ios/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                View Intune Installation Guide
              </a>
            </p>
            <p className="text-[13.5px] leading-[1.35] mb-[6px]"><strong>Install these apps:</strong></p>
            <ul className={listClass}>
              <li className={listItemClass}>Microsoft InTune</li>
              <li className={listItemClass}>Microsoft Outlook</li>
              <li className={listItemClass}>Microsoft Teams</li>
              <li className={listItemClass}>Zoom</li>
            </ul>

            <SectionHeading className="mt-[14px]">Zoom Access</SectionHeading>
            <p className={textBaseClass}>
              Select <strong>SSO (Single Sign-On)</strong> login.
              <br />
              Domain: <Code>usasean</Code>
              <br />
              Log in with US-ABC email credentials.
            </p>

            <SectionHeading className="mt-[14px]">GrowthZone</SectionHeading>
            <p className={textBaseClass}>
              Check <Code>usasean.org</Code> email for invite and setup instructions.
            </p>

            <SectionHeading className="mt-[14px]">Security & Compliance</SectionHeading>
            <ul className={listClass}>
              <li className={listItemClass}>Never share passwords.</li>
              <li className={listItemClass}>Lock screen when away.</li>
              <li className={listItemClass}>Use US-ABC email for work only.</li>
              <li className={listItemClass}>Store documents in O365/OneDrive/SharePoint.</li>
              <li className={listItemClass}>
                <strong>Suspicious emails?</strong> Forward to <a href="mailto:security@usasean.org" className={linkClass}>security@usasean.org</a> (CC IT).
              </li>
            </ul>

            <SectionHeading className="mt-[14px]">IT Training & Support</SectionHeading>
            <ul className={listClass}>
              <li className={listItemClass}>
                <strong>Book Onboarding/Support:</strong>{' '}
                <a href="https://outlook.office.com/book/RegionalITTeamBookingTime@usasean.org/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Booking Portal Link
                </a>
              </li>
              <li className={listItemClass}>
                <strong>Email:</strong>{' '}
                <a href="mailto:support@usasean.org" className={linkClass}>support@usasean.org</a>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className={`border-t border-gray-200 mt-4 pt-4 ${mutedClass} text-[12.5px]`}>
        <div className="flex flex-row justify-between gap-6">
          
          {/* Left: Support & Contacts */}
          <div className="flex flex-col gap-4 max-w-[60%]">
            <div className="text-gray-900 text-[13px]">
              <strong>Support:</strong> <a href="mailto:support@usasean.org" className={linkClass}>support@usasean.org</a>
            </div>
            
            <div>
              <div className="font-bold text-gray-900 mb-1.5 uppercase tracking-wide text-[11px] text-[#2f7dff]">Key Contacts</div>
              <ul className="list-none p-0 m-0 space-y-1">
                 <li>Kevin (<a href="mailto:kbyfield@usasean.org" className={linkClass}>kbyfield@usasean.org</a>) – IT Director</li>
                 <li>Ric (<a href="mailto:elacambra@usasean.org" className={linkClass}>elacambra@usasean.org</a>) – Regional IT Manager</li>
                 <li>Sassy (<a href="mailto:elacsamana@usasean.org" className={linkClass}>elacsamana@usasean.org</a>) – Digital Content</li>
                 <li>Luc Lloyd (<a href="mailto:llloyd@usasean.org" className={linkClass}>llloyd@usasean.org</a>) – BMM/GrowthZone</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-[12.5px] leading-relaxed">
              <div className="font-semibold text-gray-900 mb-1">Urgent Inquiries (Ric Lacambra)</div>
              <ul className="list-disc pl-4 space-y-0.5 text-gray-500">
                <li>
                  <strong>DC:</strong> <a href="tel:+12024166731" className="text-gray-700 hover:underline">202-416-6731</a> / WhatsApp <a href="https://wa.me/639171163686" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline">+63 (917) 1163-686</a>
                </li>
                <li>
                  <strong>Regional:</strong> Mobile/WhatsApp <a href="https://wa.me/639171163686" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline">+63 (917) 1163-686</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: QR & Links */}
          <div className="flex flex-col gap-4 items-end text-right">
            
            <div className="flex flex-col items-end gap-2">
              <div className="text-[12px] font-semibold text-[#2f7dff]">Scan for IT Support</div>
              <div className="p-1 bg-white border border-gray-200 rounded-lg shadow-sm">
                <img 
                  src={defaultQr} 
                  alt="Book IT Support QR" 
                  crossOrigin="anonymous"
                  className="w-[90px] h-[90px]" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
               <div><a href="https://www.usasean.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>www.usasean.org</a></div>
               
               <div className="flex gap-3">
                  <a href="https://web.facebook.com/USASEANBusiness/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2f7dff] transition-colors" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d={fbPath}/></svg>
                  </a>
                  <a href="https://x.com/USASEANBusiness" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2f7dff] transition-colors" aria-label="X (Twitter)">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d={xPath}/></svg>
                  </a>
                  <a href="https://www.linkedin.com/company/usaseanbusiness/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2f7dff] transition-colors" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d={liPath}/></svg>
                  </a>
               </div>

               <div className="text-[11px] opacity-60 max-w-[200px] leading-tight">
                  US-ASEAN Business Council Inc. <br/>
                  {isIntern ? 'Intern' : 'Staff'} IT Onboarding | v1.5
               </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
});

CheatSheet.displayName = 'CheatSheet';