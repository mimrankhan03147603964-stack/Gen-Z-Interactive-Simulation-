import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, AlertCircle, CheckCircle2, MessageCircle, Mail } from 'lucide-react';

interface RequestSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CLASS_OPTIONS = [
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
  'Other'
];

const SUBJECT_OPTIONS = [
  'Physics',
  'Chemistry',
  'Biology',
  'Mathematics',
  'Computer Science',
  'General Science',
  'English',
  'Other'
];

const DEVELOPER_WHATSAPP_NUMBER = '923147603964';
const DEVELOPER_GMAIL_ADDRESS = 'mimrankhan3964@gmail.com';

export const RequestSimulationModal: React.FC<RequestSimulationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [topicName, setTopicName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [principalName, setPrincipalName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [extraDetails, setExtraDetails] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedUrls, setSubmittedUrls] = useState<{ whatsapp: string; gmail: string }>({
    whatsapp: '',
    gmail: ''
  });

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedClass('');
      setSelectedSubject('');
      setCustomSubject('');
      setTopicName('');
      setSchoolName('');
      setPrincipalName('');
      setPhoneNumber('');
      setExtraDetails('');
      setErrors({});
      setIsSubmitted(false);
      setSubmittedUrls({ whatsapp: '', gmail: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const trimmedClass = selectedClass.trim();
    if (!trimmedClass) {
      newErrors.selectedClass = 'Please select a Class.';
    }

    const trimmedSubject = selectedSubject.trim();
    if (!trimmedSubject) {
      newErrors.selectedSubject = 'Please select a Subject.';
    } else if (trimmedSubject === 'Other') {
      const trimmedCustomSub = customSubject.trim();
      if (!trimmedCustomSub) {
        newErrors.customSubject = 'Please specify the Subject.';
      }
    }

    const trimmedTopic = topicName.trim();
    if (!trimmedTopic) {
      newErrors.topicName = 'Please enter the topic name.';
    }

    const trimmedSchool = schoolName.trim();
    if (!trimmedSchool) {
      newErrors.schoolName = 'Please enter your school name.';
    }

    const trimmedPrincipal = principalName.trim();
    if (!trimmedPrincipal) {
      newErrors.principalName = "Please enter the Principal's name.";
    }

    const trimmedPhone = phoneNumber.trim();
    if (!trimmedPhone) {
      newErrors.phoneNumber = 'Please enter a WhatsApp / mobile phone number.';
    } else {
      // Must accept only digits, spaces, + and -
      const validCharsRegex = /^[0-9+\-\s]+$/;
      const digitsOnly = trimmedPhone.replace(/\D/g, '');
      if (!validCharsRegex.test(trimmedPhone)) {
        newErrors.phoneNumber = 'Phone number may only contain digits, spaces, + and -.';
      } else if (digitsOnly.length < 10) {
        newErrors.phoneNumber = 'Please enter at least 10 digits for the phone number.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const trimmedClass = selectedClass.trim();
    const finalSubject = selectedSubject === 'Other' ? customSubject.trim() : selectedSubject.trim();
    const trimmedTopic = topicName.trim();
    const trimmedSchool = schoolName.trim();
    const trimmedPrincipal = principalName.trim();
    const trimmedPhone = phoneNumber.trim();
    const trimmedExtra = extraDetails.trim();

    // Construct the standardized message text exactly as specified
    let messageBody = `New Simulation Request\n-----------------------\nSchool Name: ${trimmedSchool}\nPrincipal Name: ${trimmedPrincipal}\nPhone Number: ${trimmedPhone}\nClass: ${trimmedClass}\nSubject: ${finalSubject}\nTopic Name: ${trimmedTopic}\n`;
    if (trimmedExtra) {
      messageBody += `Extra Details: ${trimmedExtra}\n`;
    }
    messageBody += `Sent from: GEN Z Interactive Simulations Portal`;

    const encodedMessage = encodeURIComponent(messageBody);
    const emailSubject = `New Simulation Request - ${trimmedTopic} (${trimmedSchool})`;
    const encodedEmailSubject = encodeURIComponent(emailSubject);

    // 1. WhatsApp link
    const whatsappUrl = `https://wa.me/${DEVELOPER_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // 2. Gmail compose link
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${DEVELOPER_GMAIL_ADDRESS}&su=${encodedEmailSubject}&body=${encodedMessage}`;

    setSubmittedUrls({
      whatsapp: whatsappUrl,
      gmail: gmailUrl
    });

    // In the SAME click action, open BOTH in new windows/tabs (not inside a timer or promise)
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Failed to open WhatsApp window:', err);
    }

    try {
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Failed to open Gmail window:', err);
    }

    // Switch to success fallback screen
    setIsSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100001] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.72)',
        backdropFilter: 'blur(4px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="w-full max-w-xl rounded-2xl sm:rounded-3xl border shadow-2xl relative my-auto overflow-hidden transition-all duration-200"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#DDE5F3',
          boxShadow: '0 25px 60px rgba(27, 42, 92, 0.35)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Border */}
        <div
          className="h-2 w-full"
          style={{
            background: 'linear-gradient(90deg, #1E88E5 0%, #1546A8 35%, #F5A623 70%, #E53935 100%)'
          }}
        />

        {/* Modal Header */}
        <div
          className="px-5 sm:px-7 pt-4 pb-3.5 flex items-start justify-between border-b gap-3"
          style={{
            backgroundColor: '#F8FAFC',
            borderColor: '#DDE5F3'
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs"
              style={{
                backgroundColor: '#1B2A5C',
                borderColor: '#F5A623',
                color: '#F5A623'
              }}
            >
              <Sparkles className="w-5 h-5" style={{ color: '#F5A623' }} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-heading font-black text-[#1B2A5C] leading-tight">
                Request a Simulation
              </h2>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1546A8]">
                Custom STEM &amp; Educational Lab Builder
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-[#1B2A5C] hover:bg-slate-200/70 active:scale-95 transition-all cursor-pointer border border-transparent hover:border-slate-300 shrink-0"
            title="Close dialog"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-7 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Note at top */}
          <div
            className="mb-5 p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed"
            style={{
              backgroundColor: '#FEF3C7',
              borderColor: '#FCD34D',
              color: '#92400E'
            }}
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#D97706' }} />
            <p className="font-semibold">
              Please check the website first. Use this form only for a simulation that is not already available.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">
              {/* Row 1: Class & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. Class */}
                <div>
                  <label className="block text-xs font-black text-[#1B2A5C] mb-1">
                    Class <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => {
                      setSelectedClass(e.target.value);
                      if (errors.selectedClass) {
                        setErrors((prev) => ({ ...prev, selectedClass: '' }));
                      }
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border bg-white text-[#1B2A5C] transition-all focus:outline-none focus:ring-2 ${
                      errors.selectedClass
                        ? 'border-red-500 focus:ring-red-300'
                        : 'border-[#CBD5E1] focus:ring-[#1E88E5]/30 focus:border-[#1E88E5]'
                    }`}
                  >
                    <option value="">Select Class...</option>
                    {CLASS_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.selectedClass && (
                    <p className="mt-1 text-[11px] font-bold text-red-600">{errors.selectedClass}</p>
                  )}
                </div>

                {/* 2. Subject */}
                <div>
                  <label className="block text-xs font-black text-[#1B2A5C] mb-1">
                    Subject <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => {
                      setSelectedSubject(e.target.value);
                      if (errors.selectedSubject) {
                        setErrors((prev) => ({ ...prev, selectedSubject: '' }));
                      }
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border bg-white text-[#1B2A5C] transition-all focus:outline-none focus:ring-2 ${
                      errors.selectedSubject
                        ? 'border-red-500 focus:ring-red-300'
                        : 'border-[#CBD5E1] focus:ring-[#1E88E5]/30 focus:border-[#1E88E5]'
                    }`}
                  >
                    <option value="">Select Subject...</option>
                    {SUBJECT_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.selectedSubject && (
                    <p className="mt-1 text-[11px] font-bold text-red-600">{errors.selectedSubject}</p>
                  )}
                </div>
              </div>

              {/* If "Other" subject is chosen, show custom subject text input */}
              {selectedSubject === 'Other' && (
                <div>
                  <label className="block text-xs font-black text-[#1B2A5C] mb-1">
                    Specify Subject <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={customSubject}
                    onChange={(e) => {
                      setCustomSubject(e.target.value);
                      if (errors.customSubject) {
                        setErrors((prev) => ({ ...prev, customSubject: '' }));
                      }
                    }}
                    placeholder="Enter subject name (e.g., Environmental Science)"
                    className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border bg-white text-[#1B2A5C] transition-all focus:outline-none focus:ring-2 ${
                      errors.customSubject
                        ? 'border-red-500 focus:ring-red-300'
                        : 'border-[#CBD5E1] focus:ring-[#1E88E5]/30 focus:border-[#1E88E5]'
                    }`}
                  />
                  {errors.customSubject && (
                    <p className="mt-1 text-[11px] font-bold text-red-600">{errors.customSubject}</p>
                  )}
                </div>
              )}

              {/* 3. Topic Name */}
              <div>
                <label className="block text-xs font-black text-[#1B2A5C] mb-1 leading-snug">
                  Topic name for which you need a simulation (it should not already be on this website){' '}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={topicName}
                  onChange={(e) => {
                    setTopicName(e.target.value);
                    if (errors.topicName) {
                      setErrors((prev) => ({ ...prev, topicName: '' }));
                    }
                  }}
                  placeholder="e.g. Electromagnetic Induction, DNA Replication, Bernoulli's Principle..."
                  className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border bg-white text-[#1B2A5C] transition-all focus:outline-none focus:ring-2 ${
                    errors.topicName
                      ? 'border-red-500 focus:ring-red-300'
                      : 'border-[#CBD5E1] focus:ring-[#1E88E5]/30 focus:border-[#1E88E5]'
                  }`}
                />
                {errors.topicName && (
                  <p className="mt-1 text-[11px] font-bold text-red-600">{errors.topicName}</p>
                )}
              </div>

              {/* Row 2: School Name & Principal Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 4. School Name */}
                <div>
                  <label className="block text-xs font-black text-[#1B2A5C] mb-1">
                    School Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => {
                      setSchoolName(e.target.value);
                      if (errors.schoolName) {
                        setErrors((prev) => ({ ...prev, schoolName: '' }));
                      }
                    }}
                    placeholder="Enter school or college name"
                    className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border bg-white text-[#1B2A5C] transition-all focus:outline-none focus:ring-2 ${
                      errors.schoolName
                        ? 'border-red-500 focus:ring-red-300'
                        : 'border-[#CBD5E1] focus:ring-[#1E88E5]/30 focus:border-[#1E88E5]'
                    }`}
                  />
                  {errors.schoolName && (
                    <p className="mt-1 text-[11px] font-bold text-red-600">{errors.schoolName}</p>
                  )}
                </div>

                {/* 5. Principal Name */}
                <div>
                  <label className="block text-xs font-black text-[#1B2A5C] mb-1">
                    Principal Name (to be filled in by the Principal) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={principalName}
                    onChange={(e) => {
                      setPrincipalName(e.target.value);
                      if (errors.principalName) {
                        setErrors((prev) => ({ ...prev, principalName: '' }));
                      }
                    }}
                    placeholder="Principal's full name"
                    className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border bg-white text-[#1B2A5C] transition-all focus:outline-none focus:ring-2 ${
                      errors.principalName
                        ? 'border-red-500 focus:ring-red-300'
                        : 'border-[#CBD5E1] focus:ring-[#1E88E5]/30 focus:border-[#1E88E5]'
                    }`}
                  />
                  {errors.principalName && (
                    <p className="mt-1 text-[11px] font-bold text-red-600">{errors.principalName}</p>
                  )}
                </div>
              </div>

              {/* 6. Phone Number */}
              <div>
                <label className="block text-xs font-black text-[#1B2A5C] mb-1">
                  Phone Number (WhatsApp / Mobile) <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (errors.phoneNumber) {
                      setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                    }
                  }}
                  placeholder="e.g. 0314 7603964 or +92 314 7603964"
                  className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border bg-white text-[#1B2A5C] transition-all focus:outline-none focus:ring-2 ${
                    errors.phoneNumber
                      ? 'border-red-500 focus:ring-red-300'
                      : 'border-[#CBD5E1] focus:ring-[#1E88E5]/30 focus:border-[#1E88E5]'
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-[11px] font-bold text-red-600">{errors.phoneNumber}</p>
                )}
                <p className="mt-1 text-[11px] text-[#5A6E85]">
                  Accepts only digits, spaces, + and -, at least 10 digits.
                </p>
              </div>

              {/* Optional: Extra Details */}
              <div>
                <label className="block text-xs font-black text-[#1B2A5C] mb-1">
                  Extra details <span className="text-[#5A6E85] font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={extraDetails}
                  onChange={(e) => setExtraDetails(e.target.value)}
                  placeholder="Provide specific learning objectives, formulas, or apparatus requirements..."
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border border-[#CBD5E1] bg-white text-[#1B2A5C] transition-all focus:outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] resize-y"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#1B2A5C] bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer border border-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="fx-pulse-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black shadow-md hover:scale-102 active:scale-95 transition-all cursor-pointer border"
                  style={{
                    backgroundColor: '#F5A623',
                    borderColor: '#E58E0A',
                    color: '#1B2A5C'
                  }}
                >
                  <Send className="w-4 h-4 text-[#1B2A5C]" />
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          ) : (
            /* Pop-Up Blocker Fallback & Success Screen */
            <div className="space-y-5 text-center py-2">
              <div
                className="w-14 h-14 mx-auto rounded-full flex items-center justify-center border shadow-md"
                style={{
                  backgroundColor: '#DEF7EC',
                  borderColor: '#31C48D'
                }}
              >
                <CheckCircle2 className="w-8 h-8 text-[#0E9F6E]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-heading font-black text-[#1B2A5C]">
                  Your request is ready. Please press Send in WhatsApp and in Gmail to complete it.
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-600 max-w-md mx-auto">
                  WhatsApp and Gmail open with your details already filled in. Your request is sent only after you press Send.
                </p>
              </div>

              {/* Fallback Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={submittedUrls.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fx-pulse-whatsapp w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm text-white shadow-md hover:scale-102 active:scale-95 transition-all border"
                  style={{
                    backgroundColor: '#25D366',
                    borderColor: '#1EBE5D'
                  }}
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Open WhatsApp</span>
                </a>

                <a
                  href={submittedUrls.gmail}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fx-pulse-blue w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm text-white shadow-md hover:scale-102 active:scale-95 transition-all border"
                  style={{
                    backgroundColor: '#1E88E5',
                    borderColor: '#1565C0'
                  }}
                >
                  <Mail className="w-4 h-4 text-white" />
                  <span>Open Gmail</span>
                </a>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#1B2A5C] bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer border border-slate-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
