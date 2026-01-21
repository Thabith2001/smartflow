'use client';
import React, { useState, useRef, useEffect } from 'react';
import RoleGuard from '../../../components/RoleGuard';
import {
  FaCogs,
  FaPalette,
  FaImage,
  FaClock,
  FaSave,
  FaGlobe,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaEye,
  FaUpload,
  FaTools,
  FaFileInvoiceDollar,
  FaShieldAlt,
  FaLanguage,
  FaRobot,
  FaCheckCircle,
  FaExclamationTriangle,
  FaServer,
  FaBell,
  FaDatabase,
  FaMagic,
  FaHistory, // <--- Add this
} from 'react-icons/fa';

/** * INTERFACES & TYPES
 */
interface SystemConfig {
  // Branding
  siteName: string;
  primaryColor: string;
  secondaryColor: string;
  bannerText: string;
  bannerSubtext: string;
  bannerImageUrl: string;
  logoUrl: string | null;
  // Footer
  footerAddress: string;
  footerEmail: string;
  footerPhone: string;
  socialLinks: { facebook: string; twitter: string; linkedin: string; instagram: string };
  // Logic & AI
  autoAssignTechnician: boolean;
  emergencySLA: number;
  enableAiChatbot: boolean;
  autoLateFee: boolean;
  vatRate: number;
  // Localization
  timezone: string;
  timeFormat: '12h' | '24h';
  defaultLanguage: string;
  supportedLanguages: string[];
  // Security
  enforceWCAG: boolean;
  twoFactorAuth: boolean;
}

export default function MegaAdminSettings() {
  // 1. STATE MANAGEMENT
  const [activeTab, setActiveTab] = useState<
    'branding' | 'theme' | 'finance' | 'logic' | 'footer' | 'system'
  >('branding');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [config, setConfig] = useState<SystemConfig>({
    siteName: 'Horizon Property Management',
    primaryColor: '#3b82f6',
    secondaryColor: '#1e293b',
    bannerText: 'Experience Modern Living with Horizon',
    bannerSubtext: 'The premium choice for smart property management and tenant care.',
    bannerImageUrl:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    logoUrl: null,
    footerAddress: '7700 Real Estate Ave, Suite 100, Miami, FL',
    footerEmail: 'admin@horizon-pms.com',
    footerPhone: '+1 (555) 000-1234',
    socialLinks: { facebook: 'https://fb.com', twitter: '', linkedin: '', instagram: '' },
    autoAssignTechnician: true,
    emergencySLA: 4,
    enableAiChatbot: true,
    autoLateFee: true,
    vatRate: 15,
    timezone: 'UTC-5 (EST)',
    timeFormat: '12h',
    defaultLanguage: 'English',
    supportedLanguages: ['English', 'Spanish', 'Arabic'],
    enforceWCAG: true,
    twoFactorAuth: true,
  });

  // 2. HANDLERS
  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setLastSaved(new Date().toLocaleTimeString());
  };

  const updateNestedConfig = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setConfig((prev) => ({ ...prev, bannerImageUrl: url }));
    }
  };

  // 3. UI COMPONENTS (INTERNAL)
  const TabNav = ({ id, icon, label }: { id: any; icon: any; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-lg text-sm font-medium transition-all duration-200 ${
        activeTab === id
          ? 'bg-blue-600 text-white shadow-lg shadow-indigo-200'
          : 'text-slate-500 hover:bg-slate-50'
      }`}
    >
      <span className={activeTab === id ? 'text-white' : 'text-slate-400'}>{icon}</span>
      {label}
    </button>
  );

  return (
    <RoleGuard allow={['ADMIN']}>
      <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-inter text-slate-900">
        {/* TOP BAR */}
        <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-50 rounded-xl text-blue-600 text-xl">
              <FaCogs />
            </div>
            <div>
              <h1 className="text-2xl font-medium uppercase tracking-tight">System CMS</h1>
              <p className="text-slate-500 text-sm flex items-center gap-2">
                Server:{' '}
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <FaServer size={12} /> Online
                </span>
                {lastSaved && <span className="text-slate-400">| Last Sync: {lastSaved}</span>}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex gap-2">
            <button className="px-5 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg font-medium text-sm hover:bg-slate-100 transition active:scale-95">
              Discard
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition flex items-center gap-2 active:scale-95"
            >
              {isSaving ? (
                <>
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-4 w-4"></span>
                  Syncing...
                </>
              ) : (
                <>
                  <FaSave /> Apply Changes
                </>
              )}
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* SIDEBAR NAVIGATION */}
          <div className="lg:col-span-3 space-y-6">
            {/* Navigation */}
            <nav className="bg-white p-4 rounded-2xl border  border-slate-200 shadow-sm space-y-2">
              <TabNav id="branding" icon={<FaImage />} label="Public Landing" />
              <TabNav id="theme" icon={<FaPalette />} label="Brand Identity" />
              <TabNav id="logic" icon={<FaMagic />} label="AI & Automation" />
              <TabNav id="finance" icon={<FaFileInvoiceDollar />} label="Finance Rules" />
              <TabNav id="footer" icon={<FaGlobe />} label="Global Footer" />
              <TabNav id="system" icon={<FaShieldAlt />} label="Security & Time" />
            </nav>

            {/* Audit Card */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative group">
              <FaDatabase className="absolute -bottom-4 -right-4 text-white/10 text-7xl transition-transform group-hover:scale-110" />
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-4 flex items-center gap-2">
                <FaHistory /> Audit Overview
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Database Engine</span>
                  <span className="text-emerald-500 font-medium uppercase">PostgreSQL</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Assets CDN</span>
                  <span className="text-emerald-500 font-medium uppercase">Cloudinary</span>
                </div>
              </div>
              <button className="w-full mt-6 py-2 bg-slate-800 rounded-lg text-xs font-semibold uppercase hover:bg-slate-700 transition border border-slate-700">
                View Full Logs
              </button>
            </div>
          </div>

          {/* MAIN CONTENT PANELS */}
          <div className="lg:col-span-9 bg-white rounded-lg border border-slate-200 shadow-2xl shadow-slate-200/40 min-h-[700px] relative overflow-hidden">
            {/* 1. BRANDING & BANNER */}
            {activeTab === 'branding' && (
              <div className="p-10 space-y-8  animate-in slide-in-from-bottom-4 duration-500">
                <SectionHeader
                  title="Landing Page Branding"
                  desc="Configure your public-facing hero section and site name."
                />

                <div className="space-y-6">
                  {/* Banner Preview Frame */}
                  <div className="relative h-72 w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white group">
                    <img
                      src={config.bannerImageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
                      <h3 className="text-white text-3xl font-semibold mb-2">
                        {config.bannerText}
                      </h3>
                      <p className="text-white/70 text-sm max-w-xl">{config.bannerSubtext}</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-2xl border border-white/20 transition-all"
                      >
                        <FaUpload />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                        accept="image/*"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputGroup
                      label="Site Display Name"
                      value={config.siteName}
                      onChange={(v) => updateNestedConfig('siteName', v)}
                    />
                    <InputGroup
                      label="Hero Headline Text"
                      value={config.bannerText}
                      onChange={(v) => updateNestedConfig('bannerText', v)}
                    />
                  </div>
                  <TextAreaGroup
                    label="Banner Description"
                    value={config.bannerSubtext}
                    onChange={(v) => updateNestedConfig('bannerSubtext', v)}
                  />
                </div>
              </div>
            )}

            {/* 2. THEME CUSTOMIZATION */}
            {activeTab === 'theme' && (
              <div className="p-10 space-y-10 animate-in slide-in-from-bottom-4 duration-500">
                <SectionHeader
                  title="Color Systems & Palettes"
                  desc="Control the primary UI accents for the entire platform."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <ColorUnit
                    label="Primary Accent"
                    desc="Used for CTA buttons, primary icons, and active links."
                    color={config.primaryColor}
                    onChange={(v) => updateNestedConfig('primaryColor', v)}
                  />
                  <ColorUnit
                    label="Secondary Theme"
                    desc="Used for sidebar backgrounds, headers, and footer blocks."
                    color={config.secondaryColor}
                    onChange={(v) => updateNestedConfig('secondaryColor', v)}
                  />
                </div>

                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-6">
                  <h4 className="text-xs font-medium uppercase text-slate-400 tracking-widest">
                    Component Simulation
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    <button
                      className="px-8 py-3 rounded-2xl text-white font-bold transition-all shadow-lg"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      Primary Button
                    </button>
                    <button
                      className="px-8 py-3 rounded-2xl font-bold border-2 transition-all"
                      style={{ borderColor: config.primaryColor, color: config.primaryColor }}
                    >
                      Secondary Outline
                    </button>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                      style={{ backgroundColor: config.secondaryColor }}
                    >
                      <FaCogs />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. AI & LOGIC */}
            {activeTab === 'logic' && (
              <div className="p-10 space-y-10 animate-in slide-in-from-bottom-4 duration-500">
                <SectionHeader
                  title="Operational Intelligence"
                  desc="Configure AI triggers and maintenance automation rules."
                />
                <div className="space-y-4">
                  <ComplexToggle
                    icon={<FaRobot className="text-indigo-600" />}
                    title="AI Work Order Routing"
                    desc="Automatically analyze tenant requests and assign the best available technician based on distance."
                    checked={config.autoAssignTechnician}
                    onChange={(v) => updateNestedConfig('autoAssignTechnician', v)}
                  />
                  <ComplexToggle
                    icon={<FaBell className="text-amber-500" />}
                    title="Smart Tenant Notifications"
                    desc="Use AI to personalize welcome emails and rent reminders."
                    checked={config.enableAiChatbot}
                    onChange={(v) => updateNestedConfig('enableAiChatbot', v)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <NumberUnit
                    label="Emergency Response SLA (Hrs)"
                    value={config.emergencySLA}
                    onChange={(v) => updateNestedConfig('emergencySLA', v)}
                  />
                </div>
              </div>
            )}

            {/* 4. FINANCIAL RULES */}
            {activeTab === 'finance' && (
              <div className="p-10 space-y-10 animate-in slide-in-from-bottom-4 duration-500">
                <SectionHeader
                  title="Governance & Taxes"
                  desc="Manage VAT rates and automated penalty triggers."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputGroup
                    label="Global VAT Rate (%)"
                    value={config.vatRate.toString()}
                    type="number"
                    onChange={(v) => updateNestedConfig('vatRate', Number(v))}
                  />
                  <SelectUnit
                    label="Billing Cycle"
                    options={['1st of Month', '15th of Month', 'Dynamic']}
                  />
                </div>
                <ComplexToggle
                  icon={<FaFileInvoiceDollar className="text-emerald-600" />}
                  title="Automated Late Fee Penalty"
                  desc="Automatically apply a 5% penalty to accounts overdue by 3 days."
                  checked={config.autoLateFee}
                  onChange={(v) => updateNestedConfig('autoLateFee', v)}
                />
              </div>
            )}

            {/* 5. FOOTER & SOCIAL */}
            {activeTab === 'footer' && (
              <div className="p-10 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                <SectionHeader
                  title="Public Contact Metadata"
                  desc="Define details shown in the global footer and on contact pages."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup
                    label="Physical Office Address"
                    value={config.footerAddress}
                    onChange={(v) => updateNestedConfig('footerAddress', v)}
                  />
                  <InputGroup
                    label="Global Support Email"
                    value={config.footerEmail}
                    onChange={(v) => updateNestedConfig('footerEmail', v)}
                  />
                </div>
                <div className="space-y-4 pt-6">
                  <h4 className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                    Social Presence URLs
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SocialUnit
                      icon={<FaFacebook />}
                      label="Facebook"
                      placeholder="https://facebook.com/yourpage"
                    />
                    <SocialUnit
                      icon={<FaTwitter />}
                      label="Twitter / X"
                      placeholder="https://x.com/yourbrand"
                    />
                    <SocialUnit
                      icon={<FaLinkedin />}
                      label="LinkedIn"
                      placeholder="https://linkedin.com/company/..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 6. SECURITY & SYSTEM */}
            {activeTab === 'system' && (
              <div className="p-10 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                <SectionHeader
                  title="Localization & Security"
                  desc="Manage how time, language, and security are handled."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <SelectUnit
                    label="Platform Language"
                    options={['English (US)', 'Spanish (ES)', 'Arabic (AE)']}
                  />
                  <SelectUnit
                    label="Time Format"
                    options={['12-hour (AM/PM)', '24-hour (Military)']}
                  />
                  <SelectUnit
                    label="Primary Timezone"
                    options={['UTC-5 (EST)', 'UTC+0 (GMT)', 'UTC+8 (SGT)']}
                  />
                </div>
                <div className="pt-6 space-y-4 border-t border-slate-100">
                  <ComplexToggle
                    icon={<FaShieldAlt className="text-slate-800" />}
                    title="Enforce Two-Factor Auth (2FA)"
                    desc="Mandatory for all Admin and Manager roles."
                    checked={config.twoFactorAuth}
                    onChange={(v) => updateNestedConfig('twoFactorAuth', v)}
                  />
                  <ComplexToggle
                    icon={<FaCheckCircle className="text-blue-500" />}
                    title="WCAG 2.1 Accessibility"
                    desc="Optimize color contrast and screen-reader support across all tenant dashboards."
                    checked={config.enforceWCAG}
                    onChange={(v) => updateNestedConfig('enforceWCAG', v)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}

/** * HELPER UI SUB-COMPONENTS
 */

const SectionHeader = ({ title, desc }: { title: string; desc: string }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-medium text-slate-800 uppercase tracking-tight">{title}</h2>
    <p className="text-slate-500 font-medium mt-1">{desc}</p>
  </div>
);

const InputGroup = ({ label, value, onChange, type = 'text' }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-blue-600 outline-none transition-all font-medium text-slate-700"
    />
  </div>
);

const TextAreaGroup = ({ label, value, onChange }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-1">
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-indigo-100 focus:border-blue-600 outline-none transition-all font-medium text-slate-700 leading-relaxed"
    />
  </div>
);

const ColorUnit = ({ label, desc, color, onChange }: any) => (
  <div className="space-y-4 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
    <div>
      <h4 className="text-sm font-medium text-slate-800 uppercase tracking-wide">{label}</h4>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
    <div className="flex items-center gap-4">
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-16 h-16 bg-transparent cursor-pointer rounded-2xl border-none outline-none scale-110"
      />
      <div className="flex-1 bg-slate-100 px-6 py-3 rounded-2xl text-sm font-mono text-slate-600 font-bold uppercase tracking-wider">
        {color}
      </div>
    </div>
  </div>
);

const ComplexToggle = ({ icon, title, desc, checked, onChange }: any) => (
  <div className="flex items-center justify-between p-6 rounded-[2rem] border bg-slate-50  border-slate-300 hover:border-indigo-200 hover:bg-white transition-all group">
    <div className="flex items-center gap-5">
      <div className="text-2xl transition-transform group-hover:scale-110">{icon}</div>
      <div>
        <p className="text-sm font-medium text-slate-800 uppercase tracking-wide">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5 max-w-sm leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer scale-110">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-12 h-6 bg-slate-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all shadow-inner"></div>
    </label>
  </div>
);

const SelectUnit = ({ label, options }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-medium text-slate-400 uppercase tracking-widest px-1">
      {label}
    </label>
    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium text-slate-700 outline-none cursor-pointer focus:ring-4 focus:ring-indigo-100 appearance-none">
      {options.map((opt: string) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const SocialUnit = ({ icon, label, placeholder }: any) => (
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-lg group-focus-within:text-blue-600 transition-colors">
      {icon}
    </div>
    <input
      type="text"
      placeholder={placeholder}
      className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    />
  </div>
);

const NumberUnit = ({ label, value, onChange }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-medium text-slate-400 uppercase tracking-widest px-1">
      {label}
    </label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none"
    />
  </div>
);
