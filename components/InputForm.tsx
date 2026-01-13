import React, { useState } from 'react';
import { Card } from './Card';
import { SectionHeading } from './SectionHeading';

export interface InternData {
  firstName: string;
  lastName: string;
  startDate: string;
  office: string;
  supervisor: string;
  staffType: 'Intern' | 'Regular Staff';
}

interface InputFormProps {
  onSubmit: (data: InternData) => void;
  initialData: InternData;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<InternData>(initialData);

  const offices = [
    "Washington, D.C.",
    "Brunei",
    "Cambodia",
    "Indonesia",
    "Laos",
    "Malaysia",
    "Myanmar",
    "Philippines",
    "Singapore",
    "Thailand",
    "Vietnam"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass = "w-full bg-white border border-gray-300 rounded p-2 text-gray-900 text-sm focus:border-[#2f7dff] focus:ring-1 focus:ring-[#2f7dff] focus:outline-none transition-colors mb-4 placeholder-gray-400";
  const labelClass = "block text-gray-500 text-xs uppercase tracking-wide mb-1.5 font-bold";

  return (
    <div className="w-full max-w-[600px] mx-auto pt-10 pb-20 px-4">
      <Card>
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-xl font-bold text-[#2f7dff]">Generate Onboarding Cheat Sheet</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in the details below to create a custom one-pager.</p>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className={labelClass}>Employee Type</label>
             <div className="flex gap-6 mt-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="staffType" 
                    value="Intern" 
                    checked={formData.staffType === 'Intern'} 
                    onChange={handleChange}
                    className="w-4 h-4 text-[#2f7dff] border-gray-300 focus:ring-[#2f7dff] accent-[#2f7dff]"
                  />
                  <span className="ml-2 text-sm text-gray-700">Intern</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="staffType" 
                    value="Regular Staff" 
                    checked={formData.staffType === 'Regular Staff'} 
                    onChange={handleChange}
                    className="w-4 h-4 text-[#2f7dff] border-gray-300 focus:ring-[#2f7dff] accent-[#2f7dff]"
                  />
                  <span className="ml-2 text-sm text-gray-700">Regular Staff</span>
                </label>
             </div>
          </div>

          <SectionHeading>{formData.staffType === 'Intern' ? 'Intern' : 'Staff'} Information</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>First Name</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange}
                placeholder="Jane"
                className={inputClass}
                required 
              />
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange}
                placeholder="Doe"
                className={inputClass}
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Start Date</label>
              <input 
                type="date" 
                name="startDate" 
                value={formData.startDate} 
                onChange={handleChange}
                className={`${inputClass} accent-[#2f7dff]`} 
                required
              />
            </div>
            <div>
              <label className={labelClass}>Office / Team</label>
              <select 
                name="office" 
                value={formData.office} 
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="" disabled>Select Office</option>
                {offices.map(office => (
                  <option key={office} value={office}>{office}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Supervisor (Optional)</label>
            <input 
              type="text" 
              name="supervisor" 
              value={formData.supervisor} 
              onChange={handleChange}
              placeholder="Name / Department"
              className={inputClass} 
            />
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
            <button 
              type="submit" 
              className="bg-[#2f7dff] hover:bg-[#1a65e6] text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-colors shadow-lg shadow-blue-500/30"
            >
              Generate Cheat Sheet
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};