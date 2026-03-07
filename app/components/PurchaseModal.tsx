'use client';

import React, { useState, useEffect } from 'react';
import {
  FaCreditCard,
  FaUniversity,
  FaShieldAlt,
  FaChevronRight,
  FaTimes,
  FaCheckCircle,
  FaFileAlt,
  FaSpinner,
} from 'react-icons/fa';

interface House {
  id: number | string;
  title: string;
  price: number;
}

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  house: House;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, house }) => {
  const [step, setStep] = useState<'details' | 'selection' | 'stripe' | 'bank' | 'escrow' | 'success'>('details');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStep('details');
      setSelectedFile(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('selection');
  };

  const simulateSubmit = (nextStep: 'success' | 'stripe' | 'bank' | 'escrow') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(nextStep === 'success' ? 'success' : nextStep);
    }, 1500);
  };

  if (!isOpen) return null;

  const handleClose = () => {
    setStep('details');
    onClose();
  };

  const stepIndex: Record<string, number> = { details: 0, selection: 1, stripe: 2, bank: 2, escrow: 2, success: 3 };
  const currentProgress = (stepIndex[step] / 3) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/70 backdrop-blur-sm transition-all">
      <div className="bg-white w-full max-w-lg rounded-t-xl md:rounded-sm shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-10 md:zoom-in duration-300 max-h-[95vh] flex flex-col">
        {/* PROGRESS BAR */}
        <div className="h-1 bg-gray-100 w-full shrink-0">
          <div
            className="h-full bg-[#FFB800] transition-all duration-500"
            style={{ width: `${currentProgress}%` }}
          />
        </div>

        {/* HEADER */}
        <div className="bg-[#1E3A8A] p-5 md:p-6 text-white flex justify-between items-center shrink-0">
          <div>
            <h3 className="font-black uppercase tracking-widest text-sm md:text-lg">
              {step === 'success' ? 'Confirmed' : step === 'details' ? 'Registration' : 'Payment'}
            </h3>
            <p className="text-[9px] md:text-[10px] opacity-70 uppercase font-bold truncate max-w-[200px] md:max-w-[250px]">
              {house.title}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-[#FFB800] transition-colors p-2"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="p-5 md:p-8 overflow-y-auto custom-scrollbar">
          {step === 'details' && (
            <form
              onSubmit={handleNext}
              className="space-y-5 md:space-y-6 animate-in fade-in duration-500"
            >
              <div className="border-b-2 border-gray-100 pb-3">
                <h3 className="text-lg md:text-xl font-black text-[#1E3A8A] uppercase tracking-tighter">
                  Buyer Registration
                </h3>
                <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase mt-1">
                  Legal info for contract
                </p>
              </div>

              <div className="space-y-4">
                <InputField
                  label="Full Legal Name"
                  placeholder="e.g. JOHN DOE"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Email Address"
                    type="email"
                    placeholder="JD@EXAMPLE.COM"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <InputField
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (000) 000-0000"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="bg-[#1E3A8A] p-4 text-white flex justify-between items-center rounded-sm">
                <div>
                  <p className="text-[7px] md:text-[8px] font-bold uppercase opacity-70">
                    Investment
                  </p>
                  <p className="text-base md:text-lg font-black">${house.price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[7px] md:text-[8px] font-bold uppercase opacity-70">ID</p>
                  <p className="text-xs font-black">#PRO-{house.id}</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FFB800] active:scale-[0.98] hover:bg-black text-white py-4 md:py-5 font-black uppercase text-[10px] md:text-[11px] tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                Continue{' '}
                <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          {/* SELECTION */}
          {step === 'selection' && (
            <div className="animate-in fade-in duration-300">
              <p className="text-gray-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-5 border-b border-gray-100 pb-3 text-center md:text-left">
                Select Payment Method
              </p>
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                <PaymentOption
                  icon={<FaCreditCard />}
                  title="Card Payment"
                  subtitle="Stripe Checkout"
                  onClick={() => setStep('stripe')}
                />
                <PaymentOption
                  icon={<FaUniversity />}
                  title="Bank Wire"
                  subtitle="Direct Transfer"
                  onClick={() => setStep('bank')}
                />
                <PaymentOption
                  icon={<FaShieldAlt />}
                  title="Escrow"
                  subtitle="Third-Party Holding"
                  onClick={() => setStep('escrow')}
                />
              </div>
            </div>
          )}

          {/* STRIPE OPTION */}
          {step === 'stripe' && (
            <div className="text-center py-2 space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-blue-50 p-6 border border-blue-100">
                <FaCreditCard className="mx-auto text-3xl md:text-4xl text-[#1E3A8A] mb-4" />
                <h4 className="font-black uppercase text-xs md:text-sm">Pay with Stripe</h4>
                <p className="text-[10px] md:text-xs text-gray-500 mt-2 leading-relaxed">
                  Secure checkout for ${house.price.toLocaleString()}.
                </p>
              </div>
              <button
                onClick={() => simulateSubmit('success')}
                disabled={isLoading}
                className="w-full bg-[#1E3A8A] text-white py-4 font-black uppercase text-[10px] tracking-widest flex justify-center items-center gap-2"
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : 'Proceed to Checkout'}
              </button>
            </div>
          )}

          {/* BANK OPTION */}
          {step === 'bank' && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-gray-50 p-4 md:p-6 border-2 border-dashed border-gray-200 text-[10px] md:text-[11px] font-mono space-y-2 relative">
                <div className="absolute top-2 right-2 bg-[#1E3A8A] text-white px-2 py-0.5 font-sans text-[7px] font-black uppercase">
                  USA Direct Transfer
                </div>
                <div className="space-y-1.5 text-gray-700">
                  <p>
                    <span className="text-gray-400 uppercase font-sans mr-2">Beneficiary:</span>{' '}
                    SMARTFLOW PVT. LTD
                  </p>
                  <p>
                    <span className="text-gray-400 uppercase font-sans mr-2">Bank Name:</span> US
                    FEDERAL TRUST
                  </p>

                  <div className="flex items-center justify-between">
                    <p>
                      <span className="text-gray-400 uppercase font-sans mr-2">Routing (ABA):</span>{' '}
                      123456789
                    </p>
                    <button
                      onClick={() => navigator.clipboard.writeText('123456789')}
                      className="text-[7px] bg-gray-200 px-1.5 py-0.5 uppercase font-bold"
                    >
                      Copy
                    </button>
                  </div>

                  {/* Account Number */}
                  <div className="flex items-center justify-between">
                    <p>
                      <span className="text-gray-400 uppercase font-sans mr-2">Account #:</span>{' '}
                      9876543210
                    </p>
                    <button
                      onClick={() => navigator.clipboard.writeText('9876543210')}
                      className="text-[7px] bg-gray-200 px-1.5 py-0.5 uppercase font-bold"
                    >
                      Copy
                    </button>
                  </div>

                  <p className="bg-blue-50 py-1 px-2 border-l-2 border-[#1E3A8A] mt-2">
                    <span className="text-gray-400 uppercase font-sans mr-2">Ref:</span>
                    <span className="font-black text-[#1E3A8A]">
                      #PRO-{house.id}-
                      {formData.name ? formData.name.split(' ')[0].toUpperCase() : 'PURCHASE'}
                    </span>
                  </p>
                </div>
              </div>

              {/* UPLOAD BOX */}
              <div
                className={`border-2 p-4 rounded-sm transition-all ${selectedFile ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-blue-50/30'}`}
              >
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-sm cursor-pointer bg-white">
                  <div className="text-center">
                    {selectedFile ? (
                      <p className="text-[9px] font-bold text-green-600 truncate max-w-[180px]">
                        ✓ {selectedFile.name}
                      </p>
                    ) : (
                      <p className="text-[9px] text-gray-500 font-black uppercase italic">
                        Upload Wire Receipt
                      </p>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedFile(e.currentTarget.files?.[0] ?? null)}
                  />
                </label>
              </div>

              {/* ACTIONS */}
              <div className="grid grid-cols-1 gap-2 pt-2">
                <button
                  onClick={() => simulateSubmit('success')}
                  disabled={!selectedFile || isLoading}
                  className="bg-[#1E3A8A] text-white py-4 font-black uppercase text-[10px] tracking-widest disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isLoading ? <FaSpinner className="animate-spin" /> : 'Confirm Transfer'}
                </button>

                <button
                  onClick={() => {
                    const refCode = `#PRO-${house.id}-${formData.name ? formData.name.split(' ')[0].toUpperCase() : 'PURCHASE'}`;
                    const bankInfo = `
SMARTFLOW PVT. LTD - USA WIRE INSTRUCTIONS
-----------------------------------------
Property: ${house.title}
Amount: $${house.price.toLocaleString()}
REQUIRED REFERENCE: ${refCode}

BANK DETAILS:
Bank: US FEDERAL TRUST
Routing (ABA): 123456789
Account #: 9876543210
Type: Business Checking
          `;
                    const element = document.createElement('a');
                    const file = new Blob([bankInfo], { type: 'text/plain' });
                    element.href = URL.createObjectURL(file);
                    element.download = `Smartflow_Wire_Details.txt`;
                    element.click();
                  }}
                  className="bg-white text-gray-700 py-3 font-black uppercase text-[9px] border-2 border-gray-100"
                >
                  Download Wire Info
                </button>
              </div>
            </div>
          )}

          {/* ESCROW OPTION */}
          {step === 'escrow' && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <div className="flex gap-3 bg-green-50 p-4 border border-green-100">
                <FaShieldAlt className="text-green-600 text-xl md:text-2xl shrink-0" />
                <p className="text-[10px] md:text-[11px] text-green-800 font-medium leading-relaxed">
                  Funds released to seller only after title deed verification.
                </p>
              </div>
              <button
                onClick={() => simulateSubmit('success')}
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-4 font-black uppercase text-[10px] tracking-widest flex justify-center items-center gap-2"
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : 'Start Escrow'}
              </button>
            </div>
          )}

          {/* SUCCESS VIEW */}
          {step === 'success' && (
            <div className="py-6 md:py-10 text-center space-y-4 animate-in zoom-in duration-500">
              <FaCheckCircle className="mx-auto text-green-500 text-5xl md:text-6xl" />
              <h4 className="text-lg md:text-xl font-black uppercase text-gray-900">
                Request Received!
              </h4>
              <p className="text-gray-500 text-xs md:text-sm font-medium px-2">
                Contract preparation started for{' '}
                <span className="text-[#1E3A8A] font-bold">{house.title}</span>.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 px-10 py-3 bg-[#1E3A8A] text-white font-black uppercase text-[9px] md:text-[10px] tracking-widest"
              >
                Back
              </button>
            </div>
          )}

          {/* BACK BUTTON */}
          {step !== 'details' && step !== 'success' && !isLoading && (
            <button
              onClick={() => setStep('selection')}
              className="mt-6 text-[8px] font-black uppercase text-gray-400 hover:text-[#1E3A8A] flex items-center gap-1 mx-auto"
            >
              ← Change Method
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

type InputFieldProps = React.ComponentPropsWithoutRef<'input'> & { label: string };
const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-[8px] md:text-[9px] font-black uppercase text-gray-500 tracking-widest">
      {label}
    </label>
    <input
      {...props}
      className="w-full border-2 border-gray-100 p-3 md:p-4 text-[11px] md:text-xs font-bold uppercase focus:border-[#1E3A8A] outline-none transition-all bg-gray-50/50 rounded-sm"
    />
  </div>
);

type PaymentOptionProps = {
  icon: React.ReactElement<any>;
  title: string;
  subtitle: string;
  onClick: () => void;
};
const PaymentOption: React.FC<PaymentOptionProps> = ({ icon, title, subtitle, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between p-4 md:p-5 border-2 border-gray-50 hover:border-[#1E3A8A] active:bg-blue-50 transition-all group text-left rounded-sm w-full"
  >
    <div className="flex items-center gap-3 md:gap-4">
      <div className="bg-gray-100 p-2 md:p-3 rounded-full text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 16 } as any) : icon}
      </div>
      <div>
        <span className="block font-black uppercase text-[10px] md:text-[11px] tracking-tight text-gray-900">
          {title}
        </span>
        <span className="block text-[8px] md:text-[9px] text-gray-400 font-bold uppercase">
          {subtitle}
        </span>
      </div>
    </div>
    <FaChevronRight className="text-gray-300 group-hover:text-[#1E3A8A] transition-transform group-hover:translate-x-1" />
  </button>
);

export default PurchaseModal;
