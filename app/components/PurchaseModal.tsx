'use client';

import React, { useState } from 'react';
import {
  FaCreditCard,
  FaUniversity,
  FaShieldAlt,
  FaChevronRight,
  FaTimes,
  FaCheckCircle,
  FaInfoCircle,
} from 'react-icons/fa';

const PurchaseModal = ({ isOpen, onClose, house }) => {
  const [step, setStep] = useState('selection');

  if (!isOpen) return null;

  const handleClose = () => {
    setStep('selection');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all">
      <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* HEADER */}
        <div className="bg-[#1E3A8A] p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="font-black uppercase tracking-widest text-lg">
              {step === 'selection' ? 'Initialize Purchase' : 'Payment Details'}
            </h3>
            <p className="text-[10px] opacity-70 uppercase font-bold truncate max-w-[250px]">
              {house.title}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-[#FFB800] transition-colors p-2"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-8">
          {/* SELECTION */}
          {step === 'selection' && (
            <div className="animate-in fade-in duration-300">
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border-b border-gray-100 pb-3">
                Select Your Preferred Payment Method
              </p>
              <div className="grid grid-cols-1 gap-4">
                <PaymentOption
                  icon={<FaCreditCard />}
                  title="Secure Card Payment"
                  subtitle="Stripe Checkout - Visa, Master"
                  onClick={() => setStep('stripe')}
                />
                <PaymentOption
                  icon={<FaUniversity />}
                  title="Bank Wire Transfer"
                  subtitle="Direct Swift/IBAN Transfer"
                  onClick={() => setStep('bank')}
                />
                <PaymentOption
                  icon={<FaShieldAlt />}
                  title="Escrow Protection"
                  subtitle="Secure Third-Party Holding"
                  onClick={() => setStep('escrow')}
                />
              </div>
            </div>
          )}

          {/*  STRIPE OPTION */}
          {step === 'stripe' && (
            <div className="text-center py-4 space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-blue-50 p-6 border border-blue-100">
                <FaCreditCard className="mx-auto text-4xl text-[#1E3A8A] mb-4" />
                <h4 className="font-black uppercase text-sm">Pay with Stripe</h4>
                <p className="text-xs text-gray-500 mt-2">
                  You will be redirected to Stripe's secure checkout to complete your $
                  {house.price.toLocaleString()} payment.
                </p>
              </div>
              <button
                onClick={() => setStep('success')}
                className="w-full bg-[#1E3A8A] text-white py-4 font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          )}

          {/* BANK OPTION */}
          {step === 'bank' && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-gray-50 p-6 border-2 border-dashed border-gray-200 text-[11px] font-mono space-y-2 relative">
                <div className="absolute top-2 right-2 bg-[#1E3A8A] text-white px-2 py-0.5 font-sans text-[8px] font-black uppercase">
                  Transfer details
                </div>
                <p className="font-black text-gray-400 uppercase font-sans mb-2 tracking-widest">
                  Official Bank Info:
                </p>
                <div className="space-y-1 text-gray-700">
                  <p>
                    <span className="text-gray-400">BANK:</span> US FEDERAL TRUST
                  </p>
                  <div className="flex justify-between items-center group">
                    <p>
                      <span className="text-gray-400">IBAN:</span> US76 1234 5678 9012
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('US76 1234 5678 9012');
                        alert('IBAN copied to clipboard!');
                      }}
                      className="text-[9px] bg-gray-200 px-2 py-1 font-sans font-bold uppercase hover:bg-[#1E3A8A] hover:text-white transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <p>
                    <span className="text-gray-400">REF:</span> #PRO-{house.id}
                  </p>
                </div>
              </div>

              {/* UPLOAD SECTION */}
              <div className="border-2 border-gray-100 p-5 rounded-sm bg-blue-50/30">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-[10px] font-black text-[#1E3A8A] uppercase tracking-widest">
                    Upload Payment Receipt
                  </label>
                  <span className="text-[8px] text-gray-400 font-bold uppercase">
                    PDF, JPG, or PNG
                  </span>
                </div>

                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-sm cursor-pointer bg-white hover:bg-gray-50 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-[10px] text-gray-500 font-bold uppercase">
                        Click to upload invoice
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,image/*"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          alert(`Selected: ${e.target.files[0].name}`);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    const element = document.createElement('a');
                    const file = new Blob(
                      [
                        `INVOICE DETAILS\nProperty: ${house.title}\nIBAN: US76 1234 5678 9012\nREF: #PRO-${house.id}`,
                      ],
                      { type: 'text/plain' }
                    );
                    element.href = URL.createObjectURL(file);
                    element.download = `Invoice_Info_${house.id}.txt`;
                    element.click();
                  }}
                  className="bg-white text-gray-700 py-4 font-black uppercase text-[10px] tracking-widest border-2 border-gray-100 hover:bg-gray-50 transition-all"
                >
                  Download Info
                </button>

                <button
                  onClick={() => setStep('success')}
                  className="bg-[#1E3A8A] text-white py-4 font-black uppercase text-[10px] tracking-widest hover:bg-green-600 transition-all shadow-xl"
                >
                  Submit Receipt
                </button>
              </div>

              <p className="text-[8px] text-center text-gray-400 font-bold uppercase italic leading-tight">
                * A payment confirmation email will be sent to you <br /> once the receipt is
                verified.
              </p>
            </div>
          )}

          {/* ESCROW OPTION */}
          {step === 'escrow' && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <div className="flex gap-4 bg-green-50 p-4 border border-green-100">
                <FaShieldAlt className="text-green-600 text-2xl shrink-0" />
                <p className="text-[11px] text-green-800 font-medium">
                  Escrow ensures your funds are only released to the seller once the title deed is
                  verified.
                </p>
              </div>
              <button
                onClick={() => setStep('success')}
                className="w-full bg-green-600 text-white py-4 font-black uppercase text-[10px] tracking-widest"
              >
                Start Escrow Process
              </button>
            </div>
          )}

          {/* SUCCESS VIEW */}
          {step === 'success' && (
            <div className="py-10 text-center space-y-4 animate-in zoom-in duration-500">
              <FaCheckCircle className="mx-auto text-green-500 text-6xl" />
              <h4 className="text-xl font-black uppercase text-gray-900">Request Received!</h4>
              <p className="text-gray-500 text-sm font-medium">
                Our agents are preparing your contract for{' '}
                <span className="text-[#1E3A8A] font-bold">{house.title}</span>.
              </p>
              <button
                onClick={handleClose}
                className="mt-6 px-10 py-3 bg-[#1E3A8A] text-white font-black uppercase text-[10px] tracking-widest"
              >
                Back to Property
              </button>
            </div>
          )}

          {/* BACK BUTTON  */}
          {step !== 'selection' && step !== 'success' && (
            <button
              onClick={() => setStep('selection')}
              className="mt-4 text-[9px] font-black uppercase text-gray-400 hover:text-[#1E3A8A] flex items-center gap-1 mx-auto"
            >
              ← Change Payment Method
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const PaymentOption = ({ icon, title, subtitle, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between p-5 border-2 border-gray-50 hover:border-[#1E3A8A] hover:bg-blue-50/30 transition-all group text-left"
  >
    <div className="flex items-center gap-4">
      <div className="bg-gray-100 p-3 rounded-full text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <div>
        <span className="block font-black uppercase text-[11px] tracking-tight text-gray-900">
          {title}
        </span>
        <span className="block text-[9px] text-gray-400 font-bold uppercase">{subtitle}</span>
      </div>
    </div>
    <FaChevronRight className="text-gray-300 group-hover:text-[#1E3A8A] transition-transform group-hover:translate-x-1" />
  </button>
);

export default PurchaseModal;
